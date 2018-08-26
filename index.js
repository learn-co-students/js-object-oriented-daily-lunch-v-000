// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodID = 0
let customerID = 0
let mealID = 0
let deliveryID = 0


class Neighborhood {
  constructor (name) {
    this.name = name
    this.id = neighborhoodID++
    store.neighborhoods.push(this);
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodID === this.id)
  }
  customers() {
    return store.customers.filter(customer => customer.neighborhoodID === this.id)
  }
  meals() {
    return store.meals.filter(meal => meals.neighborhoodID ===this.id)
  }
}

class Customer {
  constructor(name){
    this.name = name
    this.id = customerID++
    store.customers.push(this);
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerID === this.id)
  }
  meals() {
    return this.deliveries().map(delivery => delivery.meal())
  }
  totalSpend() {
    return this.meals().map(price).reduce(sum);
  }
}

class Meal {
  constructor(title,price) {
    this.title = title
    this.price = price
    this.id = mealID++
    store.meals.push(this);
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealID === this.id)
  }
  customers(){
    return this.deliveries().map(delivery => delivery.customer())
  }
  static byPrice() {
    return store.meals.sort(function (a, b){
      return b.price > a.price
    });
  }
  
}


class Delivery {
  constructor(mealID, neighborhoodID,customerID) {
    this.mealID = mealID
    this.neighborhoodID = neighborhoodID 
    this.customerID = customerID 
    this.id = deliveryID++
    store.deliveries.push(this);
  }
  meal(){
    return store.meals.find(meal => mealID === this.mealID)
  }
  customer() {
    return store.customers.find(customer => customer.id === this.customerID)
  }
  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodID)
  }
}





// A meal has many customers
// A delivery belongs to a meal, belongs to a customer, and belongs to a neighborhood
// A customer has many deliveries
// A customer has many meals through deliveries
// A customer belongs to a neighborhood
// A neighborhood has many deliveries
// A neighborhood has many customers through deliveries
// A neighborhood has many meals through deliveries