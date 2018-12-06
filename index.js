// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodIdCounter = 0;
let customerIdCounter = 0;
let mealIdCounter = 0;
let deliveryIdCount = 0;

class Neighborhood {
  
  constructor (name) {
    this.name = name;
    this.id = ++neighborhoodIdCounter;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id;
      }.bind(this)
    );
  }

  customers() {
    return store.customers.filter (
      function(customer) {
        return customer.neighborhoodId === this.id;
      }.bind(this)
    );
  }

  meals() {
    return this.deliveries().map(d => d.meal()).filter( (v, i, a) => a.indexOf(v) === i);
  }

}

class Customer {

  constructor (name, neighborhood) {
    this.id = ++customerIdCounter;
    this.name = name;
    this.neighborhoodId = neighborhood;
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
    return this.deliveries().map( delivery => delivery.meal() );
  }

  totalSpent() {
    return this.deliveries().reduce(function(sum, cur, i, arr) {
      return sum += cur.meal().price;
    }, 0);
  }
}

class Meal {

  constructor (title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealIdCounter;
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
    return this.deliveries().map(d => d.customer());
  }

  static byPrice() {
    return store.meals.sort(function(a, b) {
        return b.price - a.price;
      }
    );
  }
      

}

class Delivery {

  constructor (mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryIdCount;
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

  
