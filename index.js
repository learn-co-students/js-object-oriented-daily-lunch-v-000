let store = {deliveries:[], meals:[], employers: [], customers: []}
let idDelivery = 0
let idMeal = 0
let idEmployee = 0
let idCustomer = 0

class Delivery {
  constructor(meal,customer) {
    this.id = ++idDelivery
    if (meal) {
      this.mealId = meal.id
    }

    if (customer) {
      this.customerId = customer.id

    }
    store.deliveries.push(this)
  }

  customer() {
    return store.customers.find(function(c){
      return c.id === this.customerId
    }.bind(this))
  }

  meal() {
    return store.meals.find(function(m){
      return m.id === this.mealId
    }.bind(this))
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++idMeal
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(function(element) {
      return element.mealId == this.id
    }.bind(this))
  }

  customers () {
    return this.deliveries().map(function(element){
      return element.customer()
    })
  }
}

Meal.byPrice = function () {
  return store.meals.sort(function(a, b){return b.price-a.price});
}

class Employer {
  constructor(name) {
    this.id = ++idEmployee
    this.name = name
    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(function(customer){
      return customer.employerId === this.id
    }.bind(this))
  }

  deliveries() {
    let results
    results =  this.employees().map(function(employee) {
      return employee.deliveries()
    })
    return results[0]
  }

  meals () {
    let meals
    meals =  this.employees().map(function(employee) {
      return employee.meals()
    })
    let uniq_meals = Array.from(new Set(meals[0]))
    return uniq_meals
  }

  mealTotals() {
    const meals = this.employees().map(function(employee) {
      return employee.meals()
    })
    let counts = {}
    meals[0].forEach(function(meal) { counts[meal.id] = (counts[meal.id] || 0)+1; })
    return counts
  }
}

class Customer {
  constructor(name, employer) {
    this.id = ++idCustomer
    this.name = name
    if (employer) {
      this.employerId = employer.id
    }
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(function(element) {
      return element.customerId == this.id
    }.bind(this))
  }

  meals() {
    return store.deliveries.map(function (delivery) {
      return delivery.meal()
    })
  }

  totalSpent () {
    let total = 0
    let meals = this.meals().filter(function(e) {
      return e != undefined
    })
    for (let i = 0; i < meals.length; i++) {
      total += meals[i].price
    }
    return total
  }
}
