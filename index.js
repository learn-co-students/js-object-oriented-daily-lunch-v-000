let store = {customers: [], meals: [], deliveries: [], employers: []}; 

let customerId = 0;
class Customer{
  constructor(name, employer = {}){
    this.id = ++customerId 
    this.name = name 
    this.employerId = employer.id
    store.customers.push(this)
  }
  meals(){
    return this.deliveries().map(delivery => {
      return delivery.meal();
    })
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id; 
    })
  }
  totalSpent(){
    return this.meals().reduce(function(sum, meal) {
      return sum + meal.price;
    }, 0); 
  }
}

let mealId = 0;
class Meal{
  constructor(title, price){
    this.id = ++mealId
    this.title = title 
    this.price = price 
    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    })
  }
  customers(){
    return store.deliveries.map(delivery => {
      return delivery.customer();
    })
  }
  
  static byPrice() {
    return store.meals.sort(function(a, b){
      return b.price - a.price; 
    })
  }
}

let deliveryId = 0;
class Delivery{
  constructor(meal, customer){
    this.id = ++deliveryId 
    if (meal && customer) {
      this.mealId = meal.id 
      this.customerId = customer.id 
    }
    store.deliveries.push(this)
  }
  meal(){
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

let employerId = 0;
class Employer {
  constructor(name) {
    this.id = ++employerId 
    this.name = name 
    store.employers.push(this)
  }
  employees(){
    return store.customers.filter(customer => {
      return customer.employerId === this.id 
    })
  }
  
  deliveries(){
   let employerDeliveries = []
   this.employees().forEach(employee => {
     employee.deliveries().forEach(delivery => {
       employerDeliveries.push(delivery)
     })
   })
     return employerDeliveries
  }
  
  meals(){
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal() 
    })
    let uniqueMeals = Array.from(new Set(allMeals))
    return [].concat(...uniqueMeals)
  }
  
  mealTotals(){
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    let mealTotal = {} 
    allMeals.forEach(function(meal){
      mealTotal[meal.id] = 0
    })
    allMeals.forEach(function(meal){
      mealTotal[meal.id] += 1 
    })
    return mealTotal
  }
}


