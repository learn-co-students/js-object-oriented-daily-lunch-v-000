// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };


let neighborhoodId = 0;

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;

    store.neighborhoods.push(this);
  }

// has_many deliveries
  deliveries() {
    return store.deliveries.filter( delivery => {
      return delivery.neighborhoodId === this.id;
    })
  }

// has_many customers through deliveries
  customers() {
    return store.customers.filter( customer => {
      return customer.neighborhoodId === this.id;
    })
  }

// has_many meals through deliveries
  meals() {
    const mappedMeals = this.customers().map(customer => customer.meals());
      const merged = [].concat.apply([], mappedMeals);
      return [...new Set(merged)];
  }
}


let customerId = 0;

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerId;

    store.customers.push(this);
  }

// has_many deliveries
  deliveries() {
    return store.deliveries.filter( delivery => {
      return delivery.customerId === this.id;
    })
  }

// has_many meals through deliveries
  meals() {
    return this.deliveries().map( delivery => {
      return delivery.meal();
    })
  }

  totalSpent() {
    return this.meals().reduce((accumulator, currValue) => accumulator + currValue.price, 0);
  }
}


let deliveryId = 0;

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryId;

    store.deliveries.push(this);
  }

// belongs_to meal
  meal() {
    return store.meals.find( meal => {
      return meal.id === this.mealId;
    })
  }

// belongs_to customer
  customer() {
    return store.customers.find( customer => {
      return customer.id === this.customerId;
    })
  }

// belongs_to neighborhood
  neighborhood() {
    return store.neighborhoods.find( neighborhood => {
      return neighborhood.id === this.neighborhoodId;
    })
  }
}

let mealId = 0;

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;

    store.meals.push(this);
  }

// has_many deliveries
  deliveries() {
    return store.deliveries.filter( delivery => {
      return delivery.mealId === this.id;
    })
  }

// has_many customers through deliveries
  customers() {
    return this.deliveries().map( delivery => {
      return delivery.customer();
    })
  }

  static byPrice() {
    return store.meals.sort((a, b) => b.price - a.price);
  }
}
