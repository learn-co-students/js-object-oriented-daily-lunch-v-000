// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

class Neighborhood {

  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this);
  }

  neighborhoodFilter(array) {
    return array.filter(obj => obj.neighborhoodId === this.id);
  }

  deliveries() {
    return this.neighborhoodFilter(store.deliveries)
  }

  customers() {
    return this.neighborhoodFilter(store.customers)
  }

  meals() {
    return [...new Set(this.deliveries().map(d => d.meal()))]
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
    return store.deliveries.filter(obj => obj.customerId === this.id)
  }

  meals() {
    return this.deliveries().map(d => d.meal())
  }

  totalSpent() {
    return this.meals().reduce((total, meal) => {
      return total += meal.price;
    }, 0)
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
    return store.deliveries.filter(obj => obj.mealId === this.id)
  }

  customers() {
    return this.deliveries().map(d => d.customer())
  }

  static byPrice() {
    return store.meals.sort((a, b) => b.price - a.price)
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
    return store.customers.find(obj => obj.id === this.customerId)
  }

  meal() {
    return store.meals.find(obj => obj.id === this.mealId)
  }

  neighborhood() {
    return store.neighborhoods.find(obj => obj.id === this.neighborhoodId)
  }

}
