// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0

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
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    })
  }

  meals(){
    let m = [];
    let deliveries = this.deliveries();
    let d;
    deliveries.forEach(function(delivery){
      d = store.meals.find(function(meal){
        return meal.id === delivery.mealId
      })
      m.push(d);
    })
    let unique = [...new Set(m)];
    return unique
  }
}


let customerId = 0

class Customer {
  constructor(name, neighborhood) {

    this.id = ++customerId
    this.name = name;
    this.neighborhoodId = neighborhood

    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  meals(){
    let m = [];
    let deliveries = this.deliveries();
    let d;

    deliveries.forEach(function(delivery){
      d = store.meals.find(function(meal){
        return meal.id === delivery.mealId
      })
      m.push(d);
    })
    return m;
  }

  totalSpent(){
    let total = 0
    let meals = this.meals()
    meals.forEach(function(meal){
      return total += meal.price
    })
    return total
  }
}

let mealId = 0

class Meal {
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price

    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }

  customers(){
    let c = [];
    let deliveries = this.deliveries();
    let d;

    deliveries.forEach(function(delivery){
      d = store.customers.find(function(customer){
        return customer.id === delivery.customerId
      })
      c.push(d);
    })
    return c;
  }

  static byPrice(){
    return store.meals.sort(function(a,b){ return b.price - a.price })
  }
}

let deliveryId = 0

class Delivery {
  constructor(meal, neighborhood, customer){
    this.id = ++deliveryId
    this.mealId = meal
    this.neighborhoodId = neighborhood
    this.customerId = customer

    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(function(meal){
      return meal.id
    })
  }

  customer(){
    return store.customers.find(function(customer){
      return customer.id
    })
  }

  neighborhood(){
    return store.neighborhoods.find(function(neighborhood){
      return neighborhood.id
    })
  }
}
