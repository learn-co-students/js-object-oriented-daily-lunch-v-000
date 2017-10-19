let store = {deliveries: [], employers: [], drivers: [], meals: [], customers: []};
let deliveryId = 0;
let mealId = 0;
let employerId = 0;
let customerId = 0;


class Delivery{
  constructor(meal = {}, customer = {}){
    this.id = ++deliveryId;
    this.mealId = meal.id;
    this.customerId = customer.id;
    store.deliveries.push(this);
  }
  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
  }
  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
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
    return store.meals.sort((a,b)=>a.price < b.price);
  }
  deliveries(){
    return store.deliveries.filter(delivery=> delivery.meal.id = this.id);
  }
  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    });
  }
}

class Employer{
  constructor(name){
    this.id = ++employerId;
    this.name = name;
    store.employers.push(this);
 }
 mealTotals() {
   let allMeals = this.deliveries().map(delivery => {
     return delivery.meal();
   });
   let summaryObject = {};
   allMeals.forEach(function(meal) {
    summaryObject[meal.id] = 0;
  });
  allMeals.forEach(function(meal) {
    summaryObject[meal.id] += 1;
    });
  return summaryObject;
 }
 employees() {
  return store.customers.filter(customer => {
    return customer.employerId == this.id;
  });
 }
 deliveries() {
   let allDeliveries = this.employees().map(employee => {
    return employee.deliveries();
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
}

class Customer {
  constructor(name, employer = {} ){
    this.name = name;
    this.employerId = employer.id;
    this.id = ++customerId
    store.customers.push(this)
  }

  totalSpent(){
    return this.meals().reduce(function(sum, meal) {
      return sum + meal.price
    }, 0)
  }

  deliveries(){
    return store.deliveries.filter((delivery)=> {
      return delivery.customerId == this.id
    })
  }
  meals(){
    return this.deliveries().map((delivery)=> {
      return delivery.meal()
    })
  }
}