store = {customers: [], meals: [], deliveries: [], employers: []}

customerId = 0
class Customer {
  constructor(name,employer) {
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
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }

  totalSpent() {
    return this.meals().reduce(function(agg,meal) {
      return agg.price + meal.price
    })
  }
}

mealId = 0
class Meal {
  constructor(title,price) {
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
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }

  static byPrice() {
    return store.meals.sort(function(a,b) {
      return b.price - a.price
    })
  }
}

deliveryId = 0
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

employerId = 0
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
    let array = []
    let employerDeliveries =  this.employees().map(employee => {
      return employee.deliveries()
    })

    let combinedArray = array.concat.apply(array,employerDeliveries)
    return combinedArray
  }

  meals() {
    let employerMeals = this.deliveries().map(delivery => {
      return delivery.meal()
    })

    let uniqueMeals = [...new Set(employerMeals)]
    return uniqueMeals
  }

  mealTotals() {
    let employerMeals = this.deliveries().map(delivery => {
      return delivery.meal()
    })

    let meals = {}
    employerMeals.forEach(meal => {
      if (meals[meal.id]) {
      meals[meal.id] += 1 } else {
        meals[meal.id] = 1
      }
    })
    return meals
  }
}
