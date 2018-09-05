// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodIds = 0
//
class Neighborhood {
  constructor(name){
    this.id = ++neighborhoodIds;
    this.name = name;
    store.neighborhoods.push(this);
  }
//
  customers(){
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }
//
  deliveries(){
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id );
  }

  meals(){
    const neighborhoodMeals = this.deliveries().sort(function(a, b){return a.mealId - b.mealId})

    return neighborhoodMeals.filter(function(el, i, arr){
        return i === arr.findIndex(function(j){
          return j.mealId === el.mealId
        })
    })
  }
}

let customerIds = 0

class Customer {
  constructor(name, neighborhoodId){
    this.id = ++customerIds
    this.name = name
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
    return this.meals().reduce(function(agg, el, i, arr){
      return agg += el.price
    }, 0)

  }
}

let mealIds = 0

class Meal {
  constructor(title, price){
    this.id = ++mealIds
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
    return store.meals.slice().sort(function(a,b){return b.price > a.price})
  }

}

let deliveryIds = 0

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.id = ++deliveryIds
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
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
