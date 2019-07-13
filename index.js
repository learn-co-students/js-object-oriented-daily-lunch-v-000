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
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id;
      }.bind(this)
    )
  }


  customers(){
    return store.customers.filter(
      function(customer) {
        return customer.neighborhoodId === this.id;
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
    return store.neighborhoods.filter(
      function(neighborhood) {
        return neighborhood.customerId === this.id;
      }.bind(this)
    );
  }

  deliveries(){
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.id;
      }.bind(this)
    );
  }
  meals(){
    return this.deliveries().map(delivery => {
      return delivery.meal();
    })
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
    return store.deliveries.filter(
      function(delivery) {
        return delivery.mealId === this.id;
      }.bind(this)
    );
  }

  customers(){
    return this.deliveries().map(delivery => {
      return delivery.customer();
    })
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
    return store.meals.find(meal => meal.id === this.mealId);
  }

  setCustomer(customer) {
    this.customerId = customer;
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId);

  }
  setNeighborhood(neighborhood) {
    this.neighborhoodId = neighborhood;
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
  }
}
