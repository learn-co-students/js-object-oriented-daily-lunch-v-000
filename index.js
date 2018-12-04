// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodID = 1
let customerID = 1
let mealID = 1
let deliveryID = 1

function findSingle(category) {
  let categoryId = category.toString() + "Id"
  let categoryPlural = category.toString() + "s"
  let itemId = this[categoryId]
  let item = store[categoryPlural].find(category => {
   return itemId == category.id
  })
  return item
}

class Neighborhood {
  constructor(name){
    this.name = name
    this.id = neighborhoodID++
    store.neighborhoods.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery =>{
      return delivery.neighborhoodId == this.id
    })
  }

  customers(){
    return store.customers.filter(customer =>{
      return customer.neighborhoodId == this.id
    })
  }

}

class Customer {
  constructor(name, neighborhoodId){
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = customerID++
    store.customers.push(this)
  }
}

class Meal {
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = mealID++
    store.meals.push(this)
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
  this.mealId = mealId
  this.neighborhoodId = neighborhoodId
  this.customerId = customerId
  this.id = deliveryID++
  store.deliveries.push(this)
}

meal(){
  return store["meals"].find(meal =>{
    return this.mealId == meal.id
  })
}

customer(){findSingle("customer").bind(this)}
}
