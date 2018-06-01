// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

// Neighborhood
let neighborhoodId = 0;

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;

    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id;
    })
  }

  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhood();
    })
  }

  meals() {
    let all = this.deliveries().map(delivery => {
      return delivery.meal();
    })
    return Array.from(new Set(all));
  }

}

// Meal
let mealId = 0;

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
    })
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    })
  }

  static byPrice() {
    return store.meals.sort(function (a, b) {
      return b.price - a.price;
    })
  }
}

// Delivery
let deliveryId = 0;

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.customerId = customerId;
    this.neighborhoodId = neighborhoodId;

    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    })
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    })
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId;
    })
  }
}

// Customer
let customerId = 0;

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;

    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    })
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    })
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId;
    })
  }

  totalSpent() {
    return this.meals().reduce(function(agg, el) {return agg += el.price;}, 0);
  }

}
