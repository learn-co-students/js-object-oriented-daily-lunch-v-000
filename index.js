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
let mealId = 0;
let neighborhoodId = 0;
let customerId = 0;
let deliveryId = 0;

//---------------------------------------Meal Class--------------------------------------------//


class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    });
  }

  customers(){
    let customers = this.deliveries().map(delivery => {
      return delivery.customer();
    });
    return customers.filter(function(customer, index, customers){
      return customers.indexOf(customer) === index;
    });
  }

  static byPrice() {
    return store.meals.sort(function (meal1, meal2){
      return meal2.price > meal1.price
    });
  }
}

//----------------------------------------Delivery Class-------------------------------------------//


class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;

    store.deliveries.push(this);
  }

  customer(){
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
  }

  meal(){
    return store.meals.find(meal =>{
      return meal.id === this.mealId;
    });
  }

  neighborhood(){
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId;
    });
  }
}

//-----------------------------------------Customer Class------------------------------------------//


class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;

    store.customers.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  }

  meals(){
    return this.deliveries().map(delivery => {
      return delivery.meal();
    });
  }

  totalSpent(){
    return this.meals().reduce(function (accumulator, meal){
      return accumulator + meal.price;
    }, 0);
  }
}

//-------------------------------------------Neighborhood Class----------------------------------------//


class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;

    store.neighborhoods.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id;
    });
  }

  customers(){
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id;
    });
  }

  meals(){
    let meals = this.deliveries().map(delivery => {
      return delivery.meal()
    });
    return meals.filter(function(meal, index, meals) {
      return meals.indexOf(meal) === index;
    });
  }
}
