let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

const store = {customers: [], meals: [], deliveries: [], employers: []};

class Customer {
  constructor(name, employer) {
    this.name = name;
    this.employerId = employer.id;
    this.id = ++customerId;
    store.customers.push(this);
  }

}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

}

class Delivery {
  constructor(meal, customer) {
    this.mealId = meal.id;
    this.customerId = customer.id;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

}

class Employer {
  constructor (name) {
    this.name = name;
    this.id = ++employerId;
    store.employers.push(this);
  }
}