 let store = {deliveries: [], meals: [], employers: [], customers: []};

let deliveryID = 0;
let mealID = 0;
let employerID = 0;
let customerID = 0;

class Delivery {
  constructor(meal, customer){
    this.id = deliveryID++;
    store.deliveries.push(this);
    if (meal){ this.mealId = meal.id };
    if (customer){
      this.customerId = customer.id;
    };
  }//constructor
  customer(){
    return store.customers.find(customer => {
      return customer.id == this.customerId;
    });
  }
  meal(){
    return store.meals.find(meal => {
      return meal.id == this.mealId;
    });
  }

}//class delivery

class Meal{
  constructor(title,price){
    this.title = title;
    this.id = mealID++;
    this.price = price;
    store.meals.push(this);
  }//constructor
  static byPrice(){
    return store.meals.sort(function(mealA, mealB) {
      let s = 0;
      if (mealA.price > mealB.price) {
        s = -1;
      }
      else if (mealA.price < mealB.price) {
        s = 1;
      }
      return s;
    });//sort
  }//byPrice

  deliveries(){
    return store.deliveries.filter(delivery=>{
      return this.id == delivery.mealId;
    });
  }//deliveries

  customers(){
    return this.deliveries().map(delivery=>{
      return delivery.customer();
    });
  }//customers

}///class meal

class Employer{
  constructor(name){
    this.name = name;
    this.id = employerID++;
    store.employers.push(this);
  }
  employees(){
    return store.customers.filter(customer => {
      return customer.employerId == this.id;
    })
  }
  deliveries(){
    let delivs = this.employees().map(employee=>{
      return employee.deliveries();
    })
    return delivs.concat.apply([],delivs);
  }
  meals(){
    let meals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    return [...new Set(meals)];
  }
  mealTotals(){
    let meals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    let totals = {};
    meals.forEach(function(meal){
      totals[meal.id]=0;
    });//
    meals.forEach(function(meal){
      totals[meal.id]+=1;
    });//
    return totals;
  }
}

class Customer{
  constructor(name,employer){
    this.name = name;
    this.id = customerID++;
    if (employer){this.employerId = employer.id}
    store.customers.push(this);
  }
  deliveries(){
    return store.deliveries.filter(delivery=>{
      return this.id == delivery.customerId;
    });
  }//deliveries
  meals(){
    let meals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    return [...new Set(meals)];
  }
  totalSpent(){
     return this.meals().reduce(function(total,meal) {
       return total + meal.price;
     }, 0)
     return total;
  }//totalSpent
}//class customer

function employerStats(){

  }
