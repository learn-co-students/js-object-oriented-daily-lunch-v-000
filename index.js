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

  //returns a unique list of meals that have been ordered in a particular neighborhood (you might want to do this one last)
  meals() {

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
      return this.id == delivery.customerId;
    });
  }
  //returns all meals that a customer has ordered
  meals() {
    // return store.meals.filter(meal => {
    //   return this.id == meal.customerId;
    // });
  }

  // //returns the total amount that the customer has spent on food
  // totalSpent() {

  // }
}

//has many customers
class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = mealId ++;
    store.meals.push(this);
  }

  // returns all of the deliveries associated with a particular meal.
  deliveries() {
    return store.deliveries.filter(delivery => {
      return this.id == delivery.mealId;
    });
  }

  // - returns all of the customers who have had the meal delivered. Be careful not to return the same customer twice if they have ordered this meal multiple times.
  customers() {
    let customerIds = [];
    let deliveries = this.deliveries;
    deliveries.forEach(delivery => {
      customerIds.push()
    });
  }

  // // A class method that orders all meal instances by their price in descending order. Use the static keyword to write a class method.
  // byPrice() {

  // }
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

  // returns the meal instance associated with a particular delivery; delivery belongs to a meal
  //
  meal() {
    // let m = store.meals.find(meal => {
    //   return meal.id == this.id;
    // });
    // // debugger;
    // return Object.assign({}, m);
  }

  // returns the customer associated with a particular delivery
  customer() {
    // return store.customers.find(customer => {
    //   this.customerId === customer.id;
    // });
  }

  // - returns the neighborhood associated with a particular delivery
  neighborhood() {

  }
}