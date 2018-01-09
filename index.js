let store = {deliveries: [], meals: [], employers: [], customers: []};
let deliveryId = 0;
let mealId = 0;
let employerId = 0;
let customerId = 0;

class Delivery {
  constructor(meal = {}, customer = {}) {
    this.id = ++deliveryId;
    this.mealId = meal.id;
    this.customerId = customer.id;

    store.deliveries.push(this);
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
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
    });
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    });
  }

  static byPrice() {
    return store.meals.sort(function (a,b) {
      return a.price < b.price;
    });
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
    });
  }

  deliveries() {
    let allDelivered = this.employees().map(employee => {
      return employee.deliveries();
    });
    let delivered = [].concat.apply([], allDelivered);
    return delivered;
  }

  allMeals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    })
  }

  meals() {
    let uniqueMeals = [...new Set(this.allMeals())];
    return uniqueMeals;
  }


  mealTotals() {
    let totals = {};
    this.allMeals().forEach(function(meal) {
      totals[meal.id] = 0;
    });
    this.allMeals().forEach(function(meal) {
      totals[meal.id] += 1;
    });
    return totals;
  }
}

class Customer {
  constructor(name, employer = {}) {
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer.id;

    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId == this.id;
    });
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    });
  }

  totalSpent() {
    return this.meals().reduce(function (total, meal) {
      return total + meal.price;
    }, 0);
  }
}
