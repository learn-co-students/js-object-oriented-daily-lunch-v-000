//a meal has many customers
//a delivery belongs to a meal, belongs to a customer, & belongs to a neighborhoods
//a customer has many deliveries
//a customer has many meals thru dlvrys
//a customer belongs to a neighborhoods
//a neighborhood has many dlvrys
//a neighborhood has many customers thru dlvrys
//a neighborhood has many meals thru dlvrys


// global datastore
let store = {neighborhoods: [], meals: [], customers: [], deliveries: []}
let neighborhoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this)
    }

    deliveries() {
      return store.deliveries.filter(function(delivery) {
        return delivery.neighborhoodId === this.id
      }.bind(this))
    }

    customers() {
      return store.customers.filter(function(customer) {
        return customer.neighborhoodId === this.id
      }.bind(this))
    }

    meals() {                                                           //neigborhood has meals thru deliveries
      let meals = this.deliveries().map(function(delivery) {           //go thru dlvrys function .map
        return delivery.meal()                                         //return the meals() assoc with this.deliveries
      })
      let uniqMeals = [...new Set(meals)]                   //only will include the unique values. will drop dups
      return uniqMeals                                      //return the uniqMeals
    }
  }

  class Customer {
    constructor(name, neighborhoodId) {
      this.id = ++customerId;
      this.name = name;
      this.neighborhoodId = neighborhoodId;
      store.customers.push(this)
    }

    deliveries() {
      return store.deliveries.filter(function(delivery) {
        return delivery.customerId === this.id
      }.bind(this))
    }

    meals() {
      return this.deliveries().map(function(delivery) {
        return delivery.meal()
      })
    }

    totalSpent() {
      return this.meals().reduce(function(total, meal) {
        return meal.price + total
      }, 0)
    }
  }

  class Meal {
    constructor(title, price) {
      this.id = ++mealId;
      this.title = title;
      this.price = price;
      store.meals.push(this)
    }

    deliveries() {
      return store.deliveries.filter(function(delivery) {
        return delivery.mealId === this.id
      }.bind(this))
    }

    customers() {
      return this.deliveries().map(function(delivery) {
        return delivery.customer()
      })
    }

    static byPrice() {
      return store.meals.sort(function( a, b) {
        return a.price < b.price
      })
    }

  }

  class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this)
    }

    meal() {
      return store.meals.find(function(meal) {
        return meal.id === this.mealId
      }.bind(this))
    }

    customer() {
      return store.customers.find(function(customer) {
        return customer.id === this.customerId
      }.bind(this))
    }

    neighborhood() {
      return store.neighborhoods.find(function(neighborhood) {
        return neighborhood.id === this.neighborhoodId
      }.bind(this))
    }
  }
