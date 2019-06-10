// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;


class Neighborhood {
  constructor(name){
  this.id = ++neighborhoodId;
  this.name = name

  store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
        function(delivery) {
            return delivery.customerId === this.id;
        }.bind(this)
    );
  }

  customers() {
    return store.customers.filter(
        function(customer) {
            return customer.neighborhoodID === this.neighborhoodID;
        }.bind(this)
      );
    }
  }

class Customer {
  constructor(name, neighborhoodId){
  this.id = ++customerId;
  this.name = name
  this.neighborhoodId = neighborhoodId

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
    return this.deliveries().map (
        function(delivery) {
            return delivery.meal()
        }
    );
  };
}

class Meal {
  constructor(title, price){
  this.id = ++mealId;
  this.title = title
  this.price = price

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
    return store.customers.filter(
        function(customer) {
            return customer.customerId === this.customerId;
        }.bind(this)
      );
    }

    static byPrice() {
      return store.meals.sort((a, b) => a.price < b.price); 
   	}
}


class Delivery {
  constructor(mealId, customerId, neighborhoodId){
  this.id = ++deliveryId;
  this.mealId = mealId
  this.customerId = customerId
  this.neighborhoodId = neighborhoodId

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
            return neighborhood.neighborhoodID === this.neighborhoodID;
        }.bind(this)
    );
  }
}
