let store = {deliveries:[], meals:[], employers:[], customers:[]}
let deliveryId = 0;
let customerId = 0;
let mealId = 0;
let employerId = 0;

class Delivery {
  constructor(meal=0,customer=0){
    this.id = ++deliveryId;
    store.deliveries.push(this);
    this.mealId = meal.id;
    this.customerId = customer.id;
  }
  customer(){
    return store.customers.filter(customer => customer.id == this.customerId)[0];
  }
  meal(){
    return store.meals.filter(meal => meal.id == this.mealId)[0];
  }
}

class Meal {
  constructor(name, price){
    this.id = ++mealId;
    this.title = name;
    this.price = price;
    store.meals.push(this);
  }
  static byPrice(){
    return store.meals.sort((mealOne, mealTwo) => mealTwo.price - mealOne.price);
  }
  deliveries(){
    return  store.deliveries.filter(function(delivery){
      return delivery.mealId == this.id
    }.bind(this))
  }
  customers(){
    return this.deliveries().map(delivery => delivery.customer())
  }
}

class Employer {
  constructor(name){
    this.id = ++employerId;
    this.name = name;
    store.employers.push(this);
  }
  employees(){
    return store.customers.filter(function(customer){
      return customer.employerId == this.id
    }.bind(this))
  }
  deliveries(){
    return this.employees().map(employee=>employee.deliveries()).reduce((a,b)=>a.concat(b),[]);
  }
  meals(){
    let allMeals = this.deliveries().map(delivery=>delivery.meal());
    let uniqueMeals = [...new Set(allMeals)];
    return uniqueMeals;
  }
  mealTotals(){
    let allMeals = this.deliveries().map(delivery=>delivery.meal());
    let mealCounter = {};
    this.meals().map(meal => mealCounter[meal.id]=0);
    allMeals.map(meal => mealCounter[meal.id] += 1);
    return mealCounter;
  }
}

class Customer {
  constructor(name=0, employer=0){
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer.id;
    store.customers.push(this);
  }
  totalSpent(){
    return this.meals().map(meal => meal.price).reduce((total, current) => total+current);
  }
  deliveries(){
    return store.deliveries.filter(function(delivery) {
      return delivery.customerId == this.id
    }.bind(this))
  }
  meals(){
    return this.deliveries().map(delivery => delivery.meal())
  }
}
