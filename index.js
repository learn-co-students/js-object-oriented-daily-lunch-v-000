let store = {customers: [], meals: [], deliveries: [], employers: []}
let customerId = 0
let employerId = 0
let mealId = 0
let deliveryId = 0

class Customer  {
  constructor (name, employer = {}) {
    this.name = name
    this.id = ++customerId
    this.employerId = employer.id
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  meals () {
    return this.deliveries().map(delivery => {
      // console.log(delivery.meal())
      return delivery.meal()
    })
  }

  totalSpent() {
    // console.log(this.meals())
    return this.meals().reduce(function (accumulator, current) {
      // console.log(accumulator)
      return accumulator + current.price
    }, 0)
  }
}

class Meal {
  constructor (title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter (delivery => {
      return delivery.mealId === this.id
    })
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }

  static byPrice() {
    return store.meals.sort(function (a, b) {
      return b.price - a.price
    })
  }

}

class Delivery {
  constructor (meal = {}, customer = {}) {
    this.id = ++deliveryId
    this.mealId = meal.id
    this.customerId = customer.id
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

class Employer {
  constructor (name) {
    this.name = name
    this.id = ++employerId
    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    })
  }

  deliveries() {
    let allDeliveries = this.employees().map(employee => {
      return employee.deliveries();
    });
    let merged = [].concat.apply([], allDeliveries);
    return merged;
  }

  meals() {
    let meals = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    let unique = [...new Set(meals)]
    return unique
  }

  mealTotals() {
    // add up all meals by meal id, return an object like {mealid1 : 3}
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    })
    let final = {}
    allMeals.forEach(function (meal) {
      final[meal.id] = 0
    })
    allMeals.forEach(function (meal) {
      final[meal.id] += 1
    })
    return final
  }
}
