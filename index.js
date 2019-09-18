// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 1;
let customerId = 1;
let mealId = 1;
let deliveryId = 1;

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = neighborhoodId++;
    store.neighborhoods.push(this);
  };

  function deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
  }

  function customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }

  function meals() {
    const allMeals = this.customers().map(customer => customer.meals());
    const merged = [].concat.apply([], allMeals);
    return [...new Set(merged)];
  }
};

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = customerId++;
    store.customers.push(this);
  }

  function deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id);
  }

  function meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }

  function totalSpent() {
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
  }
};

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = mealId++;
    store.meals.push(this);
  }

  function deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  }

  function customers() {
    const all = this.deliveries().map(delivery => delivery.customer());
    return all;
  }

  static byPrice() {
    return store.meals.sort((a, b) => a.price < b.price);
  }
};

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = deliveryId++;
  }

  function meal() {
    return store.meals.find(meal => meal.id === this.mealId);
  }

  function customer() {
    return store.customers.find(customer => customer.id === this.customerId);
  }

  function neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
  }
}
