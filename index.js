// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };


let neighborhoodId = 0 
let customerId = 0
let mealId = 0 
let deliveryId = 0 

class Neighborhood {
  constructor(name) {
    this.name = name 
    this.id = ++neighborhoodId

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
    let mealNames = this.deliveries().map(delivery => {
      return delivery.meal();
    })
    return Array.from(new Set(mealNames));
  }
}



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

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    })
  }

  totalSpent() {
    return this.meals().reduce(function(acc, cv) {
      return acc + cv.price
    }, 0);
  }
}



class Meal {
  constructor(title, price) {
    this.title = title 
    this.price = price 
    this.id = ++mealId 

    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    })
  }

  static byPrice() {
    let cp = store.meals.slice()
    return cp.sort((a, b) => b.price - a.price);
  }
}



class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId

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