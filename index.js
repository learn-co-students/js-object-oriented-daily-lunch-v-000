// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0

class Neighborhood {
  constructor(name){
    this.id = ++neighborhoodId
    this.name = name
    store.neighborhoods.push(this)
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => {return delivery.neighborhoodId === this.id})
  }
  
  customers() {
    return store.customers.filter(customer => {return customer.neighborhoodId === this.id})
  }
  
  meals() {
    var temp = []
    return this.deliveries().map(delivery => {
      return delivery.meal()}).filter(function(meal) {
      return temp.indexOf(meal.id) == -1 && temp.push(meal.id)
    })
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId
    this.neighborhoodId = neighborhoodId
    this.name = name
    store.customers.push(this)
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => {return delivery.customerId === this.id})
  }
  
  meals() {
    return this.deliveries().map(delivery => {return delivery.meal()})
  }
  
  totalSpent() {
    return this.meals().reduce(
      ((total, meal) => total + meal.price), 0
    )
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }
  
  customers() {
    return store.customers.filter(customer => {return customer.deliveries()})
  }
  
  static byPrice() {
    return store.meals.sort(function(meal1, meal2) {
      return meal2.price - meal1.price
    })
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    store.deliveries.push(this)
  }
  
  meal() {
    return store.meals.find(meal => {return meal.id === this.mealId})
  }
  
  customer() {
    return store.customers.find(customer => {return customer.id === this.customerId})
  }
  
  neighborhood() {
    return store.neighborhoods.find(neighborhood => {return neighborhood.id === this.neighborhoodId})
  }
}