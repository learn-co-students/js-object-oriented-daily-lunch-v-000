let store = {customers:[], meals:[], deliveries:[], employers:[]}

let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

class Customer {

  constructor(name, employer){
    if (name) {this.name = name};
    if (employer) {this.employerId = employer.id};
    this.id = ++customerId;
    store.customers.push(this)
  }

  meals(){
    return this.deliveries().map(delivery => delivery.meal())
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId == this.id)
  }

  totalSpent(){
    return this.meals().reduce(function(total, meal){return total + meal.price}, 0);
  }

}

class Meal {
  constructor(title, price){
    if (title) {this.title = title};
    if (price) {this.price = price};
    this.id = ++mealId
    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  }

  customers(){
    return this.deliveries().map(delivery => delivery.customer())
  }

  static byPrice(){
    return store.meals.sort(function(meal1, meal2){ return meal1.price < meal2.price})
  }

}

class Delivery {
  constructor(meal, customer){
    if (meal){this.mealId = meal.id};
    if (customer){this.customerId = customer.id};
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find(meal=> meal.id===this.mealId)
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId)
  }
}

class Employer {
  constructor(name){
    this.name = name;
    this.id = ++employerId;
    store.employers.push(this);
  }

  employees(){
    return store.customers.filter(customer => customer.employerId === this.id)
  }

  deliveries(){
    let deliveries = []
    this.employees().forEach(function(employee){
      employee.deliveries().forEach(delivery => deliveries.push(delivery))
    });
    return deliveries;
  }

  meals(){
    let allMeals = this.employees().map(employee => employee.meals()[0]);
    let meals = [];
    allMeals.forEach(function(meal){
      if (!meals.includes(meal)){
        meals.push(meal);
      }
    })
    return meals;
  }

  mealTotals(){
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    let mealTotals = {};
    allMeals.forEach(function(meal){
      mealTotals[meal.id] = 0;
    });
    allMeals.forEach(function(meal){
      mealTotals[meal.id] += 1;
    });
    return mealTotals;
  }
}