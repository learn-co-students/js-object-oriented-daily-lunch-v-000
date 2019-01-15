// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 1;
let mealId = 1;
let customerId = 1;
let deliveryId = 1;

class Neighborhood {
  constructor(name) {
    this.id = neighborhoodId++;
    this.name = name;
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
    const allMeals = this.customers().map(customer => {
      return customer.meals();
    });
    const merged = [].concat.apply([], allMeals);
    return [...new Set(merged)];
  };
};

class Meal {
  constructor(title, price = 0) {
    this.id = mealId++;
    this.title = title;
    this.price = price;
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
    return this.deliveries().map(delivery => {
      return delivery.customer();
    });
  };

  static byPrice() {
    return store.meals.sort((a, b) => a.price < b.price);
  };
};

class Customer {
  constructor(name, neighborhoodId) {
    this.id = customerId++;
    this.name = name;
    if (neighborhoodId) {
      this.neighborhoodId = neighborhoodId;
    }
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
    return this.deliveries().map(delivery =>  delivery.meal());
  };

  totalSpent() {
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
  };
};

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = deliveryId++;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  };

  meal() {
    return store.meals.find(
      function(meal) {
        return meal.id === this.mealId;
      }.bind(this)
    );
  };

  customer() {
    return store.customers.find(
      function(customer) {
        return customer.id === this.customerId;
      }.bind(this)
    );
  };

  neighborhood() {
    return store.neighborhoods.find(
      function(neighborhood) {
        return neighborhood.id === this.neighborhoodId;
      }.bind(this)
    );
  };
};
