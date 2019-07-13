// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;

let mealId = 0;

let customerId = 0;

let deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.id = ++ neighborhoodId;
    this.name = name;

    store.neighborhoods.push(this);
  }

  deliveries() {

  }

  customers(){
    return store.customers.filter(
      function(customer) {
        return customer.neighborhoodID === this.id;
      }.bind(this)
    );
  }

  meals(){

  }
}

class Customer {
  constructor(name, neighborhood) {
    this.id = ++customerId;
    this.name = name;
    if (neighborhood) {
      this.neighborhoodId = neighborhood;
    }

    store.customers.push(this);
    //do something with neighborhoodId
  }

  setNeighborhood(neighborhood) {
    this.neighborhoodId = neighborhood;
  }

  neighborhood() {
    return store.neighborhoods.find(
      function(neighborhood) {
        return neighborhood === this.neighborhoodId;
      }.bind(this)
    );
  }

  deliveries(){

  }
  meals(){

  }
  totalSpent(){

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

  }
  customers(){

  }

  byPrice(){

  }
}

class Delivery {
  constructor(meal, neighborhood, customer) {
    this.id = ++deliveryId;
    if (meal) {
      this.mealId = meal;
    }
    if (neighborhood) {
      this.neighborhoodId = neighborhood;
    }
    if (customer) {
      this.customerId = customer;
    }
    store.deliveries.push(this);
  }
  setMeal(meal) {
    this.mealId = meal;
  }

  meal() {
    return store.meals.find(
      function(meal) {
        return meal === this.mealId;
      }.bind(this)
    );
  }
  setNeighborhood(neighborhood) {
    this.neighborhoodId = neighborhood;
  }

  neighborhood() {
    return store.neighborhoods.find(
      function(neighborhood) {
        return neighborhood === this.neighborhoodId;
      }.bind(this)
    );
  }
  setCustomer(customer) {
    this.custeromId = customer;
  }

  customer() {
    return store.customers.find(
      function(customer) {
        return customer === this.customerId;
      }.bind(this)
    );
  }

}
