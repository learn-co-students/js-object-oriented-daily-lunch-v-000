// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;

class Neighborhood {
  constructor(name){
    this.id = neighborhoodId++;
    this.name = name;

    store.neighborhoods.push(this);
  }

  deliveries(){
    return store.deliveries.filter(
      function (delivery) {
        return delivery.neighborhoodId === this.id;
        // bind is used because lexical scope of inner function would otherwise return: Cannot read property '...' of undefined
      }.bind(this));
  }

  customers(){
    return store.customers.filter(
      function (customer) {
        return customer.neighborhoodId === this.id;
      }.bind(this));
  }

  meals(){
    // might want to use Set
  }
}

let customerId = 0;

class Customer {
  constructor(neighborhoodId, name){
    this.id = customerId++;
    this.neighborhoodId = neighborhoodId;
    this.name = name;

    store.customers.push(this);
  }

  deliveries(){
    return store.deliveries.filter(
      function (delivery) {
        return delivery.customerId === this.id;
      }.bind(this));
  }

  meals(){
    return this.deliveries().map(function (delivery) {
      return delivery.meal();
    }.bind(this));
  }

  totalSpent(){
  }
}

let mealId = 0;

class Meal {
  constructor(title, price){
    this.id = mealId++;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter(
      function (delivery) {
        return delivery.mealId === this.id;
      }.bind(this));
  }

  customers(){
    return this.deliveries().map(function (delivery) {
      return delivery.customer();
    }.bind(this));
  }

  static byPrice(){
  }
}

let deliveryId = 0;

class Delivery{
  constructor(){
    this.id = deliveryId++;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;

    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find(
      function (meal) {
        return this.mealId === meal.id;
      }.bind(this));
  }

  customer(){
    return store.customers.find(
      function (customer) {
        return this.customerId === customer.id;
      }.bind(this));
  }

  neighborhood(){
    return store.neighborhoods.find(
      function (neighborhood) {
        return this.neighborhoodId === neighborhood.id;
      }.bind(this));
  }
}
