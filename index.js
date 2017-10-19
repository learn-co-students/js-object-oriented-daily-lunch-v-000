let store = { customers: [], deliveries: [], employers: [], meals: [] };
let customerId = 0; let mealId = 0; let deliveryId = 0; let employerId = 0;

class Customer {
  constructor(name, employer = {}) {
    this.name = name
    this.employerId = employer.id
    this.id = ++customerId
    store.customers.push(this)
  }

  totalSpent() {
    return this.meals().reduce(function(sum, meal) {
      return sum + meal.price
    }, 0)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId == this.id
    })
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }
}


class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId == this.id
    })
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }

  static byPrice() {
    return store.meals.sort((a, b) => {
      return a.price < b.price
    })
  }
}

class Delivery {
  constructor(meal = {}, customer = {}) {
    this.mealId = meal.id
    this.customerId = customer.id
    this.id = ++deliveryId
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
  }
}


class Employer {
  constructor(name) {
    this.name = name
    this.id = ++employerId
    store.employers.push(this)
  }

  mealTotals() {
    let total = {}
    const meals = this.deliveries().map(delivery => delivery.mealId)
    meals.forEach(meal => {total[meal] = total[meal] + 1 || 1})
    return total
  }

  employees() {
    return store.customers.filter(customer => {
      return customer.employerId == this.id
    })
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

}
