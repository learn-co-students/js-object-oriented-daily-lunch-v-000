// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter( delivery => {
      return delivery.neighborhoodId === this.id;
    });
  }

  customers() {
    return store.customers.filter( customer => {
      return customer.neighborhoodId === this.id;
    });
  }

  meals() {
    let uniq_meals = []
    this.deliveries().forEach( delivery => {
      if (uniq_meals.includes(delivery.meal())){
        return
      }else {
        uniq_meals.push(delivery.meal())
      }
    })
    return uniq_meals
  }

}

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.id = ++customerId
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter( delivery => {
      return delivery.customerId === this.id;
    });
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }

  totalSpent() {
    function addPrices(agg, el) {
      return agg + el.price;
    }
    return this.meals().reduce(addPrices, 0)
  }

}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  }

  customers() {
    return this.deliveries().map(delivery => delivery.customer());
  }

  static byPrice() {
    return store.meals.sort(function (a, b) {
      return b.price - a.price;
    });
  }

}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryId;
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId);
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId);
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
  }

}
