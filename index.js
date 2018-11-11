// global datastore
// A meal has many customers
// A delivery belongs to a meal, belongs to a customer, and belongs to a neighborhood
// A customer has many deliveries
// A customer has many meals through deliveries
// A customer belongs to a neighborhood
// A neighborhood has many deliveries
// A neighborhood has many customers through deliveries
// A neighborhood has many meals through deliveries
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }

   deliveries() {
    return store.deliveries.filter (
      function(delivery) {
        return delivery.neighborhoodId === this.id;
      }.bind(this)
    );
  }
   customers() {
    return store.customers.filter(
      function(customer) {
        return customer.neighborhoodId === this.id;
      }.bind(this)
    );
  }
   meals() {
    let orderedMeals = this.deliveries().map(function(delivery) {
      return delivery.meal();
    });
      return orderedMeals.filter(function(value, index, currentMeal) {
      return currentMeal.indexOf(value) === index;
    });
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
        return delivery.customerId === this.id;
      }.bind(this)
    );
  }
   meals() {
    return this.deliveries().map(function(delivery) {
      return delivery.meal();
    });
  }
   totalSpent() {
    return this.meals().reduce(function (total, currentMeal) {
      return currentMeal.price + total;
    }, 0);
  }
}

 class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = mealId++;
    store.meals.push(this);
  }
   deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.mealId === this.id;
      }.bind(this)
    );
  }
   customers() {
    return this.deliveries().map(
      function(delivery) {
        return delivery.customer();
      }
    );
  }
   static byPrice() {
    return store.meals.sort(function(mealOne, mealTwo){
      return mealTwo.price - mealOne.price;
    });
  }
}
 class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }
   meal() {
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
