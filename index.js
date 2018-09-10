// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let mealId = 0
let deliveryId = 0
let neighborhoodId = 0
let customerId = 0

const unique = (value, index, self) => {
    return self.indexOf(value) === index;
}
class Neighborhood {
  constructor(name){
    this.name = name
    this.id = neighborhoodId++
    store.neighborhoods.push(this)
  }


  deliveries() {
    return store.deliveries.filter(function(x){return x.neighborhoodId === this.id}.bind(this))
  }

  customers() {
    return store.customers.filter(function(x){return x.neighborhoodId === this.id}.bind(this))
  }

  meals() {
    return this.deliveries().map(function(x){return x.meal()}).filter(unique)
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = customerId++
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(function(x){return x.customerId === this.id}.bind(this))
  }

  meals() {
    return this.deliveries().map(function(x){return x.meal()})
  }

  totalSpent() {
    let agg = 0
    for (const meal of this.meals()) {
      agg = agg + meal.price
    }
    return agg
  }
}


class Meal {
  constructor(title,price) {
    this.title = title
    this.price = price
    this.id = mealId++
    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(function(x){return x.mealId === this.id}.bind(this))
  }
  customers() {
    return this.deliveries().map(function(x){return x.customer()})
  }

  static byPrice() {

    return store.meals.sort(function(a,b){return b.price - a.price})
  }
}


class Delivery {
  constructor(mealId,neighborhoodId,customerId){
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = deliveryId++
    store.deliveries.push(this)
  }


  meal() {
    return store.meals.find(function(x){return x.id === this.mealId}.bind(this))
  }

  customer() {
    return store.customers.find(function(x){return x.id === this.customerId}.bind(this))
  }

  neighborhood() {
    return store.neighborhoods.find(function(x){return x.id === this.neighborhoodId}.bind(this))
  }


}
