let store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0

class Customer {
  constructor (name, employer = {}) {
    this.id = ++customerId
    this.name = name
    this.employerId = employer.id
    store.customers.push(this)
  }
  deliveries () {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }
  meals () {
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }
  totalSpent () {
    return this.meals().reduce((acc, meal) => {
      return acc + meal.price
    }, 0)
  }
}

class Meal {
  constructor (title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }
  deliveries () {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }
  customers () {
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }
  static byPrice () {
    return store.meals.sort((meal1, meal2) => {
      return meal1.price < meal2.price
    })
  }
}

class Delivery {
  constructor (meal = {}, customer = {}) {
    this.id = ++deliveryId
    this.mealId = meal.id
    this.customerId = customer.id
    store.deliveries.push(this)
  }
  meal () {
    return store.meals.find((meal) => {
      return meal.id === this.mealId
    })
  }
  customer () {
    return store.customers.find((customer) => {
      return customer.id === this.customerId
    })
  }
}

class Employer {
  constructor (name) {
    this.id = ++employerId
    this.name = name
    store.employers.push(this)
  }
  employees () {
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    })
  }
  deliveries () {
    return store.deliveries.filter(delivery => {
      return delivery.customer().employerId === this.id
    })
  }
  meals () {
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    return [...new Set(allMeals)]
  }
  mealTotals () {
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    let totals = {}
    allMeals.forEach(function (meal) {
      totals[meal.id] = 0
    })
    allMeals.forEach(function (meal) {
      totals[meal.id] += 1
    })
    return totals
  }
}
