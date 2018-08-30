// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;

class Neighborhood {
  constructor (name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter( delivery => delivery.neighborhoodId === this.id);
  }

  customers() {
    return store.customers.filter( customer => customer.neighborhoodId === this.id);
  }
}

class Customer {
  constructor (name, neighborHoodId) {
    this.name = name;
    this.neighborHoodId = neighborHoodId;
    this.id = ++customerId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter( delivery => delivery.customerId === this.id);
  }

  meals() {
    return this.deliveries().map ( delivery => delivery.mealId );
  }

  totalSpent() {
    return this.meals.reduce( function )
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
    return store.deliveries.filter( delivery => delivery.mealId === this.id)
  }
}
