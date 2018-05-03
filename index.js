let store = {customers: [], meals: [], deliveries: [], employers: []};

let customerId = 0, mealId = 0, deliveryId = 0, employerId = 0;

class Customer {
  constructor(name, employer) {
    this.id = ++customerId;
    this.name = name;
    if (employer) {this.employerId = employer.id}
    
    store.customers.push(this);
  }
  
  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id);
  }
  
  totalSpent() {
    return this.meals().reduce((sum, meal) => sum.price + meal.price);
    // or return this.meals().reduce((sum, meal) => {sum + meal.price}, 0);
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    
    store.meals.push(this);
  }
  
  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  }
  
  customers(){
    return this.deliveries().map(delivery => delivery.customer());
  }
  
  static byPrice(){
    return store.meals.sort((meal1, meal2) => meal2.price - meal1.price);
  }
}

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId;
    if (meal) {this.mealId = meal.id}
    if (customer) {this.customerId = customer.id}
    
    store.deliveries.push(this);
  }
  
  meal() {
    return store.meals.find(meal => meal.id === this.mealId);
  }
  
  customer() {
    return store.customers.find(customer => customer.id === this.customerId)
  }
}

class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;
    
    store.employers.push(this);
  }
  
  employees() {
    return store.customers.filter(customer => customer.employerId === this.id)
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => delivery.customer().employerId === this.id)
  }
  
  meals() {
    return store.meals.filter(meal => meal.customers().find(customer => customer.employerId === this.id));
  }
  
  mealTotals() {
    let totals = {};
    this.meals().forEach(meal => { 
      const mealTotal = this.deliveries().filter(delivery => delivery.mealId === meal.id).length;
      totals[meal.id] = mealTotal;
    });
    return totals;
  }
}