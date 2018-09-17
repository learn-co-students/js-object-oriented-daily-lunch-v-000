// Global Datastore
let store = {
  neighborhoods: [],
  meals: [],
  customers: [],
  deliveries: []
};

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

function unique(value, index, self) {
  return self.indexOf(value) === index;
}

// A neighborhood has many deliveries
class Neighborhood {
  constructor(name) { // initialized with name
    // Returns an object that has attributes of id and name
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this);
  }

  deliveries() {
    // returns a list of all deliveries placed in a neighborhood
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id;
      }.bind(this)
    );
  }

  customers() {
    // returns all of the customers that live in a particular neighborhood
    return this.deliveries().map(
      function(delivery) {
        return delivery.customer();
      }
    ).filter(unique);
  }

  meals() {
    // returns a unique list of meals that have been ordered in a particular
    // neighborhood (you might want to do this one last)
    return this.deliveries().map(
      function(delivery) {
        return delivery.meal();
      }
    ).filter(unique);
  }
}

// A meal has many customers
class Meal {
  constructor(title, price) { // initialized with title and price
    // Returns an object that has attributes of title, price, and id. Meal Ids
    // should automatically increment
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries() {
    // returns all of the deliveries associated with a particular meal
    return store.deliveries.filter(
      function(delivery) {
        return delivery.mealId === this.id;
      }.bind(this)
    );
  }

  customers() {
    // Returns all of the customers who have had the meal delivered
    return this.deliveries().map(
      function(delivery) {
        return delivery.customer();
      }
    // Be careful not to return the same customer twice if they have ordered
    // this meal multiple times.
  );
  }
  // A class method that orders all meal instances by their price in
  // descending order.
  static byPrice() { // Use the static keyword to write a class method.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    return store.meals.sort(function(a,b) {
      return a.price - b.price;
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
    }).reverse();
  }
}
// A customer belongs to a neighborhood
class Customer {
  // initialized with a name and a neighborhoodId
  constructor(name, neighborhoodId) {
    // Returns an object that has attributes of id, neighborhoodId, and name.
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }
  // A customer has many deliveries
  deliveries() {
    // returns all of the deliveries that customer has received
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.id;
      }.bind(this)
    );
  }
  // A customer has many meals through deliveries
  meals() {
    // returns all meals that a customer has ordered
    return this.deliveries().map(
      function(delivery) {
        return delivery.meal();
      }
    );
  }

  totalSpent() {
    // https://stackoverflow.com/questions/5732043/javascript-reduce-on-array-of-objects
    const total = this.meals().reduce(function(acc, cur) {
      return { price: acc.price + cur.price };
    });
    // returns the total amount that the customer has spent on food
    return total.price;
  }
}
// A delivery belongs to a meal, belongs to a customer, and belongs to a
// neighborhood
class Delivery {
  // initialized with mealId, neighborhoodId, and customerId
  constructor(mealId, neighborhoodId, customerId) {
    // Returns an object that has attributes of mealId, neighborhoodId,
    // customerId, and id
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }

  meal() {
    // returns the meal associated with a particular delivery
    return store.meals.find(
      function(meal) {
        return meal.id === this.mealId;
      }.bind(this)
    );
  }

  customer() {
    // returns the customer associated with a particular delivery
    return store.customers.find(
      function(customer) {
        return customer.id === this.customerId;
      }.bind(this)
    );
  }

  neighborhood() {
    // returns the neighborhood associated with a particular delivery
    return store.neighborhoods.find(
      function(neighborhood) {
        return neighborhood.id === this.neighborhoodId;
      }.bind(this)
    );
  }
}
