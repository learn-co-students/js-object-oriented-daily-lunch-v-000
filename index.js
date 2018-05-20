// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
class Neighborhood{
  constructor(name){
    this.id = ++neighborhoodId
    this.name = name

    store.neighborhoods.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery =>{return delivery})
  }
  customers(){
    return store.customers.filter(customer =>{return customer})
  }
  meals(){
    return store.meals.filter(meal =>{return meal})
  }
}

let mealId = 0
class Meal{
  constructor(title,price){
    this.id = ++mealId
    this.title = title
    this.price = price

    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery =>{return delivery.mealId === this.id})
  }
  customers(){
    return store.customers.filter(customer =>{return customer})
  }
  static byPrice(){
    return store.meals.sort(function(a,b){return b["price"] - a["price"]})
  }
}

let customerId = 0
class Customer{
  constructor(name,neighborhoodId){
    this.id = ++customerId
    this.name = name
    store.customers.push(this)

    if (neighborhoodId){
      this.neighborhoodId = neighborhoodId
    }
  }
  deliveries(){
    return store.deliveries.filter(delivery =>{return delivery.customerId === this.id})
  }
  meals(){
    return store.meals.filter(meal =>{return meal})
  }
  totalSpent(){
    return this.meals().reduce(function(acc,val){return acc + val["price"]},600)
  }

}

let deliveryId = 0
class Delivery{
  constructor(mealId,neighborhoodId,customerId){
    this.id = ++deliveryId
    this.mealId = mealId
    this.customerId = customerId
    this.neighborhoodId = neighborhoodId

    store.deliveries.push(this)
  }
  meal(){
    return store.meals.find(meal =>{return meal.id === this.mealId})
  }
  customer(){
    return store.customers.find(customer =>{ return customer.id === this.customerId})
  }
  neighborhood(){
    return store.neighborhoods.find(neighborhood =>{ return neighborhood.id === this.neighborhoodId})
  }
}
