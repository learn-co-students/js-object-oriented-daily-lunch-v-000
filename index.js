let store = {customers: [], meals: [], deliveries: [], employers: []};
let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

class Customer {
  constructor(name, employer) {
    this.id = ++customerId;
    this.name = name;
    if(employer){
      this.employerId = employer.id;
    };

    store.customers.push(this);
  };

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  };

  meals() {
    return this.deliveries().map(function(delivery) {
      return delivery.meal();
    })
  };

  totalSpent() {
    return this.meals().reduce(function(sum, meal) {
      return sum + meal.price;
    }, 0);
  };
};

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  };

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  };

  customers() {
    return this.deliveries().map(function(delivery) {
      return delivery.customer();
    })
  };

  static byPrice() {
    return store.meals.sort(function(a,b){
      return b.price - a.price;
    });
  };
};

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId;
    if(meal){
      this.mealId = meal.id;
    };
    if(customer){
      this.customerId = customer.id;
    };

    store.deliveries.push(this);
  };

  customer() {
    return store.customers.find(function(customer){
      return customer.id === this.customerId
    }.bind(this));
  }

  meal() {
    return store.meals.find(function(meal){
      return meal.id === this.mealId
    }.bind(this));
  };
}; // delivery class

class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;

    store.employers.push(this);
  };

  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    });
  };

  deliveries() {
    let allDeliveries = this.employees().map(function(employee) {
      return employee.deliveries();
    });
    return [].concat(...allDeliveries);
  };

  meals() {
    let employeeMeals = [];
    this.deliveries().forEach(delivery => {
      if(!employeeMeals.includes(delivery.meal())) {
        employeeMeals.push(delivery.meal())
      }
    });
    return employeeMeals;
  };

  mealTotals() {
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });

    let mealTotal = {};

    allMeals.forEach(function(meal) {
      mealTotal[meal.id] = 0;
    });

    allMeals.forEach(function(meal) {
      mealTotal[meal.id] += 1;
    });

    return mealTotal;
  };

};
