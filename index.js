// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
class Neighborhood{
  constructor(name){
  this.name = name
  this.id = ++neighborhoodId
  store.neighborhoods.push(this);
  }
  deliveries () {
		return store.deliveries.filter(delivery => {return delivery.neighborhoodId === this.id});
	}
  customers () {
    return store.customers.filter(customer => {return customer.neighborhoodId === this.id});
  }
  meals(){
    const meals = this.deliveries().map(delivery => {return delivery.meal()})
    let uniqueMeals = [...new Set(meals)]
    return uniqueMeals
  }
}

let customerId = 0
class Customer{
  constructor(name, neighborhood){
  this.name = name
  this.id = ++customerId
  if(neighborhood){
    this.neighborhoodId = neighborhood};
    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {return this.id === delivery.customerId});
  }
  meals(){
     return this.deliveries().map(delivery => {return delivery.meal()})
    }
    totalSpent(){
      return this.meals().reduce(function(sum, meal){
        return sum + meal.price
      }, 0)
    }
  }



let mealId = 0
class Meal{
  constructor(title, price){
  this.title = title
  this.price = price
  this.id = ++mealId
  store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => {return this.id === delivery.mealId});
  }

  customers(){
     return this.deliveries().map(delivery => {return delivery.customer()})
    }

  static byPrice(){
    const sortedMeals = store.meals.slice().sort(function(mealA, mealB){return mealB.price - mealA.price})
    return sortedMeals
  }
}


let deliveryId = 0
class Delivery{
  constructor(meal, neighborhood, customer){
  this.id = ++deliveryId
  if(meal){
    this.mealId = meal};
    if(neighborhood){
      this.neighborhoodId = neighborhood};
      if(customer){
        this.customerId = customer};
        store.deliveries.push(this)
  }

  meal() {
    return store.meals.find((meal) => {return this.mealId === meal.id});
  }
  customer() {
    return store.customers.find((customer) => {return this.customerId === customer.id});
  }
  neighborhood() {
    return store.neighborhoods.find((neighborhood) => {return this.neighborhoodId === neighborhood.id});
  }
}
