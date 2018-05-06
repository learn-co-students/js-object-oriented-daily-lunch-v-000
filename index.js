let store = {employers: [], customers: [], meals: [], deliveries: []}


let customerId = 0;
let employerId = 0;
let mealId = 0;
let deliveryId = 0;

class Employer{
  constructor(name){
    this.id = ++employerId;
    this.name = name;

    store.employers.push(this);
  }
  employees(){
    return store.customers.filter(customer =>{
      return customer.employerId === this.id;
    })
  }
  deliveries(){
    return store.deliveries.filter(delivery =>{
      return delivery.customer().employerId === this.id;
    })
  }
  meals(){
    //let meals = store.meals.filter(meal =>
      //meal.customers().filter(customer =>
        //this.employees()));
    let meals = this.deliveries().map((delivery) => delivery.meal())

    //return a uniquified(?) array
    let uniqueMeals = [... new Set(meals)]
    return uniqueMeals;
  }

  //mealTotals() {
  //  let total = {}
  //  this.meals().map(meal => total[meal.id] = meal.customers().length)
  //  return total
  //}
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
}

class Customer{
  constructor(name, employer){
    this.id = ++customerId;
    this.name = name;
    if (employer){
      this.employerId = employer.id;
    }
    store.customers.push(this);
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    })
  }
  meals(){
    return store.deliveries.map(delivery => {
      return delivery.meal();
    })
  }
  totalSpent(){
    //return this.meals().reduce(function(total, meal){
    //  return total += meal.price;
    //}, 0);
    let total = 0;
    this.deliveries().forEach(function(delivery){
      total += delivery.meal().price
    })
    return total;
  }
}

class Delivery{
  constructor(meal, customer){
    this.id = ++deliveryId;
    if (meal){ this.mealId = meal.id};
    if (customer){this.customerId = customer.id};

    store.deliveries.push(this);
  }
  customer(){
    return store.customers.find(customer =>{
      return customer.id === this.customerId;
    })
  }
  meal(){
    return store.meals.find(meal =>{
      return meal.id === this.mealId;
    })
  }
}

class Meal{
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    })
  }
  customers(){
    return store.deliveries.map(delivery =>{
      return delivery.customer();
    })
  }
  static byPrice(){
    return store.meals.sort(function(a,b){ return b.price - a.price})
  }
}
