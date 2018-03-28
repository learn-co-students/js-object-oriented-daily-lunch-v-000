let store = {deliveries:[], meals:[], employers:[], customers:[]}
let customerId = 0
let deliveryId = 0
let mealId = 0
let employerId = 0

class Employer{
  constructor(name){
    this.name = name
    this.id = ++employerId
    store.employers.push(this)
  }
  employees(){
    return store.customers.filter(customer => customer.employerId === this.id)
  }
  deliveries(){
    const myDeliveries = []
    this.employees().forEach(employee =>{
      employee.deliveries().forEach(delivery =>{
        myDeliveries.push(delivery)
      })
    })
    return myDeliveries;
  }

  meals(){
    let myMeals = []
    this.deliveries().forEach(function(delivery) {
      if (!myMeals.includes(delivery.meal())){
        myMeals.push(delivery.meal());
      }
    })
    return myMeals
  }
  mealTotals(){
    let total = {}
    this.meals().forEach(function(meal){
      total[meal.id] = 0;
      this.deliveries().forEach(function(delivery){
        if (delivery.meal() === meal){
          total[meal.id] += 1
        }
      })
    }.bind(this))
    return total
  }
}
class Customer{
  constructor(name, employer){
    this.name = name
    this.id = ++customerId
    if(employer){
      this.employerId = employer.id
    }
    store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }
  meals(){
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }
  totalSpent(){
    return this.meals().reduce(function(accumulator, currentValue){
      return accumulator + currentValue.price
    },0)
  }
}
class Meal{
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }
  customers(){
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }
  static byPrice(){
    return store.meals.sort(function(meal1,meal2){
      return meal2.price - meal1.price;
    })
  }
}
class Delivery{
  constructor(meal, customer){
    this.id = ++deliveryId
    if (meal){
      this.mealId = meal.id
    }
    if (customer){
      this.customerId = customer.id
    }
    store.deliveries.push(this)
  }
  customer(){
    return store.customers.find(customer => customer.id == this.customerId)
  }
  meal(){
    return store.meals.find(meal => meal.id === this.mealId)
  }
}
