// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

neighborhoodId = 0

class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return this.id === delivery.neighborhoodId
    })
  }
  customers() {
    return store.customers.filter(customer => {
      return this.id === customer.neighborhoodId
    })
  }
  meals() {
    const mealArray = this.customers().map(customer => customer.meals());
    const merged = [].concat.apply([], mealArray);
    return [...new Set(merged)]
  }
}

customerId = 0

class Customer {
  constructor(name,neighborhoodId) {
    this.name = name
    this.id = ++customerId
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return this.id === delivery.customerId
    })
  }
  meals() {
    return this.deliveries().map(delivery => { return delivery.meal()})
  }
  totalSpent() {return this.meals().reduce(function(total,meal){ return total + meal.price }, 0)}
}



mealId = 0

class Meal {
  constructor(title, price) {
  this.title = title
  this.price = price
  this.id = ++mealId
  store.meals.push(this)
  }
  deliveries() {
    let deliveryArray = store.deliveries.filter(delivery => {
      return this.id === delivery.mealId
    })
    return [...new Set(deliveryArray)]
  }
  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }
}

Meal.byPrice = function(){return store.meals.sort(function(a,b){return b.price-a.price})}

deliveryId = 0

class Delivery {
  constructor(mealId,neighborhoodId,customerId){
    this.mealId = mealId
    this.customerId = customerId
    this.neighborhoodId = neighborhoodId
    this.id = ++deliveryId
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
