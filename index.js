// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

// has many deliveries
// has many customers through deliveries
// has many meals through deliveries
class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = neighborhoodId ++;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId == this.id;
    });
  }

  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId == this.id;
    });
  }
}

// has many deliveries
// has many meals through deliveries
// belongs to a neighborhood
class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = customerId ++;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      this.id == delivery.customerId;
    })
  }
}

//has many customers
class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = mealId ++;
    store.meals.push(this);
  }
}

// belongs to a meal, belongs to a customer, and belongs to a neighborhood
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = deliveryId ++;
    store.deliveries.push(this);
  }

  meal() {
    let m = store.meals.filter(meal => {
      return meal.deliveryId == this.id;
    });
debugger
    return Object.assign({}, m);
  }
}