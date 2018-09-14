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
      return this.id === delivery.neighborhoodId
    })
  }
  customers() {
    return store.customers.filter(customer => {
      return this.id === customer.neighborhoodId
    })
  }
  meals() {
    let meals = []
    for (const delivery of this.deliveries()) {
      let thedelivery = delivery.meal()
        if (meals.includes(thedelivery) === false) {
          meals.push(thedelivery)
        }
      }
    return  meals
  }

}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId
    this.name = name
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return this.id === delivery.customerId
    })
  }
  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }
  totalSpent () {
    return this.meals().reduce((total, meal) => {
      return total + meal.price
    }, 0)
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
      return this.id === delivery.mealId
    })
  }
  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }
  static byPrice() {
    return store.meals.sort(function(a, b) {
      return b.price - a.price
    })
  }
}


class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId
    this.neighborhoodId = neighborhoodId
    this.mealId = mealId
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
