const store = {
  customers: [],
  meals: [],
  deliveries: [],
  employers: [],
};

let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

class Customer {
  constructor(name, employer = {}) {
    customerId += 1;
    this.id = customerId;
    this.name = name;
    this.employerId = employer.id;
    store.customers.push(this);
  }
  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id);
  }
  totalSpent() {
    return this.meals().reduce((total, meal) => total + meal.price, 0);
  }
}

class Meal {
  constructor(title, price) {
    mealId += 1;
    this.id = mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  }
  customers() {
    return this.deliveries().map(delivery => delivery.customer());
  }
  static byPrice() {
    return store.meals.sort(meal => meal.price);
  }
}

class Delivery {
  constructor(meal = {}, customer = {}) {
    deliveryId += 1;
    this.id = deliveryId;
    this.mealId = meal.id;
    this.customerId = customer.id;
    store.deliveries.push(this);
  }
  meal() {
    return store.meals.find(meal => meal.id === this.mealId);
  }
  customer() {
    return store.customers.find(customer => customer.id === this.customerId);
  }
}

class Employer {
  constructor(name) {
    employerId += 1;
    this.id = employerId;
    this.name = name;
    store.employers.push(this);
  }
  employees() {
    return store.customers.filter(customer => customer.employerId === this.id);
  }
  deliveries() {
    const allDeliveries = this.employees().map(employee =>
      employee.deliveries());

    const total = [].concat.apply(...allDeliveries);

    return total;
  }
  meals() {
    const allMeals = this.deliveries().map(delivery => delivery.meal());
    const uniqueMeals = [...new Set(allMeals)];
    return uniqueMeals;
  }
  mealTotals() {
    const allMeals = this.deliveries().map(delivery => delivery.meal());
    const summaryObject = {};
    allMeals.forEach((meal) => {
      summaryObject[meal.id] = 0;
    });
    allMeals.forEach((meal) => {
      summaryObject[meal.id] += 1;
    });
    return summaryObject;
  }
}
