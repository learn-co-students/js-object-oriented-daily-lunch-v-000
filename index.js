let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

class Neighborhood {
  constructor (name) {
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }
  deliveries () {
    return store.deliveries.filter(function (delivery) {
      return this.id === delivery.neighborhoodId
    }.bind(this))
  }
  customers () {
    return store.customers.filter(function (customer) {
      return this.id === customer.neighborhoodId
    }.bind(this))
  }
  meals() {
  const allMeals = this.customers().map(customer => customer.meals());
  const merged = [].concat.apply([], allMeals);
  return [...new Set(merged)];
}
}

class Customer {
  constructor (name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId
    store.customers.push(this)
  }
  deliveries () {
    return store.deliveries.filter(function (delivery) {
      return this.id === delivery.customerId
    }.bind(this))
  }
  meals () {
    return this.deliveries().map(delivery => delivery.meal())
  }
  totalSpent() {
  return this.meals().reduce((total, meal) => (total += meal.price), 0);
}
}

class Meal {
  constructor (title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  }
  customers() {
  const allCustomers = this.deliveries().map(delivery => delivery.customer());
  return [...new Set(allCustomers)];
}

static byPrice() {
  return store.meals.sort((a, b) => a.price < b.price);
}
}

class Delivery {
  constructor (mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId
    store.deliveries.push(this)
  }
  meal () {
    return store.meals.find(function (meal) {
      return this.mealId === meal.id
    }.bind(this))
  }
  customer () {
    return store.customers.find(function (customer) {
      return this.customerId === customer.id
    }.bind(this))
  }
  neighborhood () {
    return store.neighborhoods.find(function (neighborhood) {
      return this.neighborhoodId === neighborhood.id
    }.bind(this))
  }
}
