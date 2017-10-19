let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0

store = { customers: [], meals: [], deliveries: [], employers: [] }

class Customer {
  constructor(name, employer = {}) {
    this.id = ++customerId
    this.name = name
    this.employerId = employer.id

    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.customerId === this.id
    }.bind(this))
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

class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price

    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.mealId === this.id
    }.bind(this))
  }

  customers() {
    return this.deliveries().map(function(delivery) {
      return delivery.customer()
    })
  }

  static byPrice() {
    return store.meals.sort(function(meal1, meal2) {
      return meal1.price < meal2.price
    })
  }
}

class Delivery {
  constructor(meal = {}, customer = {}) {
    this.id = ++deliveryId
    this.mealId = meal.id
    this.customerId = customer.id

    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(function(meal) {
      return this.mealId === meal.id
    }.bind(this))
  }

  customer() {
    return store.customers.find(function(customer) {
      return this.customerId === customer.id
    }.bind(this))
  }

}

class Employer {
  constructor(name) {
    this.id = ++employerId
    this.name = name

    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(function(customer) {
      return customer.employerId === this.id
    }.bind(this))
  }

  deliveries() {
    let allDeliveries = this.employees().map(function(employee) {
      return employee.deliveries()
    })
    let merged = [].concat.apply([], allDeliveries)
    return merged
  }

  meals() {
    let allMeals = this.deliveries().map(function(delivery) {
      return delivery.meal()
    })
    return [...new Set(allMeals)]
  }

  mealTotals() {
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    let totals = {}

    allMeals.forEach(function(meal) {
      if(totals[meal.id]) {
        totals[meal.id] += 1;
      } else {
        totals[meal.id] = 1;
      }
    })
    
    return totals
  }
}
