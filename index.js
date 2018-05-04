let store = {
   customers: [],
   meals: [],
   deliveries: [],
   employers: []
 }
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
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  meals() {
    let mealIds = this.deliveries().map(delivery => {
      return delivery.mealId
    })
    return store.meals.filter(meal => {
      return mealIds.some(x => x === meal.id)
    })
  }

  totalSpent() {
    return this.meals().reduce(function(agg, meal) {
      return agg += meal.price
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
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }

  customers() {
    let customerIds = this.deliveries().map(delivery => {
      return delivery.customerId
    })
    return store.customers.filter(customer => {
      return customerIds.some(x => x === customer.id)
    })
  }

  static byPrice() {
    return store.meals.sort(function(a, b) {
      return b.price - a.price
    })
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

  meal() {
    return store.meals.filter(meal => {
      return meal.id === this.mealId
    })[0]
  }

  customer() {
    return store.customers.filter(customer => {
      return customer.id === this.customerId
    })[0]
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
    let employeeIds = this.employees().map(employee => {
      return employee.id
    })
    return store.deliveries.filter(delivery => {
      return employeeIds.some(x => x === delivery.customerId)
    })
  }

  meals() {
    let mealIds = this.deliveries().map(delivery => {
      return delivery.mealId
    })
    return store.meals.filter(meal => {
      return mealIds.some(x => x === meal.id)
    })
  }

  mealTotals() {
    let mealIds = this.deliveries().map(delivery => {
      return delivery.mealId
    })
    let returnObject = {}
    mealIds.forEach(function(mealId) {
      if (returnObject[mealId]) {
        returnObject[mealId] += 1
      }
      else {
        returnObject[mealId] = 1
      }
    })
    return returnObject
  }
}
