let store = { customers: [], meals: [], deliveries: [], employers: [] }

let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0

function flatten (list) {
  var clonedList = list.slice(0)
  var flatList = []
  while (clonedList.length) {
    var item = clonedList.shift()
    if (item instanceof Array === true) {
      clonedList = item.concat(clonedList)
    } else {
      flatList.push(item)
    }
  }
  return flatList
}

class Customer{

  constructor (name, employer) {
    this.id = ++customerId
    this.name = name
    if (employer) { this.employerId = employer.id }
    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter( delivery => { return delivery.customerId === this.id})//.bind(this)
  }

  meals(){
    //debugger
    return this.deliveries().map( function (delivery) { return delivery.meal() })
  }



  totalSpent () {
    return this.meals().reduce(function (total, current) { return total + current.price },0)
  }
}  // CUSTOMERS CLOSING BRACKET

class Meal{

  constructor(title,price){
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }
  static byPrice(){
    let mealsArray = store.meals.slice()
    return mealsArray.sort( function (a,b) { return b.price - a.price },0)
  }

  deliveries(){
    return store.deliveries.filter( delivery => { return delivery.mealId === this.id })
  }

  customers(){
    return store.deliveries.map(delivery => { return delivery.customer()})
  }
}

class Delivery{

  constructor (meal, customer) {
    this.id = ++deliveryId
    if (meal) { this.mealId = meal.id}
    if (customer) { this.customerId = customer.id}
    store.deliveries.push(this)
  }

  meal () {
    return store.meals.find(meal => { return meal.id === this.mealId })
  }
  customer () {
    return store.customers.find(customer => { return customer.id === this.customerId})
  }
}

class Employer{

  constructor(name){
    this.id = ++employerId
    this.name = name
    store.employers.push(this)
  }

  employees () {
    return store.customers.filter(customer => { return customer.employerId === this.id })
  }
  deliveries () {

    let deliveries = this.employees().map(employee => { return employee.deliveries() })
    return flatten(deliveries)
  }
  meals () {
    let meals = this.employees().map(employee => { return employee.meals() })
    meals = flatten(meals)
    const mealsSet = new Set(meals)
    meals = [...mealsSet]
    //debugger
    return meals
  }

  mealTotals () {
    let meals = this.employees().map(employee => { return employee.meals() })
    meals = flatten(meals)

    return meals.reduce((tally, meal) => {
      tally[meal.id] = (tally[meal.id] || 0) + 1
      //debugger
      return tally
    }, {})
  }

}
