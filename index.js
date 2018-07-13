// global datastore

// A meal has many customers
// A delivery belongs to a meal, belongs to a customer, and belongs to a neighborhood
// A customer has many deliveries
// A customer has many meals through deliveries
// A customer belongs to a neighborhood
// A neighborhood has many deliveries
// A neighborhood has many customers through deliveries
// A neighborhood has many meals through deliveries

let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0

class Neighborhood{
  constructor(name){
    this.name = name
    this.id = neighborhoodId++
    store.neighborhoods.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.neighborhood();
    });
  }
  customers(){
    return store.customers.filter(customer => {
      return customer.neighborhoodId;
    });
  }

}

class Customer{
  constructor(name, neighborhoodId){
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = customerId++
    store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId;
    });
  }
  meals(){
    return store.meals.filter(meal => {
      return meal.mealId;
    });
  }
}


class Meal{
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = mealId++
    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.meal();
    });
  }
  customers(){
    return store.customers.filter(customer => {
      return customer.mealId;
    });
  }
}

class Delivery{
  constructor(meal, customer, neighborhood){
    this.id = deliveryId++
    this.mealId = meal
    this.customerId = customer
    this.neighborhoodId = neighborhood
    store.deliveries.push(this);
  }
  meal(){
    return store.meals.find(meal => {
     return meal.id === this.mealId;
   });
  }
  customer(){
    return store.customers.find(customer => {
     return customer.id === this.customerId;
   });
  }
  neighborhood(){
    return store.neighborhoods.find(neighborhood => {
     return neighborhood.id === this.neighborhoodId;
   });
  }
}
