// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor (name) {
    this.name = name;

    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  };

  deliveries () {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
  };

  customers () {
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  };

  meals () {
    const meals = this.deliveries().map(delivery => delivery.meal());
    return [...new Set(meals)];
  };
}

class Customer {
  constructor (name, neighborhoodId) {
    this.name = name;
    this.neighborhoodId = neighborhoodId;

    this.id = ++customerId;
    store.customers.push(this);
  };

  deliveries () {
    return store.deliveries.filter(delivery => delivery.customerId === this.id);
  };

  meals () {
    return store.deliveries.filter(delivery => delivery.customerId === this.id).map(delivery => delivery.meal());
  };

  totalSpent () {
    let total = 0;
    const sumPrice = this.meals().map(meal => total += meal.price);
    return total;
  }
}

class Meal {
  constructor (title, price) {
    this.title = title;
    this.price = price;

    this.id = ++mealId;
    store.meals.push(this);

  };

  deliveries () {
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  };

  customers () {
    return this.deliveries().map(delivery => delivery.customer());
  };

  static byPrice () {
    return store.meals.sort((a, b) => b.price - a.price);
  }
}

class Delivery {
  constructor (mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;

    this.id = ++deliveryId;
    store.deliveries.push(this);
  };

  meal () {
    return store.meals.find(meal => meal.id === this.mealId);
  };

  customer () {
    return store.customers.find(customer => this.customerId === customer.id);
  };

  neighborhood () {
    return store.neighborhoods.find(neighborhood => this.neighborhoodId === neighborhood.id);
  };
}

function log (results) {
  console.log(results);
};

// Neighborhood class:
// new Neighborhood() - initialized with name. It returns an object that has attributes of id and name
// deliveries() - returns a list of all deliveries placed in a neighborhood
// customers() - returns all of the customers that live in a particular neighborhood
// meals() - returns a unique list of meals that have been ordered in a particular neighborhood (you might want to do this one last)

// Customer class:
// new Customer() — should expect to be initialized with a name and a neighborhoodId. It returns an object that has attributes of id, neighborhoodId, and name.
// deliveries() — returns all of the deliveries that customer has received
// meals() - returns all meals that a customer has ordered
// totalSpent() - returns the total amount that the customer has spent on food.

// Meal class:
// new Meal() — initialized with title and price. It returns an object that has attributes of title, price, and id. Meal Ids should automatically increment.
// deliveries() - returns all of the deliveries associated with a particular meal.
// customers() - returns all of the customers who have had the meal delivered. Be careful not to return the same customer twice if they have ordered this meal multiple times.
// byPrice() - A class method that orders all meal instances by their price in descending order. Use the static keyword to write a class method.

// Delivery class:
// new Delivery() — initialized with mealId, neighborhoodId, and customerId. It returns an object that has attributes of mealId, neighborhoodId, customerId, and id
// meal() - returns the meal associated with a particular delivery
// customer() - returns the customer associated with a particular delivery
// neighborhood() - returns the neighborhood associated with a particular delivery
