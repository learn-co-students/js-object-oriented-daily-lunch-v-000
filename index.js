// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId =0;

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(d => d.neighborhoodId === this.id);
  }

  customers() {
    return store.customers.filter(c => c.neighborhoodId === this.id);
  }

  meals() {
    let neighborhoodDeliveries = this.deliveries();
    let neighborhoodMeals = neighborhoodDeliveries.map(d => d.meal());
    return [...new Set(neighborhoodMeals)];
  }
}

let customerId = 0;

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(d => d.customerId === this.id)
  }

  meals() {
    let customerDeliveries = this.deliveries();
    return customerDeliveries.map(d => d.meal());
  }

  totalSpent() {
    let customerDeliveries = this.deliveries();
    let customerMeals = customerDeliveries.map(d => d.meal());
    let mealPrices = customerMeals.map(m => m.price);
    return mealPrices.reduce((acc, currentPrice) => acc + currentPrice);
  }
}

let mealId = 0;

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(d => d.mealId === this.id);
  }

  customers() {
    let mealDeliveries = this.deliveries();
    return mealDeliveries.map(d => d.customer());
  }

  static byPrice() {
    return store.meals.sort(function(a, b) {
      return b.price - a.price;
    });
  }
}

let deliveryId = 0;

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(m => m.id === this.mealId);
  }

  customer() {
    return store.customers.find(c => c.id === this.customerId);
  }

  neighborhood() {
    return store.neighborhoods.find(n => n.id === this.neighborhoodId);
  }
}
