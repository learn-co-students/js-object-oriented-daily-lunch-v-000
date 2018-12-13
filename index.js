// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this);
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id;
    });
  }
  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id;
    });
  }
  meals() {
    const listMeals = this.customers().map(customer => customer.meals());
    const merged = [].concat.apply([], listMeals);
    return [...new Set(merged)];
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
    return this.deliveries().map( delivery => {
      return delivery.customer();
    });
  }
  static comparePrice(meal1, meal2) {
    return meal2.price - meal1.price;
  }
  static byPrice() {
    return store.meals.sort(this.comparePrice);
  }
}

class Customer {
  constructor(name, neighborhoodid) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodid;
    store.customers.push(this);
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  }
  meals() {
    return this.deliveries().map( delivery => {
      return delivery.meal();
    });
  }
  totalSpent() {
    return this.meals().forEach(meal => {
      totalCost += meal.price;
    });
  }
}

class Delivery {
  constructor(mealid, neighborhoodid, customerid) {
    this.id = ++deliveryId;
    this.mealId = mealid;
    this.neighborhoodId = neighborhoodid;
    this.customerId = customerid;
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
  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId;
    });
  }
}
