let store = { customers: [], meals: [], deliveries: [], employers: [] }

let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0

class Customer {
  constructor(name, employer = {}) {  //how would I know to include an employer INSTANCE HERE except the lab instructions told me to?
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer.id;   //would I know to add this foreign key because of the association? customer belongs_to employer?
    store.customers.push(this);
  }

  deliveries(){     //JOIN table rel. has_many deliveries
      return store.deliveries.filter(delivery => {
        return delivery.customerId === this.id;
      });
  }

  meals(){    //has_many meals through: deliveries
    return this.deliveries().map(delivery => {
      return delivery.meal();
    });
  }

  totalSpent() {
    return this.meals().reduce(function(sum, meal) {
      return sum + meal.price;
    }, 0);
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  static byPrice() {
    return store.meals.sort((meal1, meal2) => {
      return meal1.price < meal2.price;
    });
  }

  deliveries(){                  //relationship with the JOIN table
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    });
  }

  customers(){            //has_many through relationship
    return this.deliveries().map(delivery => {
      return delivery.customer();
    });
  }
 }

class Delivery {
  constructor(meal = {}, customer = {}) {
    this.id = ++deliveryId;
    this.mealId = meal.id;
    this.customerId = customer.id;
    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
  }

  customer(){
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
  }
}

class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;
    store.employers.push(this);
  }

  employees(){
    return store.customers.filter(customer => {
      return customer.employerId === this.id;
    });
  }

  meals(){
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    let uniqMeals = [...new Set(allMeals)];
    return uniqMeals;
  }

  deliveries(){                  //relationship with the JOIN table, except JOIN table doesn't have reciprocal relationship with THIS class...
    let allDeliveries = this.employees().map(employee => {
      return employee.deliveries()
    });
    let combined = [].concat.apply([], allDeliveries);
    return combined;
  }

  mealTotals(){
    let meals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    let totals = {};
    meals.forEach(function(meal){
      totals[meal.id]=0;
    });
    meals.forEach(function(meal){
      totals[meal.id]+=1;
    });
    return totals;
  }
}                                   //come back and look at the tests and code here.  Lot of good info.
