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
    /*
    return this.trips().map(
      function(trip) {
        return trip.passenger();
      }.bind(this)
    );
    */
  }
}


class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.id = ++customerdId;
    this.neighborhoodId = neighborhoodId;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId == this.id;
      }.bind(this)
    );
  }

  meals() {
    return store.meals.filter(
      function(meal) {
        return meal.customerId == this.id;
      }.bind(this)
    );
  }

  totalSpent() {
    //returns the total amount that the customer has spent on food.
  }
}


class Meal {
  constructor(title, price) {
    this.title = title;
    this.id = ++mealdId;
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
  }

  static byPrice() {
    //A class method that orders all meal instances by their price in descending order.
  }

}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.id = ++deliveryId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.meals.push(this);
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

/*
A meal has many customers
A delivery belongs to a meal, belongs to a customer, and belongs to a neighborhood
A customer has many deliveries
A customer has many meals through deliveries
A customer belongs to a neighborhood
A neighborhood has many deliveries
A neighborhood has many customers through deliveries
A neighborhood has many meals through deliveries
*/
