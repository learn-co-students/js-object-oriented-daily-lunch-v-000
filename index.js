// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this);
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id;
    })
  }
  customers() {
    const uniqueCustomers = [...new Set(store.deliveries.map(delivery => {
      return delivery.customer();
    }))];
    return uniqueCustomers;
  }
  meals(){
    const uniqueMeals = [...new Set(this.deliveries().map(delivery => {
      return delivery.meal();
    }))];
    return uniqueMeals;
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
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    })
  }
  customers() {
    const uniqueCustomers =  [...new Set(store.deliveries.map(delivery => {
      return delivery.customer();
    }))];
    return uniqueCustomers;
  }
  static byPrice() {
    return store.meals.sort(function(a, b){return b.price - a.price;})
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
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    })
  }
  meals() {
      return this.deliveries().map(delivery => delivery.meal());
    }
  totalSpent() {
    return this.meals().reduce((agg, currentMeal) => (agg + currentMeal.price), 0);
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.customerId = customerId;
    this.neighborhoodId = neighborhoodId;
    store.deliveries.push(this);
  }
  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    })
  }
  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId;
    })
  }
  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    })
  }
}
