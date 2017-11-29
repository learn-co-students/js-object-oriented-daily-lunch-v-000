// delivery: belong to meal, belong to customer, mealId, customerId
// customer: belong to employer, employerId


let store = {deliveries: [], meals: [], employers: [], customers: []}
let deliveryId = 0
let mealId = 0
let customerId = 0
let employerId = 0

class Delivery {
  constructor(meal={}, customer={}){
    this.id = ++deliveryId
    this.mealId = meal.id;
    this.customerId = customer.id;
    store.deliveries.push(this);
  }
  customer(){
    return store.customers.find(customer=>{
      return customer.id === this.customerId;
    })
  }
  meal(){
    return store.meals.find(meal=>{
      return meal.id === this.mealId;
    })
  }
}

class Meal {
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }
  deliveries(){
    return store.deliveries.filter(delivery=>{
      return delivery.mealId === this.id;
      //returns array of deliveries that include meal
    });
  }
  customers(){
    return this.deliveries().map(delivery=>{
      return delivery.customer();
      //iterates over deliveries and returns array of customers
    });
  }
  static byPrice(){
    return store.meals.sort((meal1, meal2)=>{
      return meal1.price < meal2.price;
    });
  }
}

class Customer {
  constructor(name, employer={}){
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer.id;
    store.customers.push(this);
  }
  deliveries(){
    return store.deliveries.filter(delivery=>{
      return delivery.customerId === this.id;
    });
  }
  meals(){
    //customer has meals through delivery
    return this.deliveries().map(delivery=>{
      return delivery.meal();
    })
  }
  totalSpent() {
    return this.meals().reduce(function(sum, meal) {
      return sum + meal.price;
    }, 0);
  }
}

class Employer {
  constructor(name){
    this.id = ++employerId;
    this.name = name;
    store.employers.push(this);
  }

  employees(){
    return store.customers.filter(customer=>{
      return customer.employerId === this.id;
      //returns array of employer's customers (aka employees)
    });
  }
  deliveries(){
    let allDeliveries = this.employees().map(employee=>{
      return employee.deliveries();
      //iterates over employees and returns array of employees' deliveries
    });
    let merged = [].concat.apply([], allDeliveries);
    return merged;
  }

  meals() {
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    let uniqueMeals = [...new Set(allMeals)];
    return uniqueMeals;
  }

  mealTotals() {
    let allMeals = this.deliveries().map(delivery=>{
      return delivery.meal();
    });
    let object = {};
    allMeals.forEach(function(meal) {
      object[meal.id] = 0;
    });
    allMeals.forEach(function(meal) {
      object[meal.id] += 1;
    });
    return object;
  }
}
// mealTotals() - returns a JavaScript object displaying each respective meal id
// ordered by the employer's employees. The keys of the JavaScript object are the meal ids and
// associated with each meal id is a value. For example, employerOne.mealTotals() returning an object of
// {1: 4, 2: 3} would mean that the meal with id of 1 was ordered by employerOne's employees four times,
// and the meal with id of 2 was ordered by employerOne's employees three times.
