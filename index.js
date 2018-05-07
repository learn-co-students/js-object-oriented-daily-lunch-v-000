let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

const store = {customers: [], meals: [], deliveries: [], employers: []};

class Customer {
  constructor(name, employer = {}) {
    this.name = name;
    this.employerId = employer.id;
    this.id = ++customerId;
    store.customers.push(this);
  }

  meals() {
 }

  deliveries() {

  }

  totalSpent() {

  }

}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.map(delivery => {
      return delivery.meal();
    })}

  customers() {

  }

  static byPrice () {

  }

}

class Delivery {
  constructor(meal = {}, customer = {}) {
    this.mealId = meal.id;
    this.customerId = customer.id;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    })}

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    })}
}


class Employer {
  constructor (name) {
    this.name = name;
    this.id = ++employerId;
    store.employers.push(this);
  }

  employees() {

  }

  deliveries() {

  }

  meals() {

  }

  mealTotals() {

  }



}