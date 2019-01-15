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
      delivery => delivery.neighborhoodId === this.id);
      // function(delivery) {
      //   return delivery.neighborhoodId === this.id;
      // }.bind(this) //ES5
  };

  customers() {
    return store.customers.filter(
      customer => customer.neighborhoodId === this.id);
      // function(customer) {
      //   return customer.neighborhoodId === this.id;
      // }.bind(this) //ES5
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
      delivery => delivery.mealId === this.id);
      // function(delivery) {
      //   return delivery.mealId === this.id;
      // }.bind(this)  //ES5
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
      delivery => delivery.customerId === this.id);
      // function(delivery) {
      //   return delivery.customerId === this.id;
      // }.bind(this) //ES5
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
      meal => meal.id === this.mealId);
      // function(meal) {
      //   return meal.id === this.mealId;
      // }.bind(this) //ES5
  };

  customer() {
    return store.customers.find(
      customer => customer.id === this.customerId);
      // function(customer) {
      //   return customer.id === this.customerId;
      // }.bind(this) //ES5
  };

  neighborhood() {
    return store.neighborhoods.find(
      neighborhood => neighborhood.id === this.neighborhoodId);
      // function(neighborhood) {
      //   return neighborhood.id === this.neighborhoodId;
      // }.bind(this) //ES5
  };
};
