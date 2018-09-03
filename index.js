// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let mealId = 0
let deliveryId = 0
let customerId = 0
let neighborhoodId = 0

class Neighborhood {
  constructor(name){
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this);
  }

  customers(){
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id );
  }

  meals(){
    const allMeals = this.deliveries().map(delivery => delivery.meal())
    return Array.from(new Set(allMeals))
  }

}

class Customer {
  constructor(name, neighborhood){
    this.id = ++customerId
    this.name = name
    this.neighborhoodId = neighborhood.id
    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }

  meals(){
    return this.deliveries().map(delivery => delivery.meal())
  }

  totalSpent(){
    return this.meals().reduce(function(agg, el, i, arr){
      return agg += el.price
    }, 0)

  }
}

class Meal {
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers(){
    const allCustomers = this.deliveries().map(delivery => delivery.customer())
    return Array.from(new Set(allCustomers));
  }

  static byPrice(){
    return store.meals.sort((a, b) => b.price - a.price;)
  }

}

class Delivery {
  constructor(mealId, customerId, neighborhoodId){
    this.id = ++deliveryId
    this.mealId = mealId
    this.customerId = customerId
    this.neighborhoodId = neighborhoodId
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
