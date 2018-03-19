
let customerId = 0;
let deliveryId = 0;

let store = {customers: [], meals: [], employers: [], deliveries: []}

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId;
    this.mealId = meal.id;
    this.customerId = customer.id;
  }
}

class Customer {
  constructor(name, employer) {
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer.id;
  }
  store.customers.push(this)
}
