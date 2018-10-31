// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

///
let neighborhoodId = 1
let customerId = 1
let mealId = 1
let deliveryId = 1

///
class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = neighborhoodId++

    store.neighborhoods.push(this)
  }

  // returns a list of all deliveries placed in a neighborhood
  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
  }

  // returns all of the customers that live in a particular neighborhood
  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id)
  }

  // returns a unique list of meals that have been ordered in a particular neighborhood (you might want to do this one last)
  meals() {
    let mealList = this.deliveries().map(delivery => delivery.meal())
    let uniqueList = new Set(mealList)
    return Array.from(uniqueList)
  }
}

///
class Customer {
  constructor(name, neighborhoodId){
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = customerId++

    store.customers.push(this)
  }

  // returns all of the deliveries that customer has received
  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }

  // returns all meals that a customer has ordered
  meals() {
    return this.deliveries().map(delivery => delivery.meal())
  }

  // calculates the total amount spent by a customer
  totalSpent() {
    let mealPrices = this.meals().map(meal => meal.price)
    return mealPrices.reduce((a, b) => a + b)
  }
}

///
class Meal {
  constructor(title, price) {
    this.id = mealId++
    this.title = title
    this.price = price

    store.meals.push(this)
  }

  // returns all of the deliveries associated with a particular meal.
  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }
  // returns all of the customers who have had the meal delivered. Be careful not to return the same customer
  customers() {
    return store.customers.filter(customer => customer.deliveryId === this.deliveryId)
  }

  // orders all of the meals by price
  static byPrice() {
    return store.meals.sort((mealOne, mealTwo) => mealOne.price - mealTwo.price)
  }
}

///
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.customerId = customerId
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.id = deliveryId++

    store.deliveries.push(this)
  }

  //  returns the meal associated with a particular delivery
  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }

  // returns the customer associated with a particular delivery
  customer() {
    return store.customers.find(customer => this.customerId === customer.id)
  }

  // returns the neighborhood associated with a particular delivery
  neighborhood() {
    return store.neighborhoods.find(neighborhood => this.neighborhoodId === neighborhood.id)
  }
}
