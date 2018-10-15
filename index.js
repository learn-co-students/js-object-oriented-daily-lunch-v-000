// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0

class Neighborhood {
  constructor(name){
    this.name = name
    this.id = ++neighborhoodId

    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      console.log(delivery)
      return delivery.neighborhoodId === this.id;
    });
  }

  customers() {
    return store.customers.filter(customer => {return customer.neighborhoodId === this.id})
  }
}

class Customer {
  constructor(name, neighborhood){
    this.name = name
    this.id = ++customerId
    this.neighborhoodId = neighborhood

    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {return delivery.customerId === this.id})
  }

  meals(){
    let meals = []
    let result;
    let mealDeliveries = this.deliveries()
    mealDeliveries.forEach(function(delivery)
      {result = store.meals.find(function(meal){
        return meal.id === delivery.mealId
      })
      meals.push(result)
    })
    return meals
  }

  totalSpent(){
    return this.meals().reduce(meal.price)
  }
}

class Meal {
  constructor(title, price){
    this.title = title
    this.id = ++mealId
    this.price = price

    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {return delivery.mealId === this.id})
  }

  customers(){
    let customers = []
    let result;
    let mealDeliveries = this.deliveries()
    mealDeliveries.forEach(function(delivery)
      {result = store.customers.find(function(customer){
        return customer.id === delivery.customerId
      })
      customers.push(result)
    })
    return customers
  }

}

class Delivery {
  constructor(meal, customer, neighborhood){
    this.id = ++deliveryId
    this.mealId = meal
    this.customerId = customer
    this.neighborhoodId = neighborhood

    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find(function(meal) {return meal.id})
  }

  customer(){
    return store.customers.find(function(customer) {return customer.id})
  }

  neighborhood(){
    return store.neighborhoods.find(function(neighborhood) {return neighborhood.id})
  }

}
