let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

let store = {customers: [], meals: [], deliveries: [], employers: []};

class Customer {
  constructor(name, employer = {}) {
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer.id;

    store.customers.push(this);
  }

  meals(){
    return this.deliveries().map(delivery => {
      return delivery.meal()
    });
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  }

  totalSpent(){
    return this.meals().reduce(function (accumulator, meal) {
      return accumulator + meal.price
    }, 0);
  }
}

class Meal{
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    });
  }

  customers(){
    return this.deliveries().map(delivery => {
      return delivery.customer();
    });
  }

  static byPrice(){
    return store.meals.sort(function (a, b) {
      return b.price - a.price;
    });
  }
}

class Delivery{
  constructor(meal, customer){
    this.id = ++deliveryId;
    store.deliveries.push(this);

    if (meal) {
      this.mealId = meal.id;
    }
    if (customer) {
      this.customerId = customer.id;
    }
  }

  setMeal(meal){
    this.mealId = meal.id;
  }

  setCustomer(customer){
    this.customerId = customer.id;
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

  deliveries() {
      let allDeliveries = this.employees().map(employee => {
        return employee.deliveries();
      });
      let merged = [].concat.apply([], allDeliveries);
      return merged;

    }

  meals(){
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    let unique = [...new Set(allMeals.filter(meal => meal.title))];
    return unique
  }

  mealTotals(){
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    let totalMeals = {};

    allMeals.forEach(function (meal) {
      totalMeals[meal.id] = 0;
    });
    allMeals.forEach(function (meal) {
      totalMeals[meal.id] += 1;
    });
    return totalMeals
  }
}
