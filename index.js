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
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
  }
  customers(){
    return store.customers.filter(customer => {
      return (customer.neighborhoodId === this.id);
    });
  }
  meals(){
    const allMeals = this.customers().map(customer => customer.meals());
          const merged = [].concat.apply([], allMeals);
          return [...new Set(merged)];
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
    return store.deliveries.filter(delivery => delivery.customerId === this.id);
  }
  meals() {
     return this.deliveries().map(delivery => delivery.meal());
   }

   totalSpent() {
     return this.meals().reduce((total, meal) => (total += meal.price), 0);
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

  static byPrice() {
      return store.meals.sort((a, b) => a.price < b.price);
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

  neighborhood(){
    return store.neighborhoods.find(neighborhood => {
     return neighborhood.id === this.neighborhoodId;
   });
  }

  customer(){
    return store.customers.find(customer => {
     return customer.id === this.customerId;
   });
  }

}
