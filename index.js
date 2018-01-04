

let store = {
  deliveries:[],
  meals:[],
  employers:[],
  customers:[],
}

let deliveryID = 0

class Delivery {
  constructor(meal, customer){
    this.id = ++deliveryID
    if (meal){
      this.mealId = meal.id
    }
    if (customer){
      this.customerId = customer.id
    }
    store.deliveries.push(this)
  }

  static all(){
    return store.deliveries
  }

  static find(id){
    return Delivery.all().find(delivery =>{
      return delivery.id === id
    })
  }

  meal(){
    let meals = Meal.all()
    return meals.find(meal=>{
      return meal.id === this.mealId
    })
  }

  customer(){
    let customers = Customer.all()
    return customers.find(customer => {
      return customer.id === this.customerId
    })
  }
}

let mealID = 0

class Meal {
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = ++mealID
    store.meals.push(this)
  }

  static all(){
    return store.meals
  }

  static byPrice(){
    let meals = Meal.all()
    let mealSort = function(a, b){
      return b.price - a.price
    }

    return meals.sort(mealSort)
  }

  deliveries(){
    let deliveries = Delivery.all()
    return deliveries.filter(delivery => {
      return delivery.mealId == this.id
    })
  }

  customers(){
    let myDeliveries = this.deliveries()
    let customers = []
    // let res =  myDeliveries.map(function (delivery) {
    //   return Object.assign({}, delivery.customer())
    // })
    // debugger
    // return res
    for (const delivery of myDeliveries) {
      let customer = delivery.customer()
      if (!customers.includes(customer) ){
        customers.push(customer)
      }
    }
    return customers
  }

}

let employerID = 0

class Employer {
  constructor(name){
    this.name = name
    this.id = ++employerID
    store.employers.push(this)
  }

  static all(){
    return store.employers
  }

  employees(){
    return Customer.all().filter(customer => {
      return customer.employerId === this.id
    })
  }

  deliveries(){
    let myEmployees = this.employees()
    let deliveries = []

    for (const employee of myEmployees) {
      let myDeliveries = employee.deliveries()
      for (const delivery of myDeliveries) {
        if(!deliveries.includes(delivery)){
          deliveries.push(delivery)
        }
      }
    }

    return deliveries
  }

  meals(){
    let myDeliveries = this.deliveries()
    let myMeals = []
    for (const delivery of myDeliveries) {
      let meal = delivery.meal()
      if(!myMeals.includes(meal)){
        myMeals.push(meal)
      }
    }

    return myMeals
  }

  mealTotals(){
    const myDeliveries = this.deliveries()
    let totalMeals = {}

    for (const delivery of myDeliveries) {
      //used to use meal title as key, was prettier.
      let mealName = delivery.meal().id
      let mealValue = totalMeals[mealName]
      if (mealValue === undefined){
        totalMeals[mealName] = 1
      }
      else {
        totalMeals[mealName] = ++mealValue
      }
    }
    return totalMeals
  }

}

let customerID = 0

class Customer {
  constructor(name, employer){
    this.name = name
    this.id = ++customerID
    if (employer){
      this.employerId = employer.id
    }
    store.customers.push(this)
  }

  static all(){
    return store.customers
  }

  meals(unique){
    let myDeliveries = this.deliveries()
    let meals = []

    for (const delivery of myDeliveries) {
      let meal = delivery.meal()
      if(!meals.includes(meal) && unique === undefined){
        meals.push(meal)
      }
      else if(unique){
        meals.push(meal)
      }
    }

    return meals
  }

  deliveries(){
    return Delivery.all().filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  totalSpent(){
    const allMeals = this.meals(true)
    let total = 0

    for (const meal of allMeals) {
      total = total + meal.price
    }
    return total
  }
}