let store = {meals: [], employers: [], deliveries: [], customers: []}


let deliveryId = 0
class Delivery{
  constructor(meal = {}, customer = {}){
    this.id = ++deliveryId
    this.mealId = meal.id
    this.customerId = customer.id
    store.deliveries.push(this)
  }
    customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
  }
  meal(){
    return store.meals.find(meal => {
    return meal.id === this.mealId})
  }
 
}

let mealId = 0
class Meal{
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = ++mealId
  
    store.meals.push(this)
  }
  deliveries(){ 
    return store.deliveries.filter(delivery =>{
      return delivery.mealId === this.id
    })
  }
  customers(){
    
    return this.deliveries().map(delivery =>{
      return delivery.customer()
    })
  }
  static byPrice() {
    return store.meals.sort((meal1, meal2) => {
      return meal1.price < meal2.price;
    })
  }
  
}

let employerId = 0

class Employer{
  constructor(name){
  this.name = name
  this.id = ++employerId
   
  
  store.employers.push(this)
  }
  employees() {
      return store.customers.filter(customer => {
              
      return customer.employerId == this.id
    })
  }
  meals() {
        const meals = this.deliveries().map(delivery =>
          delivery.meal())
        const uniqueMeals = [...new Set(meals)]
        return uniqueMeals
      }
  deliveries() {
    let allDeliveries = this.employees().map(employee => {
      return employee.deliveries()
    })
    let merged = [].concat.apply([], allDeliveries)
    
    return merged
  }
  mealTotals() {
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    let summaryObject = {}
    allMeals.forEach(function(meal) {
      summaryObject[meal.id] = 0
    })
    allMeals.forEach(function(meal) {
      summaryObject[meal.id] += 1
    })
    return summaryObject
  }
}

let customerId = 0
class Customer{
  constructor(name, employer = {}){
    this.id = ++customerId
    this.name = name
    this.employerId = employer.id

    store.customers.push(this)
  }
  meals(){
    
    return this.deliveries().map(delivery =>{
      return delivery.meal()

    })
  }
  deliveries(){
       return store.deliveries.filter(deliveries =>{
      // debugger 
      return deliveries.customerId === this.id 
    })
  }

  totalSpent(){
    
    let totalMeals = this.meals()
    return totalMeals.reduce(function(sum, meal){
      return sum + meal.price
    }, 0)
  }
}