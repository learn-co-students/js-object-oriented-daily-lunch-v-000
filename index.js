// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;



class Neighborhood  {
    constructor(name){
      this.id = neighborhoodId++
      this.name = name

      store.neighborhoods.push(this)
    }
    deliveries() {
      return store.deliveries.filter(
          function(delivery) {
              return delivery;
          }.bind(this)
      );
    }
    customers() {
      return store.customers.filter(
          function(customer) {
              return customer;
          }.bind(this)
      );
    }
    meals() {
      return store.meals.filter(
          function(meal) {
              return meal;
          }.bind(this)
      );
    }
}

class Customer {
  constructor(name, neighborhood){
    this.id = customerId++
    this.name = name
    this.neighborhoodId = neighborhood


    store.customers.push(this)
    //console.log(store.customers)
  }
  deliveries() {
    return store.deliveries.filter(
        function(delivery) {
            return delivery.customerId === this.id//.id === this.   ; driver.id === this.driverId;
        }.bind(this)
    );
  }
  meals() {
    return this.deliveries().map(function(delivery) {
          return delivery.meal();
        });
      //  console.log(someReturnValue)
  }
  totalSpent() {
      return this.meals().reduce((total, currentMeal) =>
      {
        return total + currentMeal.price },0);
  };
  }

const Meal = (() => {
  return class {
  constructor(title, price){
    this.id = mealId++
    this.title = title
    this.price = price


    store.meals.push(this)
  }

  deliveries() {
  //  console.log(store.deliveries)
    return store.deliveries.filter(
        function(delivery) {
            return delivery.mealId === this.id;
        }.bind(this)
    );
  }

  customers() {
    return store.customers.filter(
        function(customer) {
            return customer;
        }.bind(this)
    );
  }

  static byPrice() {
    // console.log(store.meals.sort((a, b) => b.price-a.price))
    return store.meals.sort((a, b) => {
    //  debugger
      return b.price-a.price;
    })
  }
}
})()

class Delivery {
  constructor(meal, neighborhood, customer){
    this.id = deliveryId++
    this.mealId = meal
    this.neighborhoodId =neighborhood
    this.customerId =customer



    store.deliveries.push(this)
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
            return customer;
        }.bind(this)
    );
  }
  neighborhood() {
    return store.neighborhoods.find(
        function(neighborhood) {
            return neighborhood;
        }.bind(this)
    );
  }
}
