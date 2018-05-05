let store = { customers: [], employers: [], meals: [],  deliveries: [] }

let customerId = 0;
let employerId = 0;
let mealId = 0;
let deliveryId = 0;

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
    })
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    })
  }

  totalSpent() {
    return this.meals().reduce(function(sum, meal) {
      return sum + meal.price;
    }, 0);
  }
}

class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;
    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id;
    })
  }

  deliveries() {
    return this.employees().map(employee => {
      return employee.deliveries();
    }).reduce((acc, val) => acc.concat(val), []);
  }

  meals() {
    return [...new Set(this.employees().map(employee => {
      return employee.meals();
    }).reduce((acc, val) => acc.concat(val), []))];
  }

  mealTotals() {
    let totals = {};

    let meals = this.employees().map(employee => {
      return employee.meals();
    }).reduce((acc, val) => acc.concat(val), []);

    for (const meal of meals){
      if (meal.id in totals){
        totals[meal.id] += 1;
      }else{
        totals[meal.id] = 1;
      }
    }
    
    return totals;
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
    })
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    })
  }

  static byPrice() {
    return store.meals.slice().sort(function(mealA, mealB){
      return mealA.price < mealB.price;
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
    })
  }

  customer(){
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    })
  }
}
