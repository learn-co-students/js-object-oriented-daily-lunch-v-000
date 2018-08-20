// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0
 class Neighborhood {
  constructor(name){
    this.id = ++neighborhoodId
    this.name = name
     store.neighborhoods.push(this)
  }
   deliveries(){
    return store.deliveries.filter(function(delivery){
      return delivery.neighborhoodId === this.id
    }.bind(this))
  }
   customers(){
    let deliveries = this.deliveries()
    return deliveries.map(delivery => {
      return delivery.customer()
    }).filter(function(e, i, arr) {
      return arr.lastIndexOf(e) === i;
    })
  }
   meals(){
    return this.deliveries().map(delivery => {
      return delivery.meal()
    }).filter(function(e, i, arr) {
      return arr.lastIndexOf(e) === i;
    })
  }
}
 class Customer {
  constructor(name, neighborhoodId){
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId
     store.customers.push(this)
  }
   deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }
   meals(){
    let deliveries = this.deliveries()
    return deliveries.map(delivery =>{
      return delivery.meal()
    })
  }
   totalSpent(){
    return this.meals().reduce(function(acc, meal){
      return acc + meal.price
    },0)
  }
}
 class Meal {
  constructor(title, price){
    this.price = price
    this.title = title
    this.id = ++mealId
     store.meals.push(this)
  }
   deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }
   customers(){
    let deliveries = this.deliveries()
    return deliveries.map(delivery => {
      return delivery.customer()
    })
  }
 }
 Meal.byPrice = function(){
  return store.meals.sort(function(a,b){
    return b.price - a.price
  })
}
 class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId
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
   neighborhood(){
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId
    })
  }
}
