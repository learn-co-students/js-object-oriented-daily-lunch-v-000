let store = { customers: [], meals: [], deliveries: [], employers: [] }

let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

class Customer {
  constructor (name, employer) {
    this.id = ++customerId;
    this.name = name;
    if (employer) {
      this.employerId = employer.id;
    }
    store.customers.push(this);
  }
  setEmployer (employer) {
    this.employerId = employer.id;
  }
  deliveries () {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  }
  meals () {
    let deliveries = this.deliveries();

    return deliveries.map(delivery => {
      return delivery.meal();
    });
  }
  totalSpent () {
    let meals = this.meals();

    const reduceTotal = function(agg, el, i, arr) {
      return agg += el.price;
    };

    return meals.reduce(reduceTotal, 0);
  }
}

class Meal {
  constructor (title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }
  deliveries () {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    });
  }
  customers () {
    let deliveries = this.deliveries();

    return deliveries.map(delivery => {
      return delivery.customer();
    });
  }
  static byPrice () {
    function priceSorter (a, b) {
      return b.price - a.price;
    }

    return store.meals.sort(priceSorter);
  }
}

class Delivery {
  constructor (meal, customer) {
    this.id = ++deliveryId;
    if (meal) {
      this.mealId = meal.id;
    }
    if (customer) {
      this.customerId = customer.id;
    }
    store.deliveries.push(this);
  }
  setMeal (meal) {
    this.mealId = meal.id;
  }
  setCustomer (customer) {
    this.customerId = customer.id;
  }
  meal () {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
  }
  customer () {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
  }
}

class Employer {
  constructor (name) {
    this.id = ++employerId;
    this.name = name;
    store.employers.push(this);
  }
  employees () {
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    });
  }
  deliveries () {
    let employees = this.employees();

    let d = employees.map(employee => {
      return employee.deliveries();
    });
    let formatted_deliveries = d[0].concat(d[1]);
    return formatted_deliveries
  }
  meals () {
    let employees = this.employees();

    let m = employees.map(employee => {
      return employee.meals();
    });

    let formatted_meals = m[0].concat(m[1]);

    let unique = [... new Set(formatted_meals)];
    return unique;
  }
  mealTotals () {
    let meals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    let totalObject = {};

    meals.forEach(function(meal) {
      totalObject[meal.id] = 0;
    });
    meals.forEach(function(meal) {
      totalObject[meal.id] += 1;
    });

    return totalObject;
  }
}
