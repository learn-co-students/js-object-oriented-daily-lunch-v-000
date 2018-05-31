// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0


//has many deliveries, customers, meals
//
class Neighborhood{
    constructor(name){
      this.id = ++ neighborhoodId
      this.name = name
      store.neighborhoods.push(this)
    }

//deliveries() - returns a list of all deliveries placed in a neighborhood
    deliveries(){
      return store.deliveries.filter(delivery => {
        return delivery.neighborhoodId === this.id
      })
    }
//customers() - returns all of the customers that live in a particular neighborhood
    customers(){
      return store.customers.filter(customer =>{
      //  debugger
          return customer.neighborhoodId == this.id
      })
    }
//meals() - returns a unique list of meals that have been ordered in a particular neighborhood (you might want to do this one last)
    meals(){
      let q = this.deliveries().map(delivery => {
        //debugger
        return delivery.meal()
      })
      return Array.from(new Set(q))
    }
}

//has many deliveries, meals
//belongs to a neigborhood
class Customer{
    constructor(name, neighborhoodId){
      this.id = ++ customerId
      this.name = name
      this.neighborhoodId = neighborhoodId

      store.customers.push(this)
    }
//deliveries() — returns all of the deliveries that customer has received
    deliveries(){
      return store.deliveries.filter(delivery =>{
        return delivery.customerId === this.id
      })
    }
//meals() - returns all meals that a customer has ordered
    meals(){
      return this.deliveries().map(delivery =>{
        return delivery.meal()
      })
    }
//totalSpent() - returns the total amount that the customer has spent on food.

//reduce takes in 2 arguments, 1 a callback function, 2 where the aggregate si supposed to start at
//the callback function takes in 4 possible arguments, 1 the aggregate sum, 2 the element of the array being iterated over, 3 the index in the array, and 4 the array as a whole
    totalSpent(){
        return this.meals().reduce(function(aggSum, elementMeal){
          return aggSum + elementMeal.price
        }, 0);
    }
}

//has many customers
class Meal{
    constructor(title, price){
      this.id = ++mealId
      this.title = title
      this.price = price
      store.meals.push(this)
    }
//deliveries() - returns all of the deliveries associated with a particular meal.
    deliveries(){
      return store.deliveries.filter(delivery=>{
        return delivery.mealId === this.id
      })
    }
//customers() - returns all of the customers who have had the meal delivered. Be careful not to return the same customer twice if they have ordered this meal multiple times.
    customers(){
      return this.deliveries().map(delivery => {
        return delivery.customer()
      })
    }
//byPrice() - A class method that orders all meal instances by their price in descending order. Use the static keyword to write a class method.
//static sets up byPrice to be a class method, not an instance method
    static byPrice(){
      return store.meals.sort(function(meal1, meal2){
        return meal1.price < meal2.price
      })
    }
}

//belongs to a meal, customer, and neighborhood
class Delivery{
  constructor(mealId, neighborhoodId, customerId){
      this.id = ++ deliveryId
      this.mealId = mealId
      this.neighborhoodId = neighborhoodId
      this.customerId = customerId
      store.deliveries.push(this)
  }
//meal() - returns the meal associated with a particular delivery
    meal(){
      return store.meals.find(meal => {
        return meal.id === this.mealId
      })
    }
//customer() - returns the customer associated with a particular delivery
    customer(){
      return store.customers.find(customer =>{
        return customer.id === this.customerId
      })
    }
//neighborhood() - returns the neighborhood associated with a particular delivery
    neighborhood(){
      return store.neighborhoods.find(neighborhood =>{
        return neighborhood.id === this.neighborhoodId
      })
    }
}
