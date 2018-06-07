// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId

    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {return delivery.neighborhoodId === this.id})
  }

  customers() {
    return store.customers.filter(customer => {return customer.neighborhoodId === this.id})
  }

  meals() {
    let array = this.deliveries().map(delivery => delivery.meal())
      return [...new Set(array)]
    }
  }

let customerId = 0
class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.id = ++customerId
    this.neighborhoodId = neighborhoodId

    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {return delivery.customerId === this.id})
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal())
  }

  totalSpent() {
    let initialValue = 0
    return this.meals().reduce((sum, meal) => sum + meal.price, initialValue)
  }
}

let mealId = 0
class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId

    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {return delivery.mealId === this.id})
  }

  customers() {
    return this.deliveries().map(delivery => delivery.customer())
  }

  static byPrice() {
    return store.meals.sort(function(a, b){return b.price - a.price})
  }
}

let deliveryId = 0
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId

    store.deliveries.push(this)
  }

  meal() {
    return store.meals.filter(meal => {return meal.id === this.mealId})[0]
  }

  customer() {
    return store.customers.filter(customer => {return customer.id === this.customerId})[0]
  }

  neighborhood() {
    return store.neighborhoods.filter(neighborhood => {return neighborhood.id === this.neighborhoodId})[0]
  }
}
