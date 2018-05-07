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
    return store.deliveries.map(delivery => {
      return delivery.meal()
    })}

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    })}

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
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    })}

  customers() {
    return store.deliveries.map(delivery => {
      return delivery.customer();
    })
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
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    })}

  deliveries() {
    return store.deliveries.map(delivery => {
      return delivery.customer()
    })}

  meals() {

  }

  mealTotals() {

  }



}