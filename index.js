// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;

    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id;
      }.bind(this)
    );
  }

  customers() {
    // customers through deliveries
    const custArray = this.deliveries().map(function(delivery) {
      return delivery.customer();
    }
    );
    return [...new Set(custArray)];
  }

  meals() {
    const mealArray = this.deliveries().map(function(delivery) {
        return delivery.meal();
    });
    // returns a unique list of meals that have been ordered in a particular neighborhood
    // (you might want to do this one last
    // meals through deliveries
    return [...new Set(mealArray)];
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId; // belongs to a neighborhood

    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.id;
      }.bind(this)
    );
  }


  meals() {
    //through deliveries
    return this.deliveries().map(function(delivery) {
      return delivery.meal()
    }.bind(this)
  );
  }

  totalSpent() {
    let total = 0;
    this.meals().map(function(meal) {
      total += meal.price;
    });
    return total;
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
    // belongs to a meal
    return store.deliveries.filter(
      function(delivery) {
        return delivery.mealId === this.id;
      }.bind(this)
    );
  }

  customers() {
    const custArray = this.deliveries().map(function(delivery) {
      return delivery.customer();
    }.bind(this)
  );

    return [...new Set(custArray)];
    // unique customers if have ordered meal twice
  }

  static byPrice() {
    return store.meals.sort((a,b) => b.price - a.price);
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
  // all of below have many deliveries

  meal() {
    return store.meals.find(
      function(meal) {
        return meal.id === this.mealId;
      }.bind(this)
    );
  }

  customer() {
    return store.customers.find(
      function(customer) {
        return customer.id === this.customerId;
      }.bind(this)
    );
  }

  neighborhood() {
    return store.neighborhoods.find(
      function(neighborhood) {
        return neighborhood.id === this.neighborhoodId;
      }.bind(this)
    );
  }
}
