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
    let cust = this.deliveries().map(function (delivery) {
      return store.customers.find(function (customer) {
        return customer.id === delivery.customerId;
      })
    })
    return cust.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
  }

  meals() {
    let m = this.deliveries().map(function (delivery) {
      return store.meals.find(function (meal) {
        return meal.id === delivery.mealId;
      })
    })
    return m.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
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
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    })
  }
  meals() {
    return this.deliveries().map(function (delivery) {
      return store.meals.find(function (meal) {
        return meal.id === delivery.mealId;
      })
    })
  }
  totalSpent(){
    return this.meals().reduce(function (total, currentValue) {
      return total + currentValue.price;
    }, 0);
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
    let del = this.deliveries().map(function (delivery) {
      return store.customers.find(function (customer) {
        return customer.id === delivery.customerId;
      })
    })
    return del.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
  }

  static byPrice() {
      return store.meals.sort(function (a, b) {
      return b.price - a.price;
    });
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
  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    })
  }
  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    })
  }
  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId;
    })
  }
}
