let store = {deliveries: [], meals: [], employers: [], customers: []}

let deliveryId = 0
let mealId = 0
let employerId = 0
let customerId = 0

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId
    if(customer) {
      this.customerId = customer.id
      this.mealId = meal.id
    }

    store.deliveries.push(this) 
  }

  // delivery belongs to customer
  customer() {
    return store.customers.find( customer => customer.id === this.customerId )
  }

  // delivery belongs to meal
  meal() {
    return store.meals.find( meal => meal.id === this.mealId )
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price

    store.meals.push(this)
  }

  static byPrice() {
    return store.meals.concat().sort( (a,b) => b.price - a.price)
  }

  // meal belongs to delivery
  deliveries() {
    return store.deliveries.filter( delivery => delivery.mealId == this.id )
  }

  // meal has customers through deliveries
  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    })
  }
}

class Employer {
  constructor(name){
    this.id = ++employerId
    this.name = name

    store.employers.push(this)
  }

  //customer belongs to employer
  employees() {
    return store.customers.filter( customer => customer.employerId == this.id)
  }
}

class Customer {
  constructor(name, employer){
    this.id = ++customerId
    this.name = name
    if(employer) {
      this.employerId = employer.id
    }

    store.customers.push(this)
  }

  totalSpent() {
    // use reduce?
  }

  deliveries() {
    return store.deliveries.find( delivery => delivery.customerId == this.id)
  }

  meals() {
    return store.meals.filter( meal => meal.customerId == this.mealId)
  }
}

