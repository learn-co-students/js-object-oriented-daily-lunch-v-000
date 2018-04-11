let store = { deliveries: [], meals: [], customers: [], employers:[] };

let deliveryId = 0;
class Delivery {
  constructor(meal = {}, customer = {}) {
    this.id = ++deliveryId;
    this.mealId = meal.id;
    this.customerId = customer.id;

    store.deliveries.push(this);
  };
  meal(){
    return store.meals.find(meal => {return meal.id === this.mealId});
  };
  customer(){
    return store.customers.find(customer => {return customer.id === this.customerId});
  };
};

let mealId = 0;
class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  };
  deliveries(){
    return store.deliveries.filter(delivery => {return delivery.mealId === this.id});
  };
  //customers() - returns all of the customers who have had the meal delivered.
  customers(){
    return this.deliveries().map(delivery => {return delivery.customer()});
  };
  static byPrice(){
    return store.meals.sort((a, b) => {return b.price - a.price});
  };
};

let customerId = 0;
class Customer {
  constructor(name = {}, employer = {}) {
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer.id;

    store.customers.push(this);
  };
  //meals() - returns all of the meals that a customer has had delivered
  meals() {
  return this.deliveries().map(delivery => {return delivery.meal()});
  };
  deliveries(){
    return store.deliveries.filter(delivery => {return delivery.customerId === this.id});
  };
  totalSpent(){
    return this.meals().reduce(function(total, currentMeal) {
      return total + currentMeal.price;
    }, 0);
  };
};

//The employer of a customer is associated with the deliveries and meals ordered by its employees.
let employerId = 0;
class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;

    store.employers.push(this);
  };
  employees(){
    return store.customers.filter(customer => {return customer.employerId === this.id });
  };
  // returns a list of deliveries ordered by the employer's employees
  deliveries(){
    let allDeliveries = this.employees().map(employee => {return employee.deliveries()});
    let merged = [].concat(...allDeliveries);
    return merged;
  }
  //returns a list of meals ordered by the employer's employees. The method is to not return the same meal multiple times.
  meals(){
    let allMeals = this.deliveries().map(delivery => {return delivery.meal()});
    // spread operator here transforms set to array
    // Set only returns unique values
    let uniqueMeals = [...new Set(allMeals)];
    return uniqueMeals;
  };
  mealTotals(){
    let allMeals = this.deliveries().map(delivery => {return delivery.meal()});
    let totals = {}
    allMeals.forEach(meal => {totals[meal.id] = 0});
    allMeals.forEach(meal => {totals[meal.id] += 1});
    return totals;
  };
};
