// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    });
  }

  customers(){
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    });
  }

  // meals(){
  //
  // }
}

let customerId = 0
class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  // meals() {
  //   return store.meals.filter (meal => {
  //     return delivery.neighborhoodId === this.id
  //   })
  // }
}

let mealId = 0
class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }
}

let deliveryId = 0
class Delivery {
    constructor(mealId, customerId, neighborhoodId) {
    this.mealId = mealId
    this.customerId = customerId
    this.neighborhoodId = neighborhoodId
    this.id = ++deliveryId
    store.deliveries.push(this)
  }
}
