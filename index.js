// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };


// Meal has many customers
// Delivery belongs to a Meal, belongs to a Customer, Belongs to a Neighborhood
// Customer has many deliveries
// Customer has many meals, through deliveries
// Neighborhood has many deliveries
// Neighborhood has many customers through deliveries
// Neighborhood has many meals through deliveries

let neighborhoodId = 0;
let customerId = 0;
let deliveryId = 0;
let mealId = 0;



class Neighborhood {
  constructor(name){
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    })
  }

  customers(){
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    })
  }

  meals(){
    let allMeals = this.deliveries().map(delivery =>{
      return delivery.meal();
    })
    return [...new Set(allMeals)]
  }
}


class Customer {
  constructor(name, neighborhoodId){
    this.name = name;
    this.id = ++customerId;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }

  setNeighborhood(neighborhood){
    this.neighborhoodId = neighborhood.id
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId == this.id;
    })
  }

  meals(){
    return this.deliveries().map(delivery =>{
      return delivery.meal()
    })
  }

 totalSpent(){
   let totalPrice = 0;
   this.meals().forEach(function (meal){
     totalPrice += meal.price;
   });
   return totalPrice;
 }
}



class Meal {
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery =>{
      return delivery.mealId === this.id;
    })
  }

  customers(){
      return this.deliveries().map(delivery =>{
        return delivery.customer();
      })
  }

  static byPrice(){
     return store.meals.sort(function(mealone, mealtwo){
      return mealone['price'] < mealtwo['price']
    });
  }

}


class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.id = ++deliveryId;
    this.customerId = customerId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    store.deliveries.push(this);
  }

  setMeal(meal){
    this.mealId = meal.id;
  }

  setNeighborhood(neighborhood){
    this.neighborhoodId = neighborhood.id;
  }

  setCustomer(customer){
    this.customerId = customer.id;
  }

  meal(){
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    })
  }

  customer(){
    return store.customers.find(customer =>{
      return customer.id === this.customerId;
    })
  }

  neighborhood(){
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId;
    })
  }

}

