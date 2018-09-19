// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };


let neighborhoodId = 0;

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
    return store.customers.filter(
      function(customer) {
        return customer.neighborhoodId === this.id;
      }.bind(this)
    );
  }

  meals() {
    let x = this.deliveries().map(delivery => {
      return delivery.meal();
    })
    let uniqueItems = Array.from(new Set(x))
    return uniqueItems;
  }
}


let customerId = 0;

class Customer {

  constructor(name, neighborhood) {
    this.id = ++customerId;
    this.name = name;
    if (neighborhood) {
      this.neighborhoodId = neighborhood;
    }
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
    return this.deliveries().map(delivery => {
      return delivery.meal();
    })
  }

  totalSpent() {
    return this.meals().reduce(function (accumulator, meal) {
      return accumulator + meal.price;
    }, 0);
  }
}


let mealId = 0;

class Meal {

  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.mealId === this.id;
      }.bind(this)
    );
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    })
  }

  static byPrice() {
    return store.meals.sort(function(meal1, meal2) {
	     return meal2.price > meal1.price;
    });
  }
}


let deliveryId = 0;

class Delivery {

  constructor(meal, neighborhood, customer) {
    this.id = ++deliveryId;
    if (meal) {
      this.mealId = meal;
    }
    if (neighborhood) {
      this.neighborhoodId = neighborhood;
    }
    if (customer) {
      this.customerId = customer;
    }

    store.deliveries.push(this);
  }

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
