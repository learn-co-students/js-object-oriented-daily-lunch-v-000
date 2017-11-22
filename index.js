let store = {customers: [], meals: [], deliveries: [], employers: []};

customerId = 0

class Customer {
  constructor(name, employer) {
    this.name = name
    this.id = ++customerId
    this.employerId = employer

    store.customers.push(this)
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }

  deliveries() {
    return store.deliveries.filter(deliveries => {
      return deliveries.customerId === this.id
    })
  }

  totalSpent() {
   return this.meals().reduce(function(a, b) {
      return a.price + b.price;
    })
  }
}

mealId = 0

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
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }

  static byPrice() {
    return store.meals.sort((a,b) => {
      return b.price - a.price
    })
  }
}

deliveryId = 0

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId
    if(meal) {
      this.mealId = meal.id
    }
    if(customer) {
      this.customerId = customer.id
    }

    store.deliveries.push(this)
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }
}

employerId = 0

class Employer {
  constructor(name) {
    this.name = name
    this.id = ++employerId

    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this
    })
  }

  deliveries() {
    return store.deliveries.filter(function(delivery){
       return delivery.customer().employerId === this
     }.bind(this))
  }

  meals() {
    let meals = this.deliveries().map(delivery => {
      return delivery.meal()
      })
      return [...new Set(meals)]
  }

  mealTotals() {
    let deliveries = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    let mealCount = {}

    deliveries.forEach((meal) => {
      mealCount[meal.id] = 0
    })

    deliveries.forEach((meal) => {
      mealCount[meal.id] += 1
    })
    return mealCount
  }


}
