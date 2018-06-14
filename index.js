// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = neighborhoodId++
    store.neighborhoods.push(this)
  }

  deliveries(){
    return store.deliveries.filter(d => {return d.neighborhoodId === this.id})
  }

  customers(){
    return store.customers.filter(c => {return c.neighborhoodId === this.id})
  }

  meals(){
    let result = []
    for (const obj of this.customers()){
      for (const meal in obj){
        result.push(meal)
      }
    }
    return result
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = customerId++
    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(d => {return d.customerId === this.id})
  }

  meals(){
    let delivArray = this.deliveries()
    let result = []
    for (const obj of delivArray){
      result.push(
        store.meals.find(m => {return m.id === obj.mealId})
      )
    }
    return result;
  }

  totalSpent(){
    let result = 0;
    for (const obj of this.meals()){
      result = result + obj.price
    }
    return result;
  }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = mealId++
    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(d => {return d.mealId === this.id})
  }

  customers(){
    let delivArray = this.deliveries()
    let result = []
    for (const obj of delivArray){
      result.push(
        store.customers.find(m => {return m.id === obj.customerId})
      )
    }
    return result;
  }

  static byPrice(){
    return store.meals.sort(function (a, b){return b.price - a.price})
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.customerId = customerId
    this.neighborhoodId = neighborhoodId
    this.id = deliveryId++
    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find(m => {return m.id === this.mealId})
  }

  customer(){
    return store.customers.find(c => {return c.id === this.customerId})
  }

  neighborhood(){
    return store.neighborhoods.find(n => {return n.id === this.neighborhoodId})
  }
}
