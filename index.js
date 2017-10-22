
let store = {customers:[], meals:[], employers:[], deliveries:[]}

let customerId = 0
class Customer {
  constructor(name, employer) {
    this.name = name
    this.employer = employer
    this.id = ++customerId

    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter((delivery) => {
      return delivery.customerId === this.id
    })
  }

  meals() {
    return this.deliveries().map((delivery) => {
      return delivery.meal()
    })
  }

  totalSpent() {
    return this.meals().reduce(function (a,b) {return a.price +b.price;})
  }
}

let employerId = 0
class Employer {
  constructor(name) {
    this.name = name
    this.id = ++employerId

    store.employers.push(this)
  }

  employees() {
    return store.customers.filter((customer) => {
      return customer.employer === this
    })
  }

  deliveries() {
    return this.employees().map((employee) => {
      return employee.deliveries()
    }).reduce((a, b) => a.concat(b), [] )
  }

  meals() {
    let allMealsOrdered = this.employees().map((employee) => {
      return employee.meals()
    }).reduce((a, b) => a.concat(b), [] )
    let allWithoutDups = [...new Set(allMealsOrdered)]
    return allWithoutDups
  }

  mealTotals() {
    var obj = { };

    let all = this.employees().map((employee) => {
      return employee.meals()
    }).reduce((a, b) => a.concat(b), [] )

    for (var i = 0, j = all.length; i < j; i++) {
       obj[all[i].id] = (obj[all[i].id] || 0) + 1;
    }
    return obj
  }
}

let mealId = 0
class Meal {

  static byPrice() {
    let menu =
    store.meals.sort(function (a, b) {
      return b.price - a.price;
    });
    return menu
  }

  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId

    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter((delivery) => {
      return delivery.mealId === this.id
    })
  }

  customers() {
    return this.deliveries().map((delivery) => {
      return delivery.customer()
    })
  }
}

let deliveryId = 0
class Delivery {

  constructor(meal, customer) {
    this.id = ++deliveryId
    store.deliveries.push(this)
    if (meal) {
      this.mealId = meal.id
    }
    if (customer) {
      this.customerId = customer.id
    }
  }

  customer() {
    return store.customers.find((customer) => {return customer.id === this.customerId})
  }

  meal() {
    return store.meals.find((meal) => {return meal.id === this.mealId})
  }
}
