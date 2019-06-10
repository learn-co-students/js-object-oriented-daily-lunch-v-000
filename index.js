// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
class Neighborhood{
  constructor(name){
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this)
  }
}

let customerId = 0;
class Customer{
  constructor(name, neighborhood){
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhood.id;
    store.customers.push(this);
  }
}

let mealId = 0;
class Meal{
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }
}

let deliveryId = 0;
class Delivery{
  constructor(meal, neighborhood, customer){
    this.id = ++deliveryId;
    this.mealId = meal.id;
    this.neighborhoodId = neighborhood.id;
    this.customerId = customer.id;
    store.deliveries.push(this);
  }
}