let store = {customers: [], meals: [], deliveries: [], employers: []};

let customerId = 0;

class Customer {
  constructor (name, employer) {

    this.id = ++customerId;
    this.name = name;
    if (employer) { this.employerId = employer.id };
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId == this.id;
    })
  }

  meals() {
    return this.deliveries().filter(delivery => {
      return delivery.meal;
    })
  }
}

let mealId = 0;

class Meal {
  constructor (title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this)
  }

  static byPrice() {
    return store.meals.sort(function (meal1, meal2) { return meal1.price - meal2.price; }).reverse();
  }

}

let deliveryId = 0;

class Delivery {
  constructor (meal, customer) {
    this.id = ++deliveryId;
    if (meal && customer) {
      this.mealId = meal.id;
      this.customerId = customer.id;
    }
    store.deliveries.push(this)
  }
}

let employerId = 0;

class Employer {
  constructor (name) {
    this.id = ++employerId;
    this.name = name;
    store.employers.push(this)
  }
}
