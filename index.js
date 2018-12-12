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
    let meals = [];

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    this.deliveries().forEach(
      function(delivery) {
        meals.push(delivery.meal());
      }
    );

    return meals.filter(onlyUnique);
  }

}

let customerId = 0;

class Customer {
  constructor(name, neighborhood) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhood;
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
    let meals = [];

    this.deliveries().forEach(
      function(delivery) {
        meals.push(delivery.meal());
      }
    );

    return meals;
  }

  totalSpent() {
    let total = 0;

    this.meals().forEach(
      function(meal) {
        total += meal.price;
      }
    );

    return total;
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
    let customers = [];

    this.deliveries().forEach(
      function(delivery) {
        customers.push(delivery.customer());
      }
    );

    return customers;
  }

  static byPrice() {
    const sorter = function (a, b) {
      return b.price - a.price;
    }
    return store.meals.sort(sorter);
  }

}

let deliveryId = 0;

class Delivery {
  constructor(meal, neighborhood, customer) {
    this.id = ++deliveryId;
    this.mealId = meal;
    this.neighborhoodId = neighborhood;
    this.customerId = customer;
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
