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
      return delivery.neighborhoodId == this.id
    })
  }

  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId == this.id
    })
  }

  meals() {
    let meal_ids = this.deliveries().map(delivery => {return delivery.mealId})
    let meals = store.meals.filter(meal => {
      return meal_ids.includes(meal.id)
    })
    return meals
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
      return delivery.customerId == this.id
    })
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal())
  }

  totalSpent() {
    var prices = this.meals().map(meal => meal.price)
    var total = 0
    var arrayLength = prices.length
    for (var i = 0; i < arrayLength; i++) {
      total = total + prices[i]
    }
    return total
  }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId

    store.meals.push(this)

  }

  static byPrice() {
    let prices = store.meals.map(meal => meal.price).sort(function(a, b){return b-a})
    let orderedPrices = []
    let arrayLength = prices.length
    for (var i = 0; i < arrayLength; i++) {
      for (var x = 0; x < store.meals.length; x++) {
        if (store.meals[x].price == prices[i]) {
          orderedPrices.push(store.meals[x])
        }
      }
    }
    return orderedPrices
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId == this.id
    })
  }

  customers() {
    let customer_ids = this.deliveries().map(delivery => {return delivery.customerId})
    let customers = store.customers.filter(customer => {
      return customer_ids.includes(customer.id)
    })
    return customers
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
      return meal.id == this.mealId
    })
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id == this.customerId
    })
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id == this.neighborhoodId
    })
  }
}
