// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborId = mealId = customerId = deliverId = 0;

class Neighborhood {
  constructor(name) {
    this.id = ++neighborId
    this.name = name
    store.neighborhoods.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
  }

  customers(){
    return store.customers.filter(customer => customer.neighborhoodId === this.id)
  }

  meals(){
    let meals = this.deliveries().map(deli => deli.meal())
    return [...new Set(meals)]
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(deli => deli.mealId === this.id)
  }

  customers(){
    return this.deliveries().map(deli => deli.customer())
  }

  static byPrice(){
    return store.meals.sort((meal1, meal2) => meal2.price - meal1.price)
  }
}

class Delivery {
  constructor(meal, neighbor, customer) {
    this.id = ++deliverId
    if (meal && neighbor && customer){
    this.mealId = meal
    this.neighborhoodId = neighbor
    this.customerId = customer
    }
    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find(meal => meal.id === this.mealId)
  }

  customer(){
    return store.customers.find(customer => customer.id === this.customerId)
  }

  neighborhood(){
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }
}

class Customer {
  constructor(name, neighbor) {
    this.id = ++customerId
    this.name = name
    if (neighbor) {
      this.neighborhoodId = neighbor
    }
    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(deli => deli.customerId === this.id)
  }

  meals(){
    return this.deliveries().map(deli => deli.meal())
  }

  totalSpent(){
    return this.meals().reduce((acc, meal) => acc + meal.price, 0)
  }
}
