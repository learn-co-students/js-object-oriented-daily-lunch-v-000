let store = {employers: [], customers: [], meals: [], deliveries: []}

let customerId = 0
let deliveryId = 0
let mealId = 0
let employerId = 0

class Customer {
  constructor(name, employer) {
    this.name = name
    this.id = ++customerId
    if (employer) {
     this.employerId = employer.id
   }
    store.customers.push(this)
  }
  meals() {
    return store.deliveries.map(delivery => {
      return delivery.meal()
    })
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  totalSpent() {
    let total = 0
    this.deliveries().forEach(function(delivery){
      total += delivery.meal().price
    })
    return total
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
      return delivery.mealId === this.id
    })
  }
  customers() {
    return store.deliveries.map(delivery => {
      return delivery.customer()
    })
  }
  static byPrice() {
    return store.meals.sort(function(a,b){return b.price - a.price})
  }
}

class Delivery{
  constructor(meal, customer) {
    this.id = ++deliveryId;
    if (meal) {
      this.mealId = meal.id
    }
    if (customer) {
      this.customerId = customer.id
    }
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
    return store.deliveries.filter(delivery => {
      return delivery.customer().employerId === this.id
    })
  }
  meals() {
    const meals = store.deliveries.map(delivery => {
      return delivery.meal()
    })
    return [... new Set(meals)]
  }
  mealTotals() {
    let mealsOrdered = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    let totals = {}
    mealsOrdered.forEach(meal => {
      totals[meal.id] = 0
    })
    mealsOrdered.forEach(meal => {
      totals[meal.id] += 1
    })
    return totals
  }
}
