// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let deliveryId = 0;
let customerId = 0;
let mealId = 0;


class Neighborhood{
  constructor(name){
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
        return delivery.neighborhoodId === this.id;
      });
  }

  customers(){
    return store.customers.filter(customer => {
        return customer.neighborhoodId === this.id;
      });
  }

  meals(){
    let orders = this.customers().map(customer => {return customer.meals()});
        return [...new Set(orders[0])]
  }

}

class Customer{
  constructor(name, neighborhoodId){
    this.id = customerId++;
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  }

  meals(){
    return this.deliveries().map(delivery => {
      return store.meals.find(meal => meal.id === delivery.mealId)
    });
  }

  totalSpent(){
    let total = 0;
    let prices = this.meals().map(meal => meal.price);
    const addPrices = (total, nextPrice) => total + nextPrice;
    return prices.reduce(addPrices, total);
  }
}

class Meal{
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    });
  }

  customers(){
  return this.deliveries().map(delivery => {
    return store.customers.find(customer =>
    customer.id === delivery.customerId)});
  }

  static byPrice(){
    return store.meals.sort((a, b) =>
    a.price < b.price);
  }
}

class Delivery{
  constructor(mealId, neighborhoodId, customerId){
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }

  meal(){
      return store.meals.find(meal =>
        meal.id === this.mealId);
  }

  customer(){
    return store.customers.find(customer =>
      customer.id === this.customerId);
  }

  neighborhood(){
    return store.neighborhoods.find(neighborhood =>
      neighborhood.id === this.neighborhoodId);
  }
}
