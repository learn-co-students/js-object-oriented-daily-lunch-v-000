// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let deliveryId = 0
let customerId = 0
let mealId = 0
let neighborhoodId = 0

class Delivery{
  constructor(mealId, neighborhoodId, customerId){
  this.id = ++deliveryId

  this.mealId = mealId
  this.neighborhoodId = neighborhoodId
  this.customerId = customerId
  store.deliveries.push(this)
  }
  customer(){
    return store.customers.find(customer => {
      return this.customerId === customer.id
    })
  }

  meal(){
    return store.meals.find(meal => {
      return this.mealId === meal.id
    })
  }

  neighborhood(){
    return store.neighborhoods.find(neighborhood => {
      return this.neighborhoodId === neighborhood.id
    })
  }

}


class Neighborhood{
  constructor(name){
    this.id = ++neighborhoodId
    this.name = name
    store.neighborhoods.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return this.id === delivery.neighborhoodId
    })
  }

customers(){
  return store.customers.filter( customer => {
    return this.id === customer.neighborhoodId
  })
}

meals(){
  // found this solution here:
  // https://www.youtube.com/watch?v=dvPybpgk5Y4&list=PLzglM4eAT6Oo9-D6a1re7WjvDqPwWK-_H
  let neighborhoodMeals =  this.deliveries().map(delivery => {
      return delivery.meal()
  })
 let uniqArray = [... new Set(neighborhoodMeals)]
 return uniqArray
}
//
}

class Meal{
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  static byPrice() {
      return store.meals.sort(function(a,b) {
      return b.price - a.price
    })
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return this.id === delivery.mealId
    })
  }

  customers(){
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }
}

class Customer{
  constructor(name, neighborhoodId){
    this.id = ++customerId
    this.name = name
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return this.id === delivery.customerId
    })
  }

    meals(){
      return this.deliveries().map(delivery => {
        return delivery.meal()
      })
    }

    totalSpent(){
    return  this.meals().reduce(function(total, meal) {
        return total + meal.price
      }, 0)
    }
}
