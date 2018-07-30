// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0

class Neighborhood {
  constructor(name){
    this.id = ++neighborhoodId
    this.name = name
    store.neighborhoods.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    })
  }

  customers(){
    return this.deliveries.map(delivery => {
      return delivery.customer()
    })
  }
}


class Meal {
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }

}


class Customer {
  constructor(name, neighborhoodId){
    this.id = ++customerId
    this.name = name
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }

}



class Delivery {
  constructor(customerId, neighborhoodId, mealId){
    this.id = ++deliveryId
    this.customerId = customerId
    this.neighborhoodId = neighborhoodId
    this.mealId = mealId
    store.deliveries.push(this)
  }
  customer(){
  return store.customers.find(customer =>{
    return customer.id === this.customerId
  })
}

}
