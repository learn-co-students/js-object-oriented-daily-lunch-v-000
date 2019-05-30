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
  customers() {
    return store.deliveries.map(delivery => {
      return delivery.customer();
    })
  }
}


class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }
}

class Delivery {
  constructor(mealId, customerId, neighborhoodId) {
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
  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId;
    })
  }
  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    })
  }

}
