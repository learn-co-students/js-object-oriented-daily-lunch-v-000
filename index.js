let store = {customers: [], meals: [], deliveries: [], employers: []};

let customerId = 0;

class Customer {
  constructor (name, employer) {

    this.id = ++customerId;
    this.name = name;
    if (employer) { this.employerId = employer.id };
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
    return this.meals().reduce(function(sum, meal) {
      return sum + meal.price;
    }, 0);
  }
}

let mealId = 0;

class Meal {
  constructor (title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  static byPrice() {
    return store.meals.sort(function (meal1, meal2) { return meal1.price - meal2.price; }).reverse();
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId == this.id;
    });
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    });
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
    store.deliveries.push(this);
  }

  meal() {
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
  constructor (name) {
    this.id = ++employerId;
    this.name = name;
    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(customer => {
      return this.id == customer.employerId;
    });
  }

  deliveries() {
    return this.employees().map(employee => {
      return employee.deliveries();
    }).reduce(function (a, b) { return a.concat(b)});
  }

  meals() {
    const employerMeals = this.employees().map(employee => {
      return employee.meals().reduce(function (acc, meal) { return meal; }, 0);
    });
    return [...new Set(employerMeals)];
  }

  mealTotals() {
    const allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });

    let summaryObject = {};
    allMeals.forEach(function(meal) {
      summaryObject[meal.id] = 0;
    });
    allMeals.forEach(function(meal) {
      summaryObject[meal.id] += 1;
    });

    return summaryObject;
  }

}
