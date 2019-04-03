 // global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id;
      }.bind(this)
    )
  }

  customers() {
    return store.customers.filter(
      function(customer) {
        return customer.neighborhoodId === this.id;
      }.bind(this)
    )
  }

  meals() {
      let allMeals = []
      this.deliveries().map(delivery => {
      allMeals.push(delivery.meal());
      }
    )
      return allMeals.filter((x, i, a) => a.indexOf(x) == i);
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

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.id;
      }.bind(this)
    )
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    }
    )
  };

  mp(meal) {
    return meal.price;
  };

  sum(prev, next){
    return prev + next;
  };

  totalSpent() {
    return this.meals().map(this.mp).reduce(this.sum);
  }

}

let mealID = 0;

class Meal {
  constructor(title, price) {
    this.id = ++mealID;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.mealId === this.id;
      }.bind(this)
    )
  }


  customers() {
    let allCustomers = []
    this.deliveries().map(delivery => {
    allCustomers.push(delivery.customer());
    }
  )
    return allCustomers.filter((x, i, a) => a.indexOf(x) == i);
  }

  static byPrice() {
    return store.meals.sort(function(a, b){return b.price-a.price});
  }

}

let deliveryId = 0;

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(
      function(meal) {
        return meal.id === this.mealId;
      }.bind(this)
    )
  };

  customer() {
    return store.customers.find(
      function(customer) {
        return customer.id === this.customerId;
      }.bind(this)
    )
  }

  neighborhood() {
    return store.neighborhoods.find(
      function(neighborhood) {
        return neighborhood.id === this.neighborhoodId;
      }.bind(this)
    )
  }
}
