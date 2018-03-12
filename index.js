let store = {customers:[], meals:[], deliveries:[], employers:[]}
let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0


class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }
  static byPrice() {
    return store.meals.sort(function(a,b) {
      return b.price - a.price
    })
  }
  deliveries() {
    return store.deliveries.filter(delivery => {return delivery.mealId === this.id})
  }
  customers() {
    return this.deliveries().map(delivery => {return delivery.customer()})
  }
}

class Employer {
  constructor(name) {
    this.name = name
    this.id = ++employerId
    store.employers.push(this)
  }
  employees() {
    return store.customers.filter(customer => {return customer.employerId === this.id})
  }
  deliveries() {
    let array = []
    this.employees().forEach(employee => {array = [...employee.deliveries(), ...array]})
    return array
  }
  meals() {
    let array = []
    this.deliveries().forEach(function (delivery) {
      if (!array.includes(delivery.meal())) {
        array.push(delivery.meal())
      }
    })
    return array
  }
  mealTotals() {
    let object = {}
    this.meals().forEach(function (meal) {
      object[meal.id] = 0;
      this.deliveries().forEach(function (delivery) {
        if (delivery.meal() === meal) {
          object[meal.id] += 1
        }
      })
    }.bind(this))
    return object
  }
}
class Customer {
  constructor(name, employer) {
    this.name = name
    if (employer) {
    this.employerId = employer.id }
    this.id = ++customerId
    store.customers.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => {return delivery.customerId === this.id})
  }
  meals() {
    return this.deliveries().map(delivery =>{return delivery.meal()})
  }
  totalSpent() {
    return this.meals().reduce(function (total, meal) {
      return total += meal.price
    }, 0)
  //  let total = 0
  //  this.meals().forEach(meal => {total += meal.price})
  //  return total
  }

}
class Delivery {
  constructor(meal, customer) {
    if (meal) {
    this.mealId = meal.id }
    if (customer) {
    this.customerId = customer.id }
    this.id = ++deliveryId
    store.deliveries.push(this)
  }
  meal() {
    return store.meals.find(meal => {return meal.id === this.mealId})
  }
  customer() {
    return store.customers.find(customer => {return customer.id === this.customerId})
  }
}
