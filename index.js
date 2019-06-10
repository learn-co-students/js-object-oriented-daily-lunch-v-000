// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let customerId = 0
let mealId = 0
let neighborhoodId = 0
let deliveryId = 0 

class Meal {
    constructor(title, price){
        this.id = ++mealId
        this.title = title
        this.price = price
        store.meals.push(this)
    }

//     deliveries() - returns all of the deliveries 
//     associated with a particular meal.
  deliveries(){
    return store.deliveries.filter(delivery =>{
      return delivery.mealId === this.id
    })}
// customers() - returns all of the customers who have had the meal delivered.
//  Be careful not to return the same customer twice if they have ordered this meal multiple times.
// byPrice() - A class method that orders all meal instances by their price in descending order. 
// Use the static keyword to write a class method.
}

class Neighborhood{
  constructor(name){
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this)
  }
 deliveries(){
    return store.deliveries.filter(delivery =>{
      return delivery.neighborhoodId === this.id
    })
  }
  customers(){
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    })
  }
}

class Customer{
  constructor(name, neighborhood){
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhood;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
        return delivery.customerId === this.id;
      })
  }

  meals() {
     return this.deliveries().map(delivery => {
          return delivery.mealId
      })
  }


}

class Delivery {
    constructor(meal, neighborhood, customer){
        this.id = ++deliveryId
        this.mealId = meal
        this.neighborhoodId = neighborhood
        this.customerId = customer
        store.deliveries.push(this)
    }
    meal(){
        return store.meals.find(
          function(meal){
            return meal.id === this.mealId
          }.bind(this)
        )
      }
      customer(){
        return store.customers.find(
          function(customer){
            return customer.id === this.customerId
          }.bind(this)
        )
      }
      neighborhood(){
        return store.neighborhoods.find(
          function(neighborhood){
            return neighborhood.id === this.neighborhoodId;
          }.bind(this)
        )
      }
}


