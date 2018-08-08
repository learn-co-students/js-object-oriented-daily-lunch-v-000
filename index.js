// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood {
  // creates a new neighborhood with a name
  // initializes with a name
  // returns an object
  // has an id and a name
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }
  deliveries() {
    // returns all unique deliveries assocated with a particular neighborhood
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId
    })
  }
  customers() {
    // returns all customer instances associated with a particular neighborhood
    return store.customers.filter(customer => {
      return customer.name
      // debugger;
    })
  }
}

class Customer {
  // Creat a new customer with a name
  constructor(name, neighborhoodId) {
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = customerId++;
    store.customers.push(this);
  }
  deliveries() {
    // returns all deliveries a customer has place
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    })
  }
  meals() {
    // return all unique meals a customer has ordered
    // How can i find the meal that connects with a customer
    // Deliveries is the join table (it has the customerId and mealId),
    // I can use deliveries to find the meal connected to a customer
    // I'll iterate through the customers delivery array
    // How do I return the mealId for the customerId
    // I need to return the meal class
    return this.deliveries().map(delivery => {
        return delivery.meal();
    })
  }
}

class Meal {
  // initialized with a title and price
  // returns an object that has attributes of title, price, and id
  // Meal ids automatically increment
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }
  deliveries(){
    // return all deliveries associated with a given meal
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    })
  }
  customers(){
    // return a unique list of customers who have orded this meal
    // use deliveries to return the delivery and then grab the customer from the meal
    // I'm trying to add a method to the end of my return from iterating through deliveries
    return this.deliveries().map(delivery => {
      console.log(delivery.customer())
      return delivery.customer();
    })
  }
}

class Delivery {
  // Creates a new Delivery with a mealId
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.customerId = customerId;
    this.neighborhoodId = neighborhoodId;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }
  meal(){
    // orders all of the meals by price
    // returns the meal instance associated with a particular delivery
    // delivery belongs to a meal
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    })
  }
  customer(){
    // returns the customer instance associated with a particular delivery
    // delivery belongs to a customer
    return store.customers.find(customer => {
      // debugger;
      return customer.name;
    })
  }
  neighborhood(){
    // returns a unique list of meals ordered in a neighborhood
    // returns the neighborhood in which a delivery was placed
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.name;
    })
  }
}
