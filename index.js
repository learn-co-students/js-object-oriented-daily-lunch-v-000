// global datastore
// A meal has many customers
// A delivery belongs to a meal, belongs to a customer, and belongs to a neighborhood
// A customer has many deliveries
// A customer has many meals through deliveries
// A customer belongs to a neighborhood
// A neighborhood has many deliveries
// A neighborhood has many customers through deliveries
// A neighborhood has many meals through deliveries

let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] },
    neighborhoodId = 0,
    customerId = 0,
    mealId = 0,
    deliveryId = 0;

function getDeliveries(idValue) {
  return store.deliveries.filter(item => this.id === item[idValue])
}

function getCustomersOrMeals(values, idValue, uniqueness) {
  let ids = this.deliveries().map(delivery => delivery[idValue]);
  ids = uniqueness ? [...new Set(ids)] : ids;
  return ids.map(id => store[values].find(value => id === value.id));
}

function getItem(items, idValue) {
  return store[items].find(meal => this[idValue] = meal.id);
}

function addToStore(item) {
  store[item].push(this);
}

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;

    addToStore.call(this, 'neighborhoods')
  }

  deliveries() {
    return getDeliveries.call(this, 'neighborhoodId');
  }

  customers() {
    return getCustomersOrMeals.call(this, 'customers', 'customerId', true)
  }

  meals() {
    return getCustomersOrMeals.call(this, 'meals', 'mealId', true);
  }

}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;

    addToStore.call(this, 'customers');
  }

  deliveries() {
    return getDeliveries.call(this, 'customerId');
  }

  meals() {
    return getCustomersOrMeals.call(this, 'meals', 'mealId', false);
  }

  totalSpent() {
    return this.meals().reduce((sum, meal, i) => sum += meal.price, 0)
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    addToStore.call(this, 'meals');
  }

  deliveries() {
    return getDeliveries.call(this, 'mealId');
  }

  customers() {
    return getCustomersOrMeals.call(this, 'customers', 'customerId', true);
  }

  static byPrice() {
    return store.meals.sort((a, b) => b.price - a.price);
  }

}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;

    addToStore.call(this, 'deliveries');
  }

  meal() {
    return getItem.call(this, 'meals', 'mealId');
  }

  customer() {
    return getItem.call(this, 'customers', 'customerId');
  }

  neighborhood() {
    return getItem.call(this, 'neighborhoods', 'neighborhoodId');
  }
}
