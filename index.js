// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

class Neighborhood {
  constructor(name){
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }

// returns a list of all deliveries placed in a neighborhood
  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
  }

// returns all of the customers that live in a particular neighborhood
  customers(){
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }

// returns a unique list of meals that have been ordered in a particular neighborhood - do last
  meals(){
    let meals = this.deliveries().map(delivery => delivery.meal());
    return meals.filter(function(meal, index, meals) {
      return meals.indexOf(meal) === index;
    });
  }
}

class Customer {
  constructor(name, neighborhoodId){
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerId;
    store.customers.push(this);
  }

//returns all the deliveries that customer has received
  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id);
  }

//returns all meals that a customer has ordered
  meals(){
    return this.deliveries().map(delivery => delivery.meal())
  }

//returns the total amount that the customer has spent on food.
  totalSpent(){
    return this.meals().reduce(function (accumulator, meal){
      return accumulator + meal.price;
    }, 0);
  }
}

class Meal {
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

//returns all the deliveries associated with a particular meal
  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  }

//returns all the customers who have had the meal delivered. Be careful not to return the same customer twice if they have ordered this meal multiple times.
  customers(){
    return this.deliveries().map(delivery => delivery.customer())
  }

//a class method that orders all meal instances by their price in descending order. Use the static keyword to write a class method.
  static byPrice() {
    return store.meals.sort(function (meal1, meal2){
      return meal2.price > meal1.price
    });
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  };

//returns the meal associated with a particular delivery
  meal(){
    return store.meals.find(meal => meal.id === this.mealId);
  }

//returns the customer associated with a particular delivery
  customer(){
    return store.customers.find(customer => customer.id === this.customerId);
  }

//returns the neighborhood associated with a particular delivery
  neighborhood(){
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
  }
}
