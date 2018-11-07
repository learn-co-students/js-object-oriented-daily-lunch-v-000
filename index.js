// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

// set the IDs to 0 only once, and then increment every time that ID is initialized
let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;
    // insert neighborhood to the store
    store.neighborhoods.push(this);
  };
  // returns a list of all deliveries placed in a neighborhood
  deliveries() {
    return store.deliveries.filter(
      function (delivery) {
        return delivery.neighborhoodId === this.id;
      }.bind(this)
    );
  };
  // returns all of the customers that live in a particular neighborhood
  customers() {
    return store.customers.filter(
      function (customer) {
        return customer.neighborhoodId === this.id;
      }.bind(this)
    );
  };
  // returns a unique list of meals that have been ordered in a particular neighborhood
  meals() {
    const ALL_MEALS = this.deliveries().map(
      function (delivery) {
        return delivery.meal();
      }.bind(this)
    );
    const UPPER_MEALS = [].concat.apply([], ALL_MEALS);
    return [...new Set(UPPER_MEALS)];
  };
};

class Customer {
  constructor(name, neighborhood) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhood;

    store.customers.push(this);
  };
  // returns all of the deliveries that customer has received
  deliveries() {
    return store.deliveries.filter(
      function (delivery) {
        return delivery.customerId === this.id;
      }.bind(this)
    );
  };
  // returns all meals that a customer has ordered
  meals() {
    return this.deliveries().map(
      function (delivery) {
        return delivery.meal();
      }.bind(this)
    );
  };
  // returns the total amount that the customer has spent on food
  totalSpent() {
    return this.meals().reduce(
      function (total, meal) {
        return total + meal.price
      }, 0
    );
  };
};

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  };
  // returns all of the deliveries associated with a particular meal
  deliveries() {
    return store.deliveries.filter(
      function (delivery) {
        return delivery.mealId === this.id;
      }.bind(this)
    );
  };
  // returns a unique list of customers who have ordered this meal
  customers() {
    return this.deliveries().map(
      function (delivery) {
        return delivery.customer();
      }.bind(this)
    );
  };
  // orders all of the meals by price
  // called on the Meal class
  static byPrice() {
    store.meals.sort(function (a, b) {
      return a.price < b.price;
    });
    return store.meals;
  };
};

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;

    store.deliveries.push(this);
  };
  // returns the meal associated with a particular delivery
  meal() {
    return store.meals.find(
      function (meal) {
        return meal.id === this.mealId;
      }.bind(this)
    );
  };
  // returns the customer associated with a particular delivery
  customer() {
    return store.customers.find(
      function (customer) {
        return customer.id === this.customerId;
      }.bind(this)
    );
  };
  // returns the neighborhood associated with a particular delivery
  neighborhood() {
    return store.neighborhoods.find(
      function (neighborhood) {
        return neighborhood.id === this.neighborhoodId;
      }.bind(this)
    );
  };
};