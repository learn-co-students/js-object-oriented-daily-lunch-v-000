// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

////////////////////////
// Neighborhood Class //
////////////////////////
class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId
    this.name = name

    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id;
      }.bind(this)
    )
  }

  customers() {
    return store.customers.filter(
      function(customer) {
        return customer.neighborhoodId === this.id
      }.bind(this)
    );
  }

  meals() {
    const meals = new Set();
    const uniqueMeals = this.deliveries().filter(delivery => {
        if (meals.has(delivery.mealId)) {
          return false;
        } else {
        meals.add(delivery.mealId);
        return true;
      }
    });
    return uniqueMeals;
  }

} // end Neighborhood

////////////////
// Meal Class //
////////////////
class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price

    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.mealId === this.id
      }.bind(this)
    )
  }

  customers() {
    return this.deliveries().map( delivery =>
      { return delivery.customer(); }
    )
  }

  static compare(meal1, meal2) {
    return meal2.price - meal1.price
  }

  static byPrice() {
    return store.meals.sort(this.compare.bind(this));
  }

} // end Meal



////////////////////
// Customer Class //
////////////////////
class Customer {
  constructor(name, neighborhoodid) {
    this.id = ++customerId
    this.name = name
    this.neighborhoodId = neighborhoodid

    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.id
      }.bind(this)
    );
  }

  meals() {
    return this.deliveries().map( delivery =>
      { return delivery.meal() }
    );
  }

  totalSpent() {
    let totalCost = 0;
    this.meals().forEach(function(meal) {
      totalCost += meal.price
    });

    return totalCost;
  }

} // end Customer


////////////////////
// Delivery Class //
////////////////////
class Delivery {
  constructor(mealid, neighborhoodid, customerid) {
    this.id = ++deliveryId
    this.mealId = mealid
    this.neighborhoodId = neighborhoodid
    this.customerId = customerid

    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(
      function(meal) {
        return meal.id === this.mealId
      }.bind(this)
    )
  }

  customer() {
    return store.customers.find(
      function(customer) {
        return customer.id === this.customerId
      }.bind(this)
    )
  }

  neighborhood() {
    return store.neighborhoods.find(
      function(neighborhood) {
        return neighborhood.id === this.neighborhoodId
      }.bind(this)
    )
  }

} // end Delivery
