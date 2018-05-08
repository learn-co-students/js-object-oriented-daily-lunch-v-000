// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId
    this.name = name
    store.neighborhoods.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    })
  }

  customers(){
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    })
  }

  meals(){
     let all = this.deliveries().map(delivery => {
       return delivery.meal()
     })
     let uniqueMeals = [...new Set(all)]
     return uniqueMeals
  }
}

let customerId = 0

class Customer {
  constructor(name, neighborhood = {}) {
    this.id = ++customerId
    this.name = name
    this.neighborhoodId = neighborhood
    store.customers.push(this)
  }

  deliveries(){
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
    let total = 0
    return this.meals().reduce((sum, meal) => {
      return sum + meal.price
    }, 0 )
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

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }

  customers(){
    return store.customers.filter(customer => {
      return customer.meals().includes(this)
    })
  }

  static byPrice(){
    return store.meals.sort(function(a, b) {return a.price < b.price})
  }
}

let deliveryId = 0

class Delivery {
  constructor(meal, neighborhood, customer) {
    this.id = ++deliveryId
    this.mealId = meal
    this.neighborhoodId = neighborhood
    this.customerId = customer
    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }

  customer(){
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
  }

  neighborhood(){
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId
    })
  }
}
