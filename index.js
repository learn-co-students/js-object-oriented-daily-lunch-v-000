let customerId = 0, mealId = 0, deliveryId = 0, employerId = 0;

let store = {
  customers: [],
  employers: [],
  meals: [],
  deliveries: []
};

class Customer {
  constructor(name, employer) {
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer;

    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(function(delivery){
      return delivery.customerId === this.id;
    }.bind(this));
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }

  totalSpent() {
    const pricesOfMeals = this.deliveries().map(delivery => delivery.meal().price);

    return pricesOfMeals.reduce(function(sum, eachPrice){
      return sum + eachPrice;
    }, 0);
  }
}

class Employer {
  constructor(name) {
    this.id = ++customerId;
    this.name = name;

    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(function(customer){
      return customer.employerId === this;
    }.bind(this));
  }

  deliveries() {
    return store.deliveries.filter(function(delivery){
      return delivery.customer().employerId === this;
    }.bind(this));
  }

  meals() {
    let meals = this.deliveries().map(delivery => {
      return delivery.meal();
    });

    return [...new Set(meals)];
  }

  mealTotals() {
    let deliveries = this.deliveries().map(delivery => delivery.meal());
    let mealTotals = {};

    deliveries.forEach(meal => mealTotals[meal.id] = 0);
    deliveries.forEach(meal => mealTotals[meal.id] += 1);

    return mealTotals;
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
    return store.deliveries.filter(function(delivery){
      return delivery.mealId === this.id;
    }.bind(this));
  }

  customers() {
    return this.deliveries().map(function(delivery){
      return delivery.customer();
    });
  }

  static byPrice() {
    return store.meals.sort(function(mealA, mealB) {
      return mealA.price < mealB.price;
    });
  }
}

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId;

    if (meal) {
      this.mealId = meal.id;
    }

    if (customer) {
      this.customerId = customer.id;
    }

    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(function(meal){
      return meal.id === this.mealId;
    }.bind(this));
  }

  customer() {
    return store.customers.find(function(customer){
      return customer.id === this.customerId;
    }.bind(this));
  }
}