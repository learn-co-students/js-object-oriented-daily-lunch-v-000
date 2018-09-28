// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
function addMeToStore(){
    this.id = store[this.constructor.name.toLowerCase() + "s"].push(this) - 1
}

class Neighborhood{
  constructor(name){
    this.name = name
    addMeToStore.call(this)
  }
  deliveries(){
    return store.deliveries.filter( (delivery) => { return delivery.neighborhoodId === this.id })
  }
  customers(){
      return store.customers.filter( (customer) => { return customer.neighborhoodId === this.id })
  }
  meals(){
    let uniqueList = []
    this.deliveries().map( (delivery) => {if(!uniqueList.includes(delivery.meal())){ uniqueList.push(delivery.meal()); return delivery.meal() }  })
   return uniqueList
 }
}
class Customer{
  constructor(name, neighborhood){
    this.name = name
    this.neighborhoodId = neighborhood.id || 0
    this.mealId = 0;
    addMeToStore.call(this)
  }
  deliveries(){
    return store.deliveries.filter( (delivery) => { return delivery.customerId === this.id })
  }
  meals(){
    return this.deliveries().map( (myDelivery) => { return myDelivery.meal() })
  }
  totalSpent(){
    return this.meals().reduce( (accumulator, currentValue) => { return currentValue.price + accumulator; },0 )
  }
  
}

class Meal{
  constructor(title, price){
    this.title = title
    this.price = price
    addMeToStore.call(this)
  }

 deliveries(){
    return store.deliveries.filter( (delivery) => { return delivery.mealId === this.id })
  }
  customers(){
    return store.customers.filter( (customer) => { return customer.mealId == this.id } )
  }
  static byPrice(){
    return store.meals.sort((a,b) => { return b.price - a.price }) 
    }

}
class Delivery{
  constructor(meal, neighborhood, customer){
    this.mealId = (meal) ? meal : 0
    this.customerId = (customer) ? customer : 0
    this.neighborhoodId = (neighborhood) ? neighborhood : 0
    this.id = store["deliveries"].push(this) - 1
  }
  meal(){
    return store.meals.find( (meal) => { return meal.id === this.mealId})
  }
  customer(){
    return store.customers.find( (customer) => { return customer.id === this.customerId})
  }
  neighborhood(){
    return store.neighborhoods.find( (neighborhood) => { return neighborhood.id === this.neighborhoodId})
  }
}
