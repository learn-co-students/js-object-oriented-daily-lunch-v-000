// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodIdCounter = 0

class Neighborhood {

  constructor(name){
    this.name = name
    this.id = ++neighborhoodIdCounter
    store.neighborhoods.push(this)
  }

  deliveries(){
    return store.deliveries.filter(function(d){return d.neighborhoodId === this.id}.bind(this))
  }

  customers(){
    return store.customers.filter(function(c){return c.neighborhoodId === this.id}.bind(this))
  }

  meals(){
    const deliveriesInThisNeighborhood = store.deliveries.filter(function(d){return d.neighborhoodId === this.id}.bind(this))
    const mealsInThisNeighborhood = deliveriesInThisNeighborhood.map(function(d){return d.meal()})
    return Array.from(new Set(mealsInThisNeighborhood))
  }
}

let customerIdCounter = 0

class Customer {
  constructor(name, neighborhoodId){
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerIdCounter
    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(function(d){return d.customerId === this.id}.bind(this))
  }

  meals(){
    return this.deliveries().map(function(d){return d.meal()})
  }

  totalSpent(){
    return this.meals().reduce(function(sum, meal){
      return sum + meal.price
    }, 0)
  }
}


let mealIdCounter = 0

class Meal {
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = ++mealIdCounter
    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(function(d){return d.mealId === this.id}.bind(this))
  }

  customers(){
    const allMeals = this.deliveries().map(function(d){return d.customer()})
    return Array.from(new Set(allMeals))
  }

  static byPrice(){
    return store.meals.sort(function(meal1, meal2){return meal2.price - meal1.price})
  }
}

let deliveryIdCounter = 0

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryIdCounter
    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find(function(meal){return meal.id === this.mealId}.bind(this))
  }

  customer(){
    return store.customers.find(function(c){return c.id === this.customerId}.bind(this))
  }

  neighborhood(){
    return store.neighborhoods.find(function(n){return n.id === this.neighborhoodId}.bind(this))
  }
}
