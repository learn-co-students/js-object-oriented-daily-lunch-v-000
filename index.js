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

class Neighborhood{
  constructor(name){
    this.name = name
    this.id = neighborhoodId++
    store.neighborhoods.push(this)
  }
}

class Customer{
  constructor(name, neighborhoodId){
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = customerId++
    store.customers.push(this)
  }
}


class Meal{
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = mealId++
    store.meals.push(this)
  }
}

class Delivery{
  constructor(meal, customer, neighborhood){
    this.mealId = meal.id
    this.customerId = customer.id
    this.neighborhoodId = neighborhood.id
  }
}
