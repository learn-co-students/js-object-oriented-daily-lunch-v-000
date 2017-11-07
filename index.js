let store = { customers: [], meals: [], deliveries: [], employers: [] };

let customerId = 0;
class Customer {
  constructor(name, employer = {}) {
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer.id;

    store.customers.push(this);
  }

  meals() {
    return store.meals.filter(meal => meal.customers().includes(this));
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customer() === this);
  }

  totalSpent() {
    const mealsBought = this.deliveries().map(delivery => delivery.meal());
    const mealPrices = mealsBought.map(meal => meal.price);
    return mealPrices.reduce((a, b) => a + b);
  }
}

let mealId = 0;
class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }

  static byPrice() {
    let mealsByPrice = store.meals.slice();
    mealsByPrice.sort((a, b) => b.price - a.price);
    return mealsByPrice;
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  }

  customers() {
    return this.deliveries().map(delivery => delivery.customer());
  }
}

let deliveryId = 0;
class Delivery {
  constructor(meal = {}, customer = {}) {
    this.id = ++deliveryId;
    this.mealId = meal.id;
    this.customerId = customer.id;

    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId);
  }
  customer() {
    return store.customers.find(customer => customer.id === this.customerId);
  }
}

let employerId = 0;
class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;

    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(customer => customer.employerId === this.id);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return this.employees().includes(delivery.customer());
    });
  }

  meals() {
    let everyMeal = this.deliveries().map(delivery => delivery.meal());
    let uniqueMeals = [...new Set(everyMeal)];
    return uniqueMeals;
  }

  mealTotals() {
    let totals = {};
    let everyMeal = this.deliveries().map(delivery => delivery.meal());

    everyMeal.forEach(meal => (totals[meal.id] = 0));
    everyMeal.forEach(meal => (totals[meal.id] += 1));
    return totals;
  }
}
