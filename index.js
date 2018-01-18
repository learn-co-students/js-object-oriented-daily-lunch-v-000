let store = {customers: [], meals: [], deliveries: [], employers: []}


let customerId = 0
class Customer {

  constructor(name, employer){
    this.name = name
    this.employer = employer
    this.id = ++customerId
    store.customers.push(this)
  }

  meals(){

    return this.deliveries().map( delivery => {
      return delivery.meal()
    })
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customer() === this
    })
  }

  totalSpent(){
    // let mealPrices = []
    let mealPrices = this.meals().map(meal => {
                return meal.price
    })

    return mealPrices.reduce(function(total, price) {
      return total + price
    })
  }
}


let mealId = 0
class Meal {

  constructor(title, price){
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }

  customers() {
    return this.deliveries().map(meal => { return meal.customer()} )
  }

  static byPrice() {
    return store.meals.sort(function(meal1, meal2) {
      return meal1.price < meal2.price
    })
  }
}


let deliveryId = 0
class Delivery {

  constructor(meal={}, customer={}){
    this.mealId = meal.id
    this.customerId = customer.id
    this.id = ++deliveryId
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }

  customer(){
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
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
    return store.customers.filter(customer => {
      return customer.employer.id === this.id
    })
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customer().employer.id === this.id
    })
    // return this.employees().map(customer => {
    //   return customer.deliveries()
    // })
  }

  meals() {

    let mealList = []
     mealList =  this.deliveries().map(delivery => {
      return delivery.meal()
    })
  debugger
    return [...new Set(mealList)]
  }

  mealTotals() {
    let mealList = []
     mealList =  this.deliveries().map(delivery => {
      return delivery.meal()
    })

    let finishedList = {}
    mealList.forEach(meal => {
      finishedList[meal.id] = 0
    })

    mealList.forEach(function(meal) {
    finishedList[meal.id] += 1
    })

    return finishedList




    return mealPrices.reduce(function(total, price) {
      return total + price
    })
  }
}
