let store = {
  deliveries: [],
  meals: [],
  employers: [],
  customers: []
}

let deliveryId = 0
let mealId = 0
let employerId = 0
let customerId = 0

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId
    if (customer) {
      this.customerId = customer.id
      this.mealId = meal.id
    }

    store.deliveries.push(this)
  }

  customer() {
    return store.customers.find(customer => customer.id == this.customerId)
  }

  meal() {
    return store.meals.find(meal => meal.id == this.mealId)
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price

    store.meals.push(this)
  }

  static byPrice() {
    return store.meals.concat().sort((a, b) => b.price - a.price)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId == this.id)
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
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
    return store.customers.filter(customer => customer.employerId == this.id)
  }

  deliveries() {
    let employeeIds = this.employees().map(employee => employee.id)
    return store.deliveries.filter(delivery => employeeIds.includes(delivery.customerId))
  }

  meals() {
    return [...new Set(this.deliveries().map(delivery => delivery.meal()))]
  }

  allMeals() {
    return this.deliveries().map(delivery => delivery.meal())
  }

  mealTotals() {
    return this.allMeals().reduce((accm, meal) => {
      accm[meal.id] = (accm[meal.id] || 0) + 1;
      return accm;
    }, {})
  }

}

class Customer {
  constructor(name, employer) {
    this.id = ++customerId
    this.name = name
    if (employer) {
      this.employerId = employer.id
    }

    store.customers.push(this)
  }

  totalSpent() {
    return this.deliveries().reduce((accm, delivery) => accm + delivery.meal().price, 0)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId == this.id)
  }

  meals() {
    return store.meals.filter(meal => meal.customerId == this.mealId)
  }
}
