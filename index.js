// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name){
    this.id = neighborhoodId++;
    this.name = name;
    store.neighborhoods.push(this);
  }
  // has many deliveries
  // returns list of all deliveries placed in a neighborhood
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id;
    });
  }
  // has many customers through deliveries
  // returns list of all customers that live in a particular neighborhood
  customers() {
    return store.customers.filter(customer => {
       return customer.neighborhoodId === this.id;
    });
  }
  // has many meals through deliveries
  // returns unique list of meals that have been ordered in a particular neighborhood
  meals() {
    const allMeals = this.customers().map(customer => customer.meals());
    const merged = [].concat.apply([], allMeals);
    return [...new Set(merged)];
  }

}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = customerId++;
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }
  // returns all meals a customer has ordered
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  }
  // returns all the meals a customer has ordered
  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }
  // returns the total amount that the customer has spent on food
  totalSpent() {
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
  }
}

class Meal {
  constructor(title, price) {
    this.id = mealId++;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }
  // returns all the deliveries associated with a given meal
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    });
  }
  // returns a unique list of customers who have ordered this meal
  customers() {
    const allCustomers = this.deliveries().map(delivery => delivery.customer());
    return [...new Set(allCustomers)];
  }
  // a class method that orders all meals instances by their price in descending order
  static byPrice() {
    return store.meals.sort((a,b) => b.price - a.price);
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = deliveryId++;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }
  // returns the meal instance associated with a particular delivery
  // delivery belongs to a meal
  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
  }
  // returns the customer instance associated with a particulary delivery
  // delivery belongs to a customer
  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
  }
  // returns the neighborhood in which a delivery was placed
  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId;
    });
  }
}
