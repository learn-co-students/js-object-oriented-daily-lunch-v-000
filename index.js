// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let mealId = 0;
let neighborhoodId = 0;
let customerId = 0;
let deliveryId =  0;


class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }
}

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this);
  }
  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.neighborhoodId === this.id
    }.bind(this));
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
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId
    this.mealId = mealId;
    this.customerId = customerId;
    this.neighborhoodId = neighborhoodId;
    store.deliveries.push(this);
  }
  meal() {
    return store.meals.find(function(meal) {
      return meal.id === this.mealId
    }.bind(this));
  }
  customer() {
    return store.customers.find(function(customer) {
      return customer.id === this.customerId;
    }.bind(this));
  }
  neighborhood() {
    return store.neighborhoods.find(function(neighborhood) {
      return neighborhoodId === this.neighborhoodId;
    }.bind(this));
  }

}
