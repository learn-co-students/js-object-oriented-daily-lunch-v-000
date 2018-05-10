let store = {customers: [], meals: [], deliveries: [], employers: []}

let deliveryId = 0
let mealId = 0
let customerId = 0
let employerId = 0


class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId
    if(meal){
      this.mealId = meal.id
    }
    if(customer){
      this.customerId = customer.id
    }
    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find((meal) => this.mealId === meal.id);
  }

  customer(){
    return store.customers.find((customer) => this.customerId === customer.id);
  }

}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  static byPrice(){
    return store.meals.sort(function(a,b) {
      return a.price < b.price;
    })
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }

  customers(){
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }

}

class Customer {
  constructor(name, employer) {
    this.name = name
    this.id = ++customerId
    if(employer){
      this.employerId = employer.id
    }
    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    });
  }

  totalSpent() {
    return this.meals().reduce(function(a, b) {
      return a + b.price;
    }, 0);
  }

}

class Employer {
  constructor(name) {
    this.name = name
    this.id = ++employerId
    store.employers.push(this)
  }

  employees(){
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    })
  }

  deliveries(){
    let allDeliveries = this.employees().map(employee => {
      return employee.deliveries()
    })
    return [].concat.apply([], allDeliveries)
  }

  meals(){
    let allMeals = this.employees().map(employee => {
      return employee.meals()
    })
    let meals = [].concat.apply([], allMeals)
    let uniqueMeals = [...new Set(meals)]
    return uniqueMeals
  }

  mealTotals(){
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    })

    let summaryObject = {}

    allMeals.forEach(function(meal){
      summaryObject[meal.id] = 0
      debugger
    })

    allMeals.forEach(function(meal){
      summaryObject[meal.id] += 1
    })

    return summaryObject

  }

}
