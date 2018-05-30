// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0

class Neighborhood {
  constructor(name){
    this.name = name
    this.id = ++neighborhoodId
    
    store.neighborhoods.push(this)
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    })
  }
  
  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id 
    })
  }
  
  meals() {
    let unique = store.deliveries.filter(delivery => {
      if (delivery.neighborhoodId === this.id) {
        return delivery.mealId
      }
    }) 
    return [...new Set(unique)]
  } 
}

let customerId = 0

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId
    
    store.customers.push(this)
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id 
    })
  }
  
  meals() {
   store.deliveries.filter(delivery => {
      if (delivery.customerId === this.id) {
        return delivery.mealId
      }
    }) 
   
  }
  
  totalSpent() {
  
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
  
  customers(){
    return store.customers.filter(customer => {
      return customer.mealId === this.id 
    })
  }
  
  byPrice(){
    
  }
}

let deliveryId = 0

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId
    
    store.deliveries.push(this)
  }
  
  meal(){
    const mId = this.mealId
    return store.meals.find(meal => {
      return meal.id === mId
    })
  }
  
  customer(){
    const cId = this.customerId
   return store.customers.find(customer => {
     return customer.id === cId
   }) 
  }
  
  neighborhood() {
    const nId = this.neighborhoodId
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === nId
    })
  }
}









  