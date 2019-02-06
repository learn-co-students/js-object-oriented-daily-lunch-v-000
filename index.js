// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodCountId = 0
let customerCountId = 0
let mealCountId = 0
let deliveryCountId = 0
class Neighborhood{
  constructor(name){
    this.name = name
    this.id = neighborhoodCountId++
    store.neighborhoods.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
  }
  customers(){
    return store.customers.filter(customer => customer.neighborhoodId === this.id)
  }
  meals(){
    const allMeals = this.deliveries().map(delivery => delivery.meal() )
    return [... new Set (allMeals)]
  }
}
class Customer{
  constructor(name, neighborhoodId){
    this.name = name
    this.id = customerCountId++
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }
  meals(){
    return this.deliveries().map(delivery => delivery.meal())
  }
  totalSpent(){
    let total = 0
    this.meals().forEach(meal =>{
      total += meal.price
    })
    return total
  }
}
class Meal{
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = mealCountId++
    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }
  customers(){
    const allMeals = this.deliveries().map(delivery => delivery.customer())
    return [... new Set (allMeals)]
  }
  static byPrice(){
    return store.meals.sort((a,b) => a.price < b.price)
  }
}
class Delivery{
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = deliveryCountId++
    store.deliveries.push(this)
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
