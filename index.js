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
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id;
    })
  }
  customers() {
    return store.customers.filter(customer => {
      return this.deliveries().map(delivery => delivery.customerId);
    })
  }
  meals() {
    let all_meals = [];
    return store.meals.filter(meal => {
      return this.deliveries().map(function(delivery) {
        if (all_meals.find(id => id === delivery.mealId)) {
          all_meals.push(delivery.mealId);
          return delivery.mealId;
        }
      })
    })
  }
}

let customerId = 0;
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
    return this.deliveries().map(delivery => {
      return store.meals.find(meal => {return meal.id === delivery.mealId});
    })
  }
  totalSpent() {
    return this.meals().reduce(function (total, meal) {return meal.price + total},0);
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
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    })
  }
  customers() {
    let all_customers = [];
    return store.customers.filter(customer => {
      return this.deliveries().map(function(trip) {
        if (all_customers.find(id => id === trip.customerId)) {
          all_customers.push(trip.customerId);
          return trip.customerId;
        }
      })
    })
  }
  static byPrice() {
    return store.meals.slice().sort(function(a,b) {return b.price-a.price});
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

// store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
// redHook = new Neighborhood('Red Hook');
// guy = new Customer('Guy Fieri', redHook.id);
// marioBatali = new Customer('Iron Chef Mario Batali', redHook.id);
// friedCheesecake = new Meal('Fried Cheesecake', 30);
// macAndCheese = new Meal('Fried Macaroni and Cheese', 15);
// flavortownDelivery = new Delivery(friedCheesecake.id, redHook.id, guy.id);
// guysAmericanDelivery = new Delivery(macAndCheese.id, redHook.id, guy.id);
// guysDuplicateDelivery = new Delivery(macAndCheese.id, redHook.id, guy.id);
// batalisDessert = new Delivery(friedCheesecake.id, redHook.id, marioBatali.id);
//
// console.log(guy.deliveries());
// console.log(guy.meals());
