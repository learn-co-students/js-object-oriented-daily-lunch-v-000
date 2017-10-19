let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0

store = { customers: [], meals: [], deliveries: [], employers: [] }

class Customer {
  constructor(name, employer) {
    this.id = ++customerId
    this.name = name
    this.employerId = employer.id

    store.customers.push(this)
  }

  meals() {

  }

  deliveries() {

  }

  totalSpent() {

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

  }

  customers() {

  }

  // use static keyword
  byPrice() {

  }
}

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId
    this.mealId = meal.id
    this.customerId = customer.id

    store.deliveries.push(this)
  }

  meal() {

  }

  customer() {

  }

}

class Employer {
  constructor(name) {
    this.id = ++employerId
    this.name = name

    store.employers.push(this)
  }

  employees() {

  }

  deliveries() {

  }

  meals() {

  }

  mealTotals() {

  }
}
