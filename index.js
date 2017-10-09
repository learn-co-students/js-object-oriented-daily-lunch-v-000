let store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0
class Customer {
  constructor(name, employer) {
    this.id = ++customerId
    this.name = name
    if (employer) {
      this.employerId = employer.id
    }

    store.customers.push(this)
  }
  meals() {
    return this.deliveries().map(delivery => delivery.meal())
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }
  totalSpent() {
    return this.meals().reduce((sum, meal) => {return sum + meal.price}, 0)
  }
}

let mealId = 0
class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price

    store.meals.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }
  customers() {
    return this.deliveries().map(delivery => delivery.customer())
  }
  static byPrice(){
    return store.meals.sort((meal1, meal2) => meal2.price - meal1.price)
  }
}

let deliveryId = 0
class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId
    if (meal) {
      this.mealId = meal.id
    }
    if (customer) {
      this.customerId = customer.id
    }

    store.deliveries.push(this)
  }
  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }
  customer() {
    return store.customers.find(customer => customer.id === this.customerId)
  }
}

let employerId = 0
class Employer {
  constructor(name) {
    this.id = ++employerId
    this.name = name

    store.employers.push(this)
  }
  employees() {
    return store.customers.filter(customer => customer.employerId === this.id)
  }
  deliveries() {
    const allDeliveries = this.employees().map(employee => employee.deliveries())
    const merged = [].concat.apply([], allDeliveries)
    return merged
  }
  meals() {
    const meals = this.deliveries().map(delivery => delivery.meal())
    const uniqueMeals = [...new Set(meals)]
    return uniqueMeals
  }
  mealTotals() {
    let total = {}
    const meals = this.deliveries().map(delivery => delivery.mealId)
    meals.forEach(meal => {total[meal] = total[meal] + 1 || 1})
    return total
  }
}
