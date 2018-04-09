let store = {}
store.deliveries = []
store.meals = []
store.employers = []
store.customers = []
let deliveryId = 0
let mealId = 0
let employerId = 0
let customerId = 0

class Delivery {
  constructor(meal, customer) {
    if (meal) {
      this.mealId = meal.id
    }
    if (customer) {
      this.customerId = customer.id
    }
    this.id = ++deliveryId
    store.deliveries.push(this)
  }
  customer() {
    return store.customers.find(function(customer){
      return this.customerId === customer.id
    }.bind(this))
  }
  meal() {
    return store.meals.find(function(meal){
      return this.mealId === meal.id
    }.bind(this))
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
    return store.deliveries.filter(function(delivery){
      return this.id === delivery.mealId
    }.bind(this))
  }

  customers() {
    return store.deliveries.map(function(delivery){
      if (this.id === delivery.mealId) {
        return delivery.customer()
      }
    }.bind(this))
  }

  static byPrice() {
    return store.meals.sort(function(a,b){
      return b.price - a.price
    })
  }


}

class Employer {
  constructor(name) {
    this.id = ++employerId
    this.name = name
    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(function(customer){
      return customer.employerId === this.id
    }.bind(this))
  }

  deliveries() {
    let deliveries = []
    this.employees().forEach(function(employee){
      employee.deliveries().forEach(function(delivery){
        deliveries.push(delivery)
      })
    })
    return deliveries
  }

  meals() {
    let meals = []
    meals = this.deliveries().map(function(delivery){
      return delivery.meal()
    })
    return [...new Set(meals)]
  }

  mealTotals() {
    let totals = {}
    let meals = []
    meals = this.deliveries().map(function(delivery){
      return delivery.meal()
    })
    meals.forEach(function(meal){
      if (`${meal.id}` in totals) {
        totals[`${meal.id}`]++
      } else {
        totals[`${meal.id}`] = 1
      }
    })
    return totals
  }
}

class Customer {
  constructor(name, employer) {
    if (employer) {
      this.employerId = employer.id
    }
    this.id = ++customerId
    this.name = name
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(function(delivery){
      return this.id === delivery.customerId
    }.bind(this))
  }

  meals() {
    return this.deliveries().map(function(delivery){
      return delivery.meal()
    })
  }

  totalSpent() {
    return this.meals().reduce(function(accum, meal){
      return accum += meal.price
    },0)
  }
}
