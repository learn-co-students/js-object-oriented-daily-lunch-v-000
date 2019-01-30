// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;
class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  };
  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id;
      }.bind(this)
    );
  };
  customers() {
    return store.customers.filter(
      function(customer) {
        return customer.neighborhoodId === this.id;
      }.bind(this)
    );
  };
  meals() {
    const allMeals = this.deliveries().map(
      function(delivery) {
        return delivery.meal();
      }.bind(this)
    );
    // const uniqueMeals = [];
    // allMeals.filter(meal => !uniqueMeals.includes(meal));
    // return uniqueMeals;
    return [...new Set(allMeals)];
  };
};
class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerId;
    store.customers.push(this);
  };
  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.id;
      }.bind(this)
    );
  };
  meals() {
    return this.deliveries().map(
      function(delivery) {
        return delivery.meal();
      }.bind(this)
    );
  };
  totalSpent() {
    const prices = this.meals().map(meal => meal.price);
    return prices.reduce((acc, val) => acc + val);
  };
};
class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price
    this.id = ++mealId;
    store.meals.push(this);
  };
  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.mealId === this.id;
      }.bind(this)
    );
  };
  customers() {
    return this.deliveries().map(
      function(delivery) {
        return delivery.customer();
      }.bind(this)
    );
  };
  static byPrice() {
    return store.meals.sort((a, b) => b.price - a.price);
  };
};
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
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
