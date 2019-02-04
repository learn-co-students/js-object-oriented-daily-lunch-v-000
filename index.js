// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };


let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

 class Neighborhood {
  constructor(name) {
    // can create a new neighborhood with a name
    this.name = name;
    // is created with a unique id
    this.id = ++neighborhoodId;
    // adds the neighborhood to the store
    store.neighborhoods.push(this);
  }
  // returns all customer instances associated with a particular neighborhood
  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id;
    });
  }
  // returns all unique deliveries associated with a particular neighborhood
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id;
    });
  }
  // returns a unique list of meals ordered in a neighborhood
  meals() {
    	function uniqueMeals(value, index, self) {
      		return self.indexOf(value) === index
    	}
    return this.deliveries().map(delivery =>
    	delivery.meal()).filter(uniqueMeals)
  	}
}

 class Customer {
  // initialize with customer with name and neighborhood id
  constructor(name, neighborhoodId) {
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    // adds a unique id to each customer
    this.id = ++customerId;
    // Adding customer to the store
    store.customers.push(this);
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  }
  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    });
  }
  totalSpent() {
    return this.meals().reduce((a,b) => {
      return a += b.price
    }, 0)
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
    return store.deliveries.filter (delivery => {
      return delivery.mealId === this.id;
    });
  }
  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    });
  }
  static byPrice() {
    return store.meals.sort(function (a,b){
      return b.price - a.price;
  });
 }
}

 class Delivery {
  constructor(mealId, neighborhoodId, customerId ) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }
  meal() {
    return store.meals.find(meal => {
      return meal.id == this.mealId;
    });
  }
  customer() {
    return store.customers.find(customer => {
      return customer.id == this.customerId;
    });
  }
  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id == this.neighborhoodId;
    });
  }
}
