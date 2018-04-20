let store = {
  customers: [],
  meals: [],
  deliveries: [],
  employers: []
};


let customerId = 0;
class Customer {
  constructor(name, employer) {
    this.id = ++customerId;
    this.name = name;
    if (employer) {
      this.employerId = employer.id;
    }
    store.customers.push(this);
    return this;
  }

  meals() {
    const deliveries = this.deliveries();
    const m = deliveries.map(delivery =>{
      return delivery.meal();
    });
    return [...new Set(m)];
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  }

  totalSpent() {
    const deliveries = this.deliveries();
    const mealPrices = deliveries.map(delivery => {
      return delivery.meal().price;
    });
    return mealPrices.reduce((a, b) => a + b, 0);
  }
}


let mealId = 0;
class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
    return this;
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    });
  }

  customers() {
    const deliveries = this.deliveries();
    const c = deliveries.map(delivery =>{
      return delivery.customer();
    });
    return [...new Set(c)];
  }

  static byPrice() {
    const meals = [...store.meals];
    return meals.sort((a, b) => {
      return b.price - a.price;
    });
  }
}


let deliveryId = 0;
class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId;
    if (meal) { this.mealId = meal.id; }
    if (customer) { this.customerId = customer.id; }
    store.deliveries.push(this);
    return this;
  }

  meal(){
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


let employerId = 0;
class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;
    store.employers.push(this);
    return this;
  }

  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id;
    });
  }

  deliveries() {
    const employees = this.employees();
    return store.deliveries.filter(delivery => {
      return employees.includes(delivery.customer());
    });
  }

  meals() {
    const deliveries = this.deliveries().sort(function(a, b) {
      (a.customer.name).localeCompare(b.customer.name);
    });
    const meals = deliveries.map(delivery => {
      return delivery.meal();
    });
    return [...new Set(meals)];
  }

  mealTotals() {
    const totals = {};
    this.meals().forEach(meal => totals[meal.id] = 0);
    this.deliveries().forEach(delivery => {
      totals[delivery.meal().id] += 1;
    });
    return totals;
  }
}
