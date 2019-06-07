// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0

class Neighborhood {
  constructor(name) {
    this.id = neighborhoodId++
    this.name = name
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery =>
      delivery.neighborhoodId === this.id
  )}

  customers() {
    return [...new Set(this.deliveries().map(delivery =>
      delivery.customer()
    ))]
  }

  meals() {
    return  [...new Set(this.deliveries().map(delivery =>
      delivery.meal()
    ))]
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = customerId++
    this.name = name
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery =>
      delivery.customerId === this.id
  )}

  meals() {
    return this.deliveries().map(delivery =>
      delivery.meal()
  )}

  totalSpent() {
    return this.meals().reduce(function (total, meal) {
      return total + meal.price
    }, 0)
  }
}

class Meal {
  constructor(title, price) {
    this.id = mealId++
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery =>
      delivery.mealId === this.id
  )}

  customers() {
    return [...new Set(this.deliveries().map(delivery =>
      delivery.customer()
    ))]
  }

  static byPrice() {
    return store.meals.sort(function(a,b){
      return b.price - a.price
    })
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = deliveryId++
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal =>
      meal.id === this.mealId
  )}

  customer() {
    return store.customers.find(customer =>
      customer.id === this.customerId
  )}

  neighborhood() {
    return store.neighborhoods.find(neighborhood =>
      neighborhood.id === this.neighborhoodId
  )}
}
