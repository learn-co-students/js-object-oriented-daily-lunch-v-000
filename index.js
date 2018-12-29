// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0

class Neighborhood{
  constructor(name){
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }

  deliveries(){
    return store.deliveries.filter(
      function(d){
        return d.neighborhoodId === this.id
      }.bind(this))
  }

  customers(){
    return store.customers.filter(
      function(d){
        return d.neighborhoodId === this.id
      }.bind(this))
  }

  allMeals(){
   return this.deliveries().map(function(d){
      return d.meal()
    }.bind(this))
  }

  meals(){
    let meals = []
   for(let m of this.allMeals()){
     if(!meals.includes(m)){

       meals.push(m)
     }
   }

   return meals
  }



}

class Customer{
  constructor(name, neighborhoodId){
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId
    store.customers.push(this)
  }

  deliveries(){
   return store.deliveries.filter(
      function(d){
       return d.customerId === this.id
      }.bind(this))
  }

  meals(){
    return this.deliveries().map(function(d){
      return d.meal()
    }.bind(this))
  }

  totalSpent(){
    let total = 0
    for(let m of this.meals()){
      total += m.price

    }
    return total
  }

}

class Meal{
  constructor(title, price){
  this.title = title
  this.price = price
  this.id = ++mealId
  store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(function(d){
      return d.mealId === this.id
    }.bind(this))
  }

  customers(){
    return this.deliveries().map( function(d){
      return d.customer()
    }.bind(this))
  }

  static byPrice(){
    debugger;
    return store.meals.slice(0).sort(function(a,b)
    {return b.price - a.price})
 }
}

class Delivery{
  constructor(meal, neighborhood, customer){
    this.customerId = customer
    this.mealId = meal
    this.neighborhoodId = neighborhood
    this.id = ++deliveryId
    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find(
      function(m){
        return m.id === this.mealId
      }.bind(this))
  }

  customer(){
    return store.customers.find(
      function(c){
        return c.id === this.customerId
      }.bind(this))
  }

  neighborhood(){
    return store.neighborhoods.find(
      function(n){
        return n.id === this.neighborhoodId
      }.bind(this))
  }

}
