// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;

    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter( function(delivery) {
      return delivery.neighborhoodId === this.id;
    }.bind(this))
  }

  customers() {
    return this.deliveries().map( function(delivery) {
      return delivery.customer();
    }).filter( function(customer, index, array) {
      return array.indexOf(customer) === index;
    })
  }

  meals() {
    return this.deliveries().map( delivery => {
      return delivery.meal();
    }).reduce( function (agg, meal, index, array) {
      if (array.indexOf(meal) === index) {
        agg.push(meal);
      }
      return agg;
    }, [])
  }
}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;

    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter( function(delivery) {
      return delivery.mealId === this.id
    }.bind(this))
  }

  customers() {
    return this.deliveries().map( function(delivery) {
      return delivery.customer();
    }).filter( function(customer, index, array) {
      return array.indexOf(customer) === index;
    })
  }

  static byPrice() {
    return store.meals.sort( function(mealA, mealB) {
      return mealB.price - mealA.price;
    })
  }
}

class Customer {
  constructor(name, neighborhood) {
    this.name = name;
    this.id = ++customerId;
    if (neighborhood) {
      this.neighborhoodId = neighborhood;
    }

    store.customers.push(this);
  }

  setNeighborhood(neighborhood) {
    this.neighborhoodId = neighborhood.id;
  }

  deliveries() {
    return store.deliveries.filter( function (delivery) {
      return delivery.customerId === this.id;
    }.bind(this))
  }

  meals() {
    return this.deliveries().map( function(delivery) {
      return delivery.meal();
    })
  }

  totalSpent() {
    return this.meals().reduce( function(agg, meal) {
      return agg + meal.price;
    }, 0)
  }
}

class Delivery {
  constructor(meal, neighborhood, customer) {
    this.mealId = meal;
    this.customerId = customer;
    this.neighborhoodId = neighborhood;
    this.id = ++deliveryId

    store.deliveries.push(this);
  }

  customer() {
    return store.customers.find( function(customer) {
      return this.customerId === customer.id;
    }.bind(this))
  }

  meal() {
    return store.meals.find( function(meal) {
      return this.mealId === meal.id;
    }.bind(this))
  }

  neighborhood() {
    return store.neighborhoods.find( function(neighborhood) {
      return this.neighborhoodId === neighborhood.id;
    }.bind(this))
  }
}
