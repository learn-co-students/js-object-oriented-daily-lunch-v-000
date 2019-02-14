// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name){
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this);
  }

  deliveries() {
      return store.deliveries.filter(delivery => {
              return delivery.neighborhoodId == this.id;
          }
      );
  }
  customers() {
      return store.customers.filter(customer => {
              return customer.neighborhoodId == this.id;
          }
      );
  }
}

class Customer {
  constructor(name, neighborhoodId){
    this.name = name
    this.id = ++customerId
    this.neighborhoodId = neighborhoodId
    store.customers.push(this);
  }
  deliveries() {
      return store.deliveries.filter(delivery => {
              return delivery.customerId == this.id;
          }
      );
  }
  meals() {
      return store.meals.filter(meal => {
              return meal.customerId == this.id;
          }
      );
  }
}

class Meal {
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }
  deliveries(){
  return store.deliveries.filter(delivery => {
    return delivery.mealId == this.id}
);
}
}

class Delivery {
  constructor(meal, neighborhood, customer){
    this.mealId = meal.id
    this.neighborhoodId = neighborhood.id
    this.customerId = customer.id
    this.deliveryId = ++deliveryId
    store.deliveries.push(this)
  }

  meal(){
    return store.meals.filter(meal =>{
      return meal.deliveryId == this.id
    });
  }

  customer(){
    return store.customers.filter(customer => {
      return customer.deliveryId = this.id
    })
  }

  neighborhood(){
    return store.neighborhoods.filter(neighborhood => {
      neighborhood.deliveryId = this.id
    })
  }
}
