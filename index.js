// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighbId = 0
class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighbId

    store.neighborhoods.push(this)
  }

  deliveries(){
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id
      }.bind(this)
    )
  }

  customers(){
    return store.customers.filter(
      function(customer) {
        return customer.neighborhoodId === this.id
      }.bind(this)
    )
  }

  meals(){
    const all = allMeals(this)
    return all.filter(onlyUnique)
  }
}

let custId = 0
class Customer {
  constructor(name, neighborhoodId){
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++custId

    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.id
      }.bind(this)
    )
  }

  meals(){
    return allMeals(this)
  }

  totalSpent(){
    let total = 0
    this.meals().forEach(function(meal){
      total += meal.price
    })
    return total
  }
}

let mId = 0
class Meal {
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = ++mId

    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(
      function(delivery) {
        return delivery.mealId === this.id
      }.bind(this)
    )
  }

  customers(){
    let arrOfCustomers = []
    this.deliveries().forEach(function(delivery){
      arrOfCustomers.push(delivery.customer())
    })
    return arrOfCustomers
  }

  static byPrice(){
    return store.meals.sort(function(a, b){return b.price - a.price})
  }
}

let delivId = 0
class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++delivId

    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find(
      function(meal) {
        return meal.id === this.mealId
      }.bind(this)
    )
  }

  customer(){
    return store.customers.find(
      function(customer) {
        return customer.id === this.customerId
      }.bind(this)
    )
  }

  neighborhood(){
    return store.neighborhoods.find(
      function(neighborhood) {
        return neighborhood.id === this.neighborhoodId
      }.bind(this)
    )
  }
}

const allMeals = function(self){
  let arrOfMeals = []
  self.deliveries().forEach(function(delivery){
    arrOfMeals.push(delivery.meal())
  })
  return arrOfMeals
}

const onlyUnique = function(value, index, self){
  return self.indexOf(value) === index
}
