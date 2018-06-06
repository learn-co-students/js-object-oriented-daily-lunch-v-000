// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;
    
    store.neighborhoods.push(this);
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id;
    });
  }
  
  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id;
    });
  }
  
  meals() {
    const deliveries = this.deliveries();
    const meals = [];
    
    deliveries.forEach(function(delivery) {
      if (!meals.includes(delivery.meal())) {
        meals.push(delivery.meal());
      }
    });
    
    return meals;
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    
    store.customers.push(this);
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  }
  
  meals() {
    const deliveries = this.deliveries();
    const meals = [];
    
    deliveries.forEach(function(delivery) {
        meals.push(delivery.meal());
    });
    
    return meals;
  }
  
  totalSpent() {
    const meals = this.meals();
    const cost = [];
    
    meals.forEach(function(meal) {
      cost.push(meal.price);
    });
    
    return cost.reduce(function(a, b) {return a + b;} );
  }
}

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
    const deliveries = this.deliveries();
    const customers = [];
    
    deliveries.forEach(function(delivery) {
      if (!customers.includes(delivery.customer())) {
        customers.push(delivery.customer());
      }
    });
    
    return customers;
  }
  
  static byPrice() {
    return store.meals.sort(function(a, b) {return b.price - a.price});
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    
    store.deliveries.push(this);
  }
  meal() {
    const findId = this.mealId;
    
    return store.meals.find(function(meal) {
      return meal.id === findId;
    });
  }
  
  customer() {
    const findId = this.customerId;
    
    return store.customers.find(function(customer) {
      return customer.id === findId;
    });
  }
  
  neighborhood() {
    const findId = this.neighborhoodId;
    
    return store.neighborhoods.find(function(neighborhood) {
      return neighborhood.id === findId;
    });
  }
}