// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let nIndex = 0
let cIndex = 0
let mIndex = 0
let dIndex = 0



class Neighborhood {

  constructor(name){
    this.name = name
    this.id = ++nIndex
    store.neighborhoods.push(this)
  }


  deliveries() {
    let repetative = store.deliveries.map(function(deli) {
      if (deli.neighborhoodId === this.id) {
        return deli
      }}.bind(this))

    return repetative
  }

  customers() {
    let customers = store.customers.map(function(cust) {
      if (cust.neighborhoodId === this.id) {
        return cust
      }}.bind(this))

    return customers
  }

  meals() {

    let deliveries = this.deliveries()

    let meals = deliveries.map(function(deli){
      if(deli.neighborhoodId === this.id){
        return store.meals.find(function(meal){return meal.id === deli.mealId})
      }
    }.bind(this))

    let distictMeals = [...new Set(meals.map(meal => meal.id))]

    return distictMeals

  }

}

class Customer {

  constructor(name, neighborhoodId) {
    this.name = name
    this.id = ++cIndex
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }

  deliveries() {
    let deliveries = store.deliveries.map(function(deli) {
      if (deli.customerId === this.id) {
        return deli
      }}.bind(this))

    return deliveries.filter(Boolean)

  }


  meals() {

    let meals = this.deliveries().map(function(delivery){
      if (delivery.customerId === this.id) {
        return store.meals.find(function(meal){return meal.id === delivery.mealId})
      }
    }.bind(this))
    return meals.filter(Boolean)
  }

  totalSpent() {
    let spent = 0
    this.meals().map(function(meal){
      spent = spent + meal.price
    })
    return spent
  }


}



class Meal {

  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mIndex
    store.meals.push(this)
  }

  deliveries(){
    let deliveries = store.deliveries.filter(function(deli){
      return deli.mealId === this.id
    }.bind(this))
    return deliveries
  }


  customers(){
    let customers = this.deliveries().map(function(deli){
      return store.customers.find(function(cust){
        return deli.customerId === cust.id})
    })



    return customers.filter(Boolean)

  }

  static byPrice(){

    function compare(a, b) {
      let priceA = a.price
      let priceB = b.price


      let comparison = 0;
      if (priceA > priceB) {
        comparison = -1;
      } else if (priceA < priceB) {
        comparison = 1;
      }

      return comparison;
    }

  return store.meals.sort(compare)

  }



}

class Delivery {

  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++dIndex;
    store.deliveries.push(this)
  }

  meal() {
    let meal = store.meals.find(function(meal) {return meal.id === this.mealId}.bind(this))
    return meal
  }

  customer() {
    let customer = store.customers.find(function(customer) {return customer.id === this.customerId}.bind(this))
    return customer
  }

  neighborhood() {
    let neighborhood = store.neighborhoods.find(function(neighborhood) {return neighborhood.id === this.neighborhoodId}.bind(this))
    return neighborhood
  }




}
