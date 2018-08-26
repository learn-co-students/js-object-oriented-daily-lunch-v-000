// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodID = 0
let customerID = 0
let mealID = 0

class Neighborhood {
  constructor (name) {
    this.name = name
    this.id = neighborhoodID++
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodID === this.id)
  }
  customers() {
    return store.customers.filter(customer => customer.neighborhoodID === this.id)
  }
  meals() {
    return store.meals.filter(meal => meals.neighborhoodID ===this.id)
  }
}

class Customer {
  constructor(name){
    this.name = name
    this.id = customerID++
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerID === this.id)
  }
  meals() {
    return this.deliveries().map(delivery => delivery.meal)
  }
  totalSpend() {
    return meals
  }
}

class Meal {
  constructor(title,price) {
    this.title = title
    this.price = price
    this.id = mealID++
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealID === this.id)
  }
  customers(){
    return s
  }
}



// A meal has many customers
// A delivery belongs to a meal, belongs to a customer, and belongs to a neighborhood
// A customer has many deliveries
// A customer has many meals through deliveries
// A customer belongs to a neighborhood
// A neighborhood has many deliveries
// A neighborhood has many customers through deliveries
// A neighborhood has many meals through deliveries