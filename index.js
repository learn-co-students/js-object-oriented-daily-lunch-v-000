// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let deliveryId = 0;

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId;
    });
  }
}
// Delivery class:
// A delivery belongs to a meal, belongs to a customer, and belongs to a neighborhood
// new Delivery() — initialized with mealId, neighborhoodId, and customerId
// and returns a delivery object w/ mealId, neighborhoodId, customerId, and id attributes
// .meal() method called on delivery object; returns the meal object that the delivery object belongs to
// .customer() method called on delivery object; returns the customer object that the delivery object belongs to
// .neighborhood() method called on delivery object; returns the neighborhood object that the delivery object belongs to
let neighborhoodId = 0;

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id;
    });
  }

  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id;
    });
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    })
    .filter(function (element, index, array) {
      return array.indexOf(element) === index;
    });
  }
}
// Neighborhood class:
// new Neighborhood() - initialized with name; returns object that has id & name attributes
// A neighborhood has many deliveries
// The .deliveries() method called on neighborhood object
// returns an array of all deliveries placed in a neighborhood, i.e.,
// an array of all delivery objects belonging to neighborhood object (this)
// A neighborhood has many customers through deliveries
// The .customers() method called on neighborhood object
// returns an array of all customers that live in a particular neighborhood
// A neighborhood has many meals through deliveries
// The .meals() method called on neighborhood object
// returns a unique list of meals that have been ordered in a particular neighborhood
let customerId = 0;

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    });
  }

  totalSpent() {
    return this.meals().reduce(function (aggregate, element, index, array) {
      return aggregate + element.price;
    }, 0);
  }
}
// Customer class:
// new Customer() — should expect to be initialized with a name and a neighborhoodId
// and returns a customer object w/ id, neighborhoodId, and name attributes
// A customer has many deliveries
// .deliveries() method called on customer object returns array of delivery objects that belong to the customer object
// A customer has many meals through deliveries
// .meals() method called on customer object returns array of meals that a customer has ordered
// method totalSpent() called on customer object returns the total amount that the customer has spent on food.
// A customer belongs to a neighborhood

let mealId = 0;

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    });
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    });
  }

  static byPrice() {
    return store.meals.sort(function (mealOne, mealTwo) {
      return mealTwo.price - mealOne.price;
    });
  }
  // static byPrice() {
  //  return store.meals.sort((meal1, meal2) => {
  //    return meal1.price < meal2.price;
  //  })
  // }
}
// A meal has many deliveries, and a delivery belongs to a meal
// .deliveries() method called on meal object returns array of delivery objects belonging to meal object
// A meal has many customers through deliveries
// new Meal() - Meal object is created w/ a title, price, id and added to store object
// and returns meal object w/ title, price (number) and id attributes
