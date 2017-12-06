let store = { customers: [], meals: [], deliveries: [], employers:[]}
let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0

class Customer {
  constructor(name, employer) {
    this.id = ++customerId
    this.name = name
    if (employer) {
      this.employerId = employer.id
    }
    store.customers.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery=> {
      return delivery.customerId === this.id
    })
  }
  meals() {
    return this.deliveries().map((delivery) => {
      return delivery.meal()
    })
  }
  totalSpent() {
    return this.meals().reduce(function cb(aggr, elem) {
      return aggr + elem.price
    }, 0)
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
    return store.deliveries.filter(delivery=> {
      return delivery.mealId === this.id
    })
  }
  customers() {
    return this.deliveries().map((delivery) => {
      return delivery.customer()
    })
  }
  static byPrice() {
    let sortedMeals = store.meals.sort(function compare(a,b) {
      return a.price - b.price
    })
    return sortedMeals.reverse()
  }
}

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
  customer() {
    return store.customers.find(customer=> {
      return customer.id === this.customerId
    })
  }
  meal() {
    return store.meals.find(meal=> {
      return meal.id === this.mealId
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
    return store.customers.filter(customer=> {
      return customer.employerId === this.id
    })
  }
  deliveries() {
    return store.deliveries.filter(delivery=> {
      return delivery.customer().employerId === this.id
    })
  }
  meals() {
    let allMeals = this.deliveries().map(delivery=> {
      return delivery.meal()
    })
    return Array.from(new Set(allMeals))
  }
  mealTotals() {
    let countedMeals = {}
    let allMeals = this.deliveries().map(delivery=> {
      return delivery.meal()
    })
    for (const meal of this.meals()) {
      let count = 0
      allMeals.forEach(function cb(elem) {
        elem.title === meal.title? count++ : count
      })
      countedMeals[meal.id] = count
    }
    return countedMeals
  }

}
