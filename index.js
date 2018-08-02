// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0

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
      return [...new Set(this.deliveries().map(delivery => {
          return delivery.customer()
        })
      )]
    }
    meals() {
      return [...new Set(this.deliveries().map(delivery => {
          return delivery.meal()
        })
      )]
    }
  }

let mealId = 0

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
  static byPrice() {
    return store.meals.sort((a, b) => a.price < b.price)
  }
}

let customerId = 0

class Customer {
  constructor(name, neighborhoodId) {
  this.id = ++customerId
  this.name = name
  this.neighborhoodId = neighborhoodId
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
  totalSpent(){
    return this.meals().reduce(function(prev, cur) {
      return prev + cur.price;
    }, 0);
  }
}

let deliveryId = 0

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId
    this.mealId = mealId
    this.customerId = customerId
    this.neighborhoodId = neighborhoodId

    store.deliveries.push(this)
  }
  meal() {
    return store.meals.find(meal => {
      return this.mealId === meal.id
    })
  }
  customer() {
    return store.customers.find(customer => {
      return this.customerId === customer.id
    })
  }
  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return this.neighborhoodId === neighborhood.id
    })
  }
}
