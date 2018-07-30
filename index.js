// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(del => del.neighborhoodId === this.id);
  }

  customers() {
    return store.customers.filter(cus => cus.neighborhoodId === this.id);
  }

  meals() {
    let orders = this.customers().map(cus => {return cus.meals()});
    return [...new Set(orders[0])]
  }

}

class Customer {
  constructor(name, neighborhoodId){
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(del => del.customerId === this.id);
  }

  meals() {
    return this.deliveries().map(del => {return store.meals.find(meal => meal.id === del.mealId)});
  }

  totalSpent() {
    let total = 0;
    let prices = this.meals().map(meal => meal.price);
    const addPrices = (total, nextPrice) => total + nextPrice;
    return prices.reduce(addPrices, total);
  }
}

class Meal {
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(del => del.mealId === this.id);
  }

  customers() {
    return this.deliveries().map(del => {return store.customers.find(cus => cus.id === del.customerId)});
  }

  static byPrice() {
    return store.meals.sort((a, b) => a.price < b.price);
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId);
  }

  customer() {
    return store.customers.find(cus => cus.id === this.customerId);
  }

  neighborhood() {
    return store.neighborhoods.find(nei => nei.id === this.neighborhoodId);
  }
}
