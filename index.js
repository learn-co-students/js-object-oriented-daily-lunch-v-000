// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId
    this.name = name

    store.neighborhoods.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    })
  }
  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    })
  }
  meals() {
    let allMeals = []
    this.deliveries().map(delivery => {
      allMeals.push(delivery.meal())
    })
    let allUniqueMeals = [...new Set(allMeals)]
    return allUniqueMeals
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
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }
  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }
  totalSpent() {
    let spent = 0
    this.meals().forEach(function(meal) {
      spent += meal.price
    })
    return spent
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
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }
  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }
  static byPrice()  {
    return store.meals.sort(function(a, b){
      return b.price - a.price
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
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }
  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
  }
  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId
    })
  }
}
