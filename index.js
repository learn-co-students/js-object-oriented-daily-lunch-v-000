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
  }

  deliveries() {
    //returns a list of all deliveries placed in a neighborhood
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId == this.id;
      }.bind(this)
    );
  }
  customers() {
    //returns all of the customers that live in a particular neighborhood
    return store.customers.filter(
      function(customer) {
        return customer.neighborhoodId == this.id;
      }.bind(this)
    );
  }

  meals() {
    //returns a unique list of meals that have been ordered in a particular
    //neighborhood (you might want to do this one last)
    const allMeals = this.customers().map(customer => customer.meals());
    const merged = [].concat.apply([], allMeals);
    return [...new Set(merged)];
  }
}


class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.id = ++customerId;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId == this.id;
      }.bind(this)
    );
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }

  totalSpent() {
    //returns the total amount that the customer has spent on food.
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
  }
}


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
        return delivery.mealId == this.id;
      }.bind(this)
    );
  }

  customers() {
    //returns all of the customers who have had the meal delivered.
    //Be careful not to return the same customer twice if they have
    //ordered this meal multiple times.
    const allCustomers = this.deliveries().map(delivery => delivery.customer());
    return [...new Set(allCustomers)];
  }

  static byPrice() {
    //A class method that orders all meal instances by their price in descending order.

    return store.meals.slice().sort(function(meal1, meal2) {
      return meal2.price - meal1.price;
    });
  }

}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.id = ++deliveryId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }

  meal() {
    //returns the meal associated with a particular delivery
    return store.meals.find(
      function(meal) {
        return meal.id === this.mealId;
      }.bind(this)
    );
  }

  customer() {
    return store.customers.find(
      function(customer) {
        return customer.id === this.customerId;
      }.bind(this)
    );
  }

  neighborhood() {
    return store.neighborhoods.find(
      function(neighborhood) {
        return neighborhood.id === this.neighborhoodId;
      }.bind(this)
    );
  }
}
