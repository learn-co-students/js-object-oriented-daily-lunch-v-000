// global datastore
let store = {meals: [], customers: [], deliveries: [], neighborhoods: []}

let mealId = 0;
let customerId = 0;
let deliveryId = 0;
let neighborhoodId = 0;

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price; 
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {return delivery.mealId === this.id})
  }

  customers() {
    return this.deliveries().map(delivery => {return delivery.customer()})
  }

  static byPrice() {
    return store.meals.sort(function(a, b) {
      return b.price - a.price
    })
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {return delivery.customerId === this.id})
  }

  meals() {
    return this.deliveries().map(delivery => {return delivery.meal()})
  }

  totalSpent() {
    return this.meals().reduce((sum, meal) => {
      return sum + meal.price
    }, 0);
  }
}

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {return delivery.neighborhoodId === this.id})
  }

  customers() {
    return store.customers.filter(customer => {return customer.neighborhoodId === this.id})
  }


  everyMeal() {
    return this.deliveries().map(delivery => {return delivery.meal()})
  }
  meals() {
    return [...new Set(this.everyMeal())]
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }

  customer() {
    return store.customers.find(customer => {return customer.id === this.customerId})
  }

  meal() {
    return store.meals.find(meal => {return meal.id === this.mealId})
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => {return neighborhood.id === this.neighborhoodId})
  }
}