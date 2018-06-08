// global datastore
let store = {
  neighborhoods: [],
  meals: [],
  customers: [],
  deliveries: []
};

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(deliveries => deliveries.id = this.id);
  }

  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }

  meals() {
    return store.meals;
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
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  }

  customers() {
    return this.deliveries().map(delivery => delivery.customer());
  }

  static byPrice() {
    return store.meals.sort((a, b) => a.price < b.price);
  }

}

class Customer {
  constructor(name, neighborhood) {
    this.name = name;
    this.neighborhoodId = neighborhood;
    this.id = ++customerId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(deliveries => deliveries.customerId === this.id);
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }

  totalSpent() {
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
  }
}

class Delivery {
  constructor(meal, neighborhood, customer) {
    this.mealId = meal;
    this.neighborhoodId = neighborhood;
    this.customerId = customer;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId);
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId);
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
  }
}
