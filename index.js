// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodID = 1
let customerID = 1
let mealID = 1
let deliveryID = 1

class Neighborhood {
  constructor(name){
    this.name = name
    this.id = neighborhoodID++
  }
}

class Customer {
  constructor(name, neighborhoodId){
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = customerID++
  }
}

class Meal {
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = mealID++
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
  this.mealId = mealId
  this.neighborhoodId = neighborhoodId
  this.customerId = customerId
  this.id = deliveryID++
}
}
