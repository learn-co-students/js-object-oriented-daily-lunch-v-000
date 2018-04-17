let store = {customers:[], employers:[], deliveries:[], meals:[]}

let customerId = 0
let employerId = 0
let deliveryId = 0
let mealId = 0

class Customer {
  constructor(name, employer = {}){
    this.id = ++customerId
    this.name = name
    this.employerId = employer.id

    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return this.id === delivery.customerId
    })
  }

  meals(){
    return this.deliveries().map(delivery => {
      return delivery.meal();
    })
  }

  totalSpent(){
    return this.meals().reduce((total, current) => {
      return total + current.price
    },0)
  }
}

class Employer{
  constructor(name){
    this.id = ++employerId
    this.name = name
    store.employers.push(this)
  }

  employees(){
    return store.customers.filter(customer => {
      return this.id === customer.employerId
    })
  }

  deliveries(){
    return store.deliveries.filter(delivery =>{
      return delivery.customer().employerId === this.id;
    })
  }

  meals(){
    let unique = []
    this.deliveries().map(delivery =>{
      unique.push(delivery.meal());
    })
    return Array.from(new Set(unique))
  }

  mealTotals(){
    let totalMeals = {}
    this.meals().map(meal =>{
      let customerCount = 0
      meal.customers().map(customer =>{
        ++customerCount
      })
      totalMeals[meal.id] = customerCount
    })
    return totalMeals
  }

}

class Meal{
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  static byPrice(){
    return store.meals.sort((a,b) => {
      return b.price - a.price
    })
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return this.id === delivery.mealId
    })
  }

  customers(){
    return this.deliveries().map(delivery => {
      return delivery.customer();
    })
  }
}

class Delivery{
  constructor(meal = {}, customer = {}){
    this.id = ++deliveryId
    this.mealId = meal.id
    this.customerId = customer.id
    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find(meal => {
      return this.mealId === meal.id
    })
  }

  customer(){
    return store.customers.find(customer => {
      return this.customerId === customer.id
    })
  }
}
