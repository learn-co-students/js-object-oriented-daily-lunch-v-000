let store = {deliveries: [], meals: [], employers: [], customers: []}

let deliveryId = 0
class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId
    if (meal) {this.mealId = meal.id}
    if (customer) {this.customerId = customer.id}
    store.deliveries.push(this)
  }

  meal () { return store.meals.find(meal => meal.id === this.mealId) }
  customer() { return store.customers.find(customer => customer.id === this.customerId) }
}

let mealId = 0
class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  deliveries() { return store.deliveries.filter(delivery => delivery.mealId === this.id) }
  customers() { return this.deliveries().map(delivery => delivery.customer()) }
  static byPrice(){
    return store.meals.sort(function(a, b) {
      return b.price - a.price
    })
  }
}

let customerId = 0
class Customer {
  constructor(name, employer) {
    this.id = ++customerId
    this.name = name
    if (employer) { this.employerId = employer.id }
    store.customers.push(this)
  }

  deliveries() { return store.deliveries.filter(delivery => delivery.customerId === this.id) }
  meals() { return this.deliveries().map(delivery => delivery.meal()) }
  totalSpent() { return this.meals().reduce((a, b) => a.price + b.price) }
}

let employerId = 0
class Employer {
  constructor(name) {
    this.id = ++employerId
    this.name = name
    store.employers.push(this)
  }

  employees() { return store.customers.filter(customer => customer.employerId === this.id) }
  deliveries() { return store.deliveries.filter(delivery => delivery.customer().employerId === this.id) }
  meals() { let meals = this.deliveries().map((delivery) => delivery.meal())
    return [... new Set(meals)]
  }
  mealTotals() { let object = {}
    this.meals().forEach(meal => object[meal.id] = meal.customers().length)
    return object
  }
}
