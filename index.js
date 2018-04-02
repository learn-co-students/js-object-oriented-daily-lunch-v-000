let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

let store = { customers: [], meals: [], deliveries: [], employers: [] };

class Customer {
  constructor(name, employer = {}) {
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer.id;
    store.customers.push(this);

  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      delivery.customerId === this.id
    });
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

class Delivery {
  constructor(meal = {}, customer = {}) {
    this.id = ++deliveryId;
    this.mealId = meal.id;
    this.customerId = customer.id;
    store.deliveries.push(this);
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
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
      delivery.mealId === this.id;
    });
  }

  static byPrice() {
    return store.meals.sort(function(a,b) {
      return b.price - a.price
    })
  }
}

class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;
    store.employers.push(this);
  }
}