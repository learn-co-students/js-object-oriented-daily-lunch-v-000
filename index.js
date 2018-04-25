let store = { drivers: [], meals: [], employers: [], customers: [], deliveries: [] };

let mealId = 0;

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    
    store.meals.push(this);
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id; 
    });
  }
  
  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    });
  }
  
  static byPrice() {
    return store.meals.sort(function (a,b) {
      return a.price < b.price;
    });
  }
}

let employerId = 0;

class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;
    
    store.employers.push(this);
  }
  
  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id;
    });
  }
  
  deliveries() {
    let allDeliveries = this.employees().map(employee => {
      return employee.deliveries();
    });
    
    return [].concat.apply([], allDeliveries);
  }
  
  meals() {
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    
    return [...new Set(allMeals)];
  }
  
  mealTotals() {
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    
    let summary = {};
    
    allMeals.forEach(meal => {
      summary[meal.id] = 0;
    });
   
    allMeals.forEach(meal => {
      summary[meal.id] += 1;
    });
    
    return summary;
  }
}

let customerId = 0;

class Customer {
  constructor(name, employer = {}) {
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer.id;
    
    store.customers.push(this);
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id; 
    });  
  }
  
  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    });
  }
  
  totalSpent() {
    let totalSpent = 0;
    
    this.meals().map(meal => {
      totalSpent += meal.price;
    });
    return totalSpent;
  }
}

let deliveryId = 0;

class Delivery {
  constructor(meal = {}, customer = {}) {
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