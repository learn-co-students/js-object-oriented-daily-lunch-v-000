// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

/*
neighborhood has many deliveries
neighborhood has many customers through deliveries
neighborhood has many meals through deliveries
*/
class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;

    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id;
      }.bind(this)
    );
  }

  customers() {
    return store.customers.filter(
      function(customer) {
        return (customer.neighborhoodId = this.id);
      }.bind(this)
    );
  }

  meals() {
    const allMeals = this.customers().map(customer => customer.meals());
    const merged = [].concat.apply([], allMeals);
    return [...new Set(merged)];
  }
}

/*
customer has many deliveries
customer has many meals through deliveries
customer belongs to a neighborhood
*/

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;

    if (neighborhoodId) {
      this.neighborhoodId = neighborhoodId;
    }

    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.id;
      }.bind(this)
    );
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }

  totalSpent() {
    // Loop through an array of objects
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
  }
}

/*
meal has many customers
*/
class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.mealId === this.id;
      }.bind(this)
    );
  }

  customers() {
    return this.deliveries().map(delivery => delivery.customer());
  }

  static byPrice() {
    return store.meals.sort((a, b) => a.price < b.price);
  }
}

/*
delivery belongs to a meal
delivery belongs to a customer
delivery belongs to a neighborhood
*/
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;

    if (mealId) {
      this.mealId = mealId;
    }

    if (neighborhoodId) {
      this.neighborhoodId = neighborhoodId;
    }

    if (customerId) {
      this.customerId = customerId;
    }

    store.deliveries.push(this);
  }

  meal() {
    return store.meals.filter(
      function(meal) {
        return meal.id === this.mealId;
      }.bind(this)
    )[0];
  }

  customer() {
    return store.customers.filter(
      function(customer) {
        return customer.id === this.customerId;
      }.bind(this)
    )[0];
  }

  neighborhood() {
    return store.neighborhoods.filter(
      function(neighborhood) {
        return neighborhood.id === this.neighborhoodId;
      }.bind(this)
    )[0];
  }
}
