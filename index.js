// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
class Neighborhood {
  
  constructor(name) {
    this.name = name
    this.id = ++ neighborhoodId
    store.neighborhoods.push(this)
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    })
  }
  
  customers() {
    return store.customers.filter(customer => {
      return customer.deliveryId === this.deliveryId
    })
  }
  
  meals() {
    return store.meals.reduce(function (agg, el, i, arr) {
      return [...agg, el.name];
  }, [])
  }
}


let customerId = 0

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.id = ++ customerId
    this.neighborhoodId = neighborhoodId
    
    store.customers.push(this)
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }
  
  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }
  
  totalSpent() {
    return this.meals().reduce(function(agg, el, i, arr) {
    	return agg + el.price
    }, 0)
  }
}


let mealId = 0

class Meal {
  
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }
  
  customers() {
    return store.customers.filter(customer => {
      return customer.deliveryId === this.deliveryId
    })
  }
  
  static byPrice() {
    return store.meals.sort(function(meal1, meal2){
      return meal2.price - meal1.price
    })
  }
}

let deliveryId = 0

class Delivery {
  
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    store.deliveries.push(this)
  }
  
  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }
    
  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
  }
  
  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId
    })
  }
}

