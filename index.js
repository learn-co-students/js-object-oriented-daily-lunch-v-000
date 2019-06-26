// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let customerId = 0;
// has_many Deliveries, has_many Meals thru Deliveries, belongs_to Neighborhood
class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }
  
  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return this.id === delivery.customerId;
    }.bind(this));
  }
  
  meals() {
    return this.deliveries().map(function(delivery) {
      return delivery.meal();
    });
  }
  
  totalSpent() {
    let mealTotals = [];
    this.meals().forEach(function(meal) {
      mealTotals.push(meal.price);
    });
    return mealTotals.reduce(function(acc, currentValue) {
      return acc + currentValue;
    });
  }
}

let mealId = 0;
// has_many Deliveries, has_many Customers thru Deliveries
class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }
  
  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return this.id === delivery.mealId;
    }.bind(this));
  }
  
  customers() {
    return this.deliveries().map(function(delivery) {
      return delivery.customer();
    });
  }
  
  static byPrice() {
    return store.meals.slice().sort(function(mealA,mealB) {
      return mealB.price - mealA.price;
    });
  }
}

let deliveryId = 0;
// belongs_to Meal, belongs_to Customer, belongs_to Neighborhood
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }
  
  meal() {
    return store.meals.find(function(meal) {
      return this.mealId === meal.id;
    }.bind(this));
  }
  
  customer() {
    return store.customers.find(function(customer) {
      return this.customerId === customer.id;
    }.bind(this));
  }
  
  neighborhood() {
    return store.neighborhoods.find(function(neighborhood) {
      return this.neighborhoodId === neighborhood.id;
    }.bind(this));
  }
}

let neighborhoodId = 0;
// has_many Deliveries, has_many Customers thru Deliveries, has_many Meals thru Deliveries
class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this);
  }
  
  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return this.id === delivery.neighborhoodId;
    }.bind(this));
  }
  
  customers() {
    return store.customers.filter(function(customer) {
      return customer.neighborhoodId === this.id;
    }.bind(this));
  }
  
  meals() {
    return this.deliveries().map(function(delivery) {
      return delivery.meal();
    }).filter(function(item, i, ar){
      return ar.indexOf(item) === i;
    });
  }
}