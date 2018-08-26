let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0



class Neighborhood {
  constructor(name){
    this.name = name
    this.id = neighborhoodId++
    store.neighborhoods.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
  }
  customers(){
    return store.customers.filter(customer => customer.neighborhoodId === this.id)
  }
  
  

  meals(){
    let meals = this.deliveries().map(delivery => delivery.meal())
    return [...new Set(meals) ];
  }
}




class Customer {
  constructor(name, neighborhoodId){
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = customerId++
    store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }
  meals(){
    return this.deliveries().map(delivery => delivery.meal())
  }
  

  totalSpent(){
    return this.meals().reduce((total, meal) => total + meal.price,0)
  }
}


class Meal {
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = mealId++
    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
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
  constructor(mealId, neighborhoodId, customerId){
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.mealId = mealId;
    this.id = deliveryId++;
    store.deliveries.push(this);
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


// A meal has many customers
// A delivery belongs to a meal, belongs to a customer, and belongs to a neighborhood
// A customer has many deliveries
// A customer has many meals through deliveries
// A customer belongs to a neighborhood
// A neighborhood has many deliveries
// A neighborhood has many customers through deliveries
// A neighborhood has many meals through deliveries