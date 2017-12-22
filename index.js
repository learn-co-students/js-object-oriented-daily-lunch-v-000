let store = {customers: [], meals: [], deliveries: [], employers: []};

let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

class Customer {
  constructor(name, employer) {
    this.id = ++customerId;
    this.name = name;
    if (employer) {
      this.employerId = employer.id;
    }

    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal())
  }

  totalSpent() {
    return this.meals().reduce(function(sum, mealElement) {
      return sum + mealElement.price;
    }, 0)
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price

    store.meals.push(this)
  }

  static byPrice() {
    return store.meals.sort(function(a, b) {
      return b.price - a.price;
    });
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers() {
    return this.deliveries().map(delivery => delivery.customer())
  }
}

class Employer {
  constructor(name) {
    this.id = ++employerId
    this.name = name

    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(customer => customer.employerId === this.id)
  }

  deliveries() {
    const allDeliveries = this.employees().map(employee => employee.deliveries());

    return [].concat(...allDeliveries);
  }

  allMeals() {
    return this.deliveries().map(delivery => delivery.meal());
  }

  meals() {
    const meals = this.allMeals();

    return [...new Set(meals)];
  }

  mealTotals() {
    return this.allMeals().reduce((totals, meal) => {
      totals[meal.id] = totals[meal.id] || 0;
      totals[meal.id] += 1;

      return totals;
    }, {});
  }
}

class Delivery {
  constructor(meal = {}, customer = {}) {
    this.id = ++deliveryId
    this.mealId = meal.id
    this.customerId = customer.id

    store.deliveries.push(this)
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId)
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }
}