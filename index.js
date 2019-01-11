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
    return store.deliveries.filter(
      function(delivery) {
         return delivery.neighborhoodId === this.id;
      }.bind(this)
    )
  }
  customers(){
    return store.customers.filter(
      function(customer) {
         return customer.neighborhoodId === this.id;
      }.bind(this)
    )
  }
  meals(){
    let m = []
    for (const x of this.deliveries()){
      if (!m.includes(x.meal())){
        m.push(x.meal())
      }
    }
    return m
  }
}

let customerId = 0
class Customer{
  constructor(name, neighborhoodId){
    this.id = ++customerId
    this.name = name
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter(
      function(delivery) {
         return delivery.customerId === this.id;
      }.bind(this)
    )
  }
  meals(){
    let m = []
    for (const x of this.deliveries()){
      m.push(x.meal())
    }
    return m
  }
  totalSpent(){
    let total = 0
    for (const x of this.meals()){
      total += x.price
    }
    return total
  }
}

let mealId = 0
class Meal{
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(
      function(delivery) {
         return delivery.mealId === this.id;
      }.bind(this)
    )
  }
  customers(){
    let cust = []
    for (const x of this.deliveries()){
      cust.push(x.customer())
    }
    return cust
  }
  static byPrice(){
    let a = [...store.meals]
    a.sort(function(a,b){
      return b.price - a.price
    })
    return a
  }
}

let deliveryId = 0
class Delivery{
  constructor(mealid, neighbid, custid){
    this.id = ++deliveryId
    this.mealId = mealid
    this.neighborhoodId = neighbid
    this.customerId = custid
    store.deliveries.push(this)
  }
  meal(){
    return store.meals.find(
      function(meal){
        return meal.id === this.mealId
      }.bind(this)
    )
  }
  customer(){
    return store.customers.find(
      function(customer){
        return customer.id === this.customerId
      }.bind(this)
    )
  }
  neighborhood(){
    return store.neighborhoods.find(
      function(neighborhood){
        return neighborhood.id === this.neighborhoodId
      }.bind(this)
    )
  }
}