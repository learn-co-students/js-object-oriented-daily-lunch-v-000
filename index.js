// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodIds = 0;
let customerIds = 0;
let mealIds = 0;
let deliveryIds = 0;

class Neighborhood {
  constructor(name) {
    this.id = neighborhoodIds++;
    this.name = name;
    store.neighborhoods.push(this);
  }
  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.neighborhoodId === this.id;
    }.bind(this));
  }
  customers() {
    return store.customers.filter(function(customer) {
      return customer.neighborhoodId === this.id;
    }.bind(this));
  }
  meals() {
    let set = new Set();
    this.deliveries().map(delivery => {
      set.add(delivery.meal());
    });
    let array = [...set]
    return array;
    }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = customerIds++;
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  }
  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    });
  }
  totalSpent() {
    return this.meals().reduce(function(total, meal) {
      return total += meal.price;
    }.bind(this) , 0);
  }
}

class Meal {
  constructor(title, price) {
    this.id = mealIds++;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    });
  }
  customers() {
    let set = new Set();
    this.deliveries().map(delivery => {
      set.add(delivery.customer());
    });
    let array = [...set]
    return array;
    }
  static byPrice() {
      return store.meals.sort(function(a, b) {
        return b.price - a.price;
      });
    }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = deliveryIds++;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }
  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
  }
  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
  }
  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId;
    });
  }
}
