// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = mealId = customerId = deliveryId = 0;

class Neighborhood {
  constructor (name){
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this);
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    })
  }
  customers(){
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id;
    })
  }
  meals(){
    const duplMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    })
    return [...new Set(duplMeals)];
  }
}
class Customer{
  constructor(name, neighborhoodId){
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter( delivery => {
      return delivery.customerId === this.id;
    })
  }
  meals(){
    return this.deliveries().map( delivery => {
      return delivery.meal();
    })
  }
  totalSpent(){
    return this.meals().reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price;
    }, 0)
  }
}
class Meal{
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }
  static byPrice(){
    return store.meals.sort(function(mealA, mealB){
      return mealB.price - mealA.price;
    })
  }
  deliveries(){
    return store.deliveries.filter( delivery => {
      return delivery.mealId === this.id;
    })
  }
  customers(){
    return this.deliveries().map( delivery => {
      return delivery.customer();
    })
  }
}
class Delivery{
  constructor(mealId, neighborhoodId, customerId){
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }
  meal(){
    return store.meals.find( meal => {
      return meal.id === this.mealId;
    })
  }
  customer(){
    return store.customers.find( customer => {
      return customer.id === this.customerId;
    })
  }
  neighborhood(){
    return store.neighborhoods.find( neighborhood => {
      return neighborhood.id === this.neighborhoodId;
    })
  }
}
