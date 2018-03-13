let store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0

class Customer {
  constructor(name, employer){
    this.id = ++customerId
    this.name = name
    if(employer) {
      this.employerId = employer.id
    }
    store.customers.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }
  meals() {
    return this.deliveries().map(function(delivery) {
      return delivery.meal()
    })
  }
  totalSpent() {
    return this.meals().reduce(function(sum, meal) {
      return sum + meal.price
    }, 0)
  }
}

let mealId = 0

class Meal {
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }
  static byPrice() {
    return store.meals.sort(function(meal1, meal2) {
      return meal2.price - meal1.price
    })
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }
  customers() {
    return this.deliveries().map(function(delivery) {
      return delivery.customer()
    })
  }
}

let deliveryId = 0

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId
    store.deliveries.push(this)
    if(meal) {
      this.mealId = meal.id
    }
    if(customer) {
      this.customerId = customer.id
    }
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
}

let employerId = 0

class Employer {
  constructor(name){
    this.id = ++employerId
    this.name = name
    store.employers.push(this)
  }
  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    })

  }
  deliveries() {
    let array = this.employees().map(function(employee) {
      return employee.deliveries()
    })
    return [].concat(...array)
  }
  meals() {
    let meals = []
    this.deliveries().forEach(delivery => {
      if(!meals.includes(delivery.meal())) {
        meals.push(delivery.meal())
      }
    })
    return meals
  }
  mealTotals() {
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    let total = {}
    allMeals.forEach(function(meal) {
      total[meal.id] = 0
    })
    allMeals.forEach(function(meal) {
      total[meal.id] += 1
    })
    return total
  }
}
