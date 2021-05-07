// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = neighborhoodId++;


    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId == this.id;
    })
  };

  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId == this.id;
    })
  };

  meals() {

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    return this.deliveries().map(delivery => {
      return delivery.meal();
    }).filter( onlyUnique );
  }

}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = mealId++;
    store.meals.push(this);
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    });
  };

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId == this.id;
    })
  };

  static byPrice() {
    return store.meals.sort((a, b) => a.price - b.price).reverse()
  }

}

class Customer {
  constructor(name, neighborhood) {
    this.name = name;
    this.id = customerId++;
    if (neighborhood) {
            this.neighborhoodId = neighborhood;
        }

    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId == this.id;
    })
  };

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    });
  }

  totalSpent() {
    return this.meals().reduce(function (accumulator, currentValue) {
  return accumulator + currentValue.price;
}, 0);
  }



}

class Delivery {
  constructor(meal, neighborhood, customer) {

    this.id = deliveryId++;
    if (meal) {
            this.mealId = meal;
        }
    if (customer) {
            this.customerId = customer;
        }
    if (neighborhood) {
            this.neighborhoodId = neighborhood;
        }
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
