// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodIds = 0

class Neighborhood {
  constructor(name){
    this.id = ++neighborhoodIds;
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
    const allMeals = this.customers().map(customer => customer.meals())
    return Array.from(new Set(allMeals))
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
    return store.meals.sort((a, b) => b.price - a.price;)
  }

}

let deliveryIds = 0

class Delivery {
  constructor(mealId, customerId, neighborhoodId){
    this.id = ++deliveryIds
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
