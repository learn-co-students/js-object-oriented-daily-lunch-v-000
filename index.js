let store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0

class Customer {
  constructor(name, employer = {}) {
    this.name = name
    this.employerId = employer.id
    this.id = ++customerId

    store.customers.push(this)
  }

  meals() {
    const deliveries = this.deliveries()

    return deliveries.map((delivery) => {
      return delivery.meal()
    })
  }

  deliveries() {
    return store.deliveries.filter((delivery) => {
      return delivery.customerId === this.id
    })
  }

  totalSpent() {
    const meals = this.meals()

    const toTotal = function(agg, el, i, arr) {
      return agg + el.price
    }

    return meals.reduce(toTotal, 0)
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

  deliveries() {
    return store.deliveries.filter((delivery) => {
      return delivery.mealId === this.id
    })
  }

  customers() {
    const deliveries = this.deliveries()

    return deliveries.map((delivery) => {
      return delivery.customer()
    })
  }

  static byPrice() {
    return store.meals.sort(function(a, b) {
      return b.price - a.price
    })
  }
}

let deliveryId = 0

class Delivery {
  constructor(meal = {}, customer = {}) {
    this.id = ++deliveryId
    this.mealId = meal.id
    this.customerId = customer.id

    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find((meal) => {
      return meal.id === this.mealId
    })
  }

  customer() {
    return store.customers.find((customer) => {
      return customer.id === this.customerId
    })
  }
}

let employerId = 0

class Employer {
  constructor(name) {
    this.name = name
    this.id = ++employerId

    store.employers.push(this)
  }

  employees() {
    return store.customers.filter((customer) => {
      return customer.employerId === this.id
    })
  }

  deliveries() {
    const customers = this.employees()

    const arrOfArrays = customers.map((customer) => {
      return customer.deliveries()
    })

    return [].concat.apply([], arrOfArrays)
  }

  allMeals() {
    const deliveries = this.deliveries()

    return deliveries.map((delivery) => {
      return delivery.meal()
    })
  }

  meals() {
    const meals = this.allMeals()

    return meals.filter(function(el, i, arr) {
      return arr.indexOf(el) === i
    })
  }

  mealTotals() {
    const meals = this.allMeals()

    let totals = {}

    meals.forEach(function(meal) {
      totals[meal.id] = 0
    })

    meals.forEach(function(meal) {
      totals[meal.id] += 1
    })

    return totals
  }
}
