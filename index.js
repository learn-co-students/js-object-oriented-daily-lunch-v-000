// `Customer` class:
//
// + `new Customer()` — initialized with both name, and an instance of an `employer`; returns a JavaScript object that has attributes of `id`, `employerId`, and `name`
// + `meals()` - returns all of the meals that a customer has had delivered
// + `deliveries()` — returns all of the deliveries that customer has received
// + `totalSpent()` - returns the total amount that the customer has spent, as a function of the cost of the meals he has had delivered
let store = {meals: [], deliveries: [], customers: [], employers: []};
let mealId = 0;
let deliveryId = 0;
let customerId = 0;
let employerId = 0;

class Customer{
  constructor(name, employer={}){
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer.id;
    store.customers.push(this);
  }
  meals(){
    return this.deliveries().map(delivery =>{
      //console.log("TTT", delivery.meal())
      return delivery.meal()
    })
    // return store.meals.filter(meal => {
    //   return meal.customerId === this.deliveryId
    // })
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }
  totalSpent(){
    return this.meals().reduce(function(a, b){
      return a + b.price;
    }, 0);
   }   
  }            


// Delivery` class:
//   + `new Delivery()` — initialized with `meal` and `customer`; returns an object that has attributes of `mealId`, `customerId`, and `id`
//   + `meal()` - returns the meal associated with the delivery
//   + `customer()` - returns the customer associated with the delivery

class Delivery{
  constructor(meal={}, customer={}){
    this.id = ++deliveryId;
    this.mealId = meal.id;
    this.customerId = customer.id;
    store.deliveries.push(this);
    // if(meal){
    //   this.mealId = meal.id;
    // }
    // if(customer){
    //   this.customerId = customer.id;
    // }
  }
  meal(){
    //console.log("SSS", this.mealId) 
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }
  customer(){
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
  }
}

// `Meal` class:
//   + `new Meal()` — initialized with `title` and `price`; returns an object that has attributes of`title`, `price`, and `id`
//   + `deliveries()` - returns all of the deliveries that delivered the particular meal.
//   + `customers()` - returns all of the customers who have had the meal delivered.
//   + `byPrice()` -  A class method that orders the meals by their price.  Use the `static` keyword to write a class method.

class Meal{
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    
    store.meals.push(this);
    //console.log('HERE', this.price);
  }
  
  deliveries(){
    return store.deliveries.filter(delivery => {
      //debugger
      return delivery.mealId === this.id
    })
  }
  // customers(){
  //   return store.customers.filter(customer => {
  //     return customer.mealId === this.deliveryId
  //   })
  // }
  customers(){
    return store.deliveries.map(delivery => {
      return delivery.customer() 
    })
  }
  static byPrice(){
    return store.meals.sort(function(a, b){return(b.price - a.price)});
  }
}

// `Employer` class:
//   + `new Employer()` — initialized with `name`; returns an object that has attributes of `name` and `id`
//   + `employees()` - returns a list of customers employed by the employer
//   + `deliveries()` - returns a list of deliveries ordered by the employer's employees
//   + `meals()` - returns a list of meals ordered by the employer's employees.  The method is to not return the same meal multiple times.
//   + `mealTotals()` - returns a JavaScript object displaying each respective meal id ordered by the employer's employees.
//   The keys of the JavaScript object are the meal ids and associated with each meal id is a value.
//   For example, `employerOne.mealTotals()` returning an object of `{1: 4, 2: 3}` would mean that the meal with id of 1 was
//   ordered by employerOne's employees four times, and the meal with id of 2 was ordered by employerOne's employees three times.

class Employer{
  constructor(name){
    this.id = ++employerId;
    this.name = name;
    store.employers.push(this);
  }  
  employees(){
    return store.customers.filter(customer => {
      //console.log(this);
      return customer.employerId === this.id    
    })
  }

  deliveries(){
    const d = this.employees().map(employee =>{
      //console.log(employee.deliveries())
      return employee.deliveries()
    })  
    return [].concat.apply([], d)
    
    // return store.deliveries.find(delivery =>{
    //   //console.log("HHH", this.employees())
    //   return this.employees();
    // })
  }
  meals(){
    const a = this.deliveries().map(delivery =>{
      return delivery.meal()
    })
    const b = [...new Set(a)]
    return b;
  }

// `mealTotals()` - returns a JavaScript object displaying each respective meal id ordered by the employer's employees.  
// The keys of the JavaScript object are the meal ids and associated with each meal id is a value.  
// For example, `employerOne.mealTotals()` returning an object of `{1: 4, 2: 3}` would mean that the meal with id of 1 was 
// ordered by employerOne's employees four times, and the meal with id of 2 was ordered by employerOne's employees three times.  
  
mealTotals(){
  debugger
    return store.deliveries.reduce(function (acc, curr) {
    if (typeof acc[curr.mealId] == 'undefined'){
      acc[curr.mealId] = 1;
    } else {
      acc[curr.mealId] += 1;
    }
    return acc;
  }, {});
 }
} 









