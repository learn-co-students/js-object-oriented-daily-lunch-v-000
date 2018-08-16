// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliverId = 0;

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  };

  deliveries() {
    return store.deliveries.filter(d => d.neighborhoodId == this.id);
  };

  customers() {
    return store.customers.filter(c => c.neighborhoodId === this.id);
  }

  meals() {
    return [...new Set(this.deliveries().map(d => d.meal()))];
  }
};

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.id = ++customerId;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  };

  deliveries() {
    return store.deliveries.filter(d => d.customerId === this.id);
  };

  meals() {
    return this.deliveries().map(d => d.meal());
  }

  totalSpent() {
    return this.meals().map(m => m.price).reduce((total, price) => total + price);
  };
};

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  };

  deliveries() {
    return store.deliveries.filter(d => d.mealId === this.id);
  };

  customers() {
    return this.deliveries().map(d => d.customer());
  };

  static byPrice() {
    return store.meals.sort(function(a, b) {
      return b.price - a.price;
    });
  };

};

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliverId;
    store.deliveries.push(this);
  };

  customer() {
    return store.customers.find(c => c.id == this.customerId)
  }

  meal() {
    return store.meals.find(m => m.id == this.mealId);
  };

  neighborhood() {
    return store.neighborhoods.find(n => n.id == this.neighborhoodId);
  }
};
