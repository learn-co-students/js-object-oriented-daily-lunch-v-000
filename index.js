// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let deliveryId = 0;
let customerId = 0;
let mealId = 0;

class Neighborhood {

  constructor (name, delivery) {
    this.id = ++neighborhoodId;
    this.name = name;
    if (delivery) {
      this.deliveryId = delivery.id;
      this.mealId = delivery.mealId;
    }
    store.neighborhoods.push(this);
  }


  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id;
      }.bind(this));
  }

  customers() {
    return store.customers.filter(
      function(customer) {
        return customer.neighborhoodId === this.id;
      }.bind(this));
  }

  meals() {
      const allMeals = this.customers().map(customer => customer.meals());
      const merged = [].concat.apply([], allMeals);
      return [...new Set(merged)];
    }
  }



class Customer {

  constructor(name, neighborhoodId){
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;

    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.id;
      }.bind(this));
  }

  meals() {
    return this.deliveries().map(delivery=> delivery.meal());
  }

  totalSpent() {
    // let total =  this.meals().map(meal => ++ meal.price);
    let total = this.meals().map(meal => +meal.price);
    return total.reduce((partial_sum, a) => partial_sum + a);
  }
}



class Delivery {

  constructor (mealId, neighborhoodId, customerId){
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);

  }

  meal(){
    return store.meals.find(
      function(meal) {
        return meal.id === this.mealId;
    }.bind(this));

  }

  customer(){
      return store.customers.find(
        function(customer) {
          return customer.id === this.customerId;
    }.bind(this));
  }

  neighborhood(){
      return store.neighborhoods.find(
        function(neighborhood) {
          return neighborhood.id === this.neighborhoodId;
    }.bind(this));
  }
}

class Meal {

  constructor (title, price){
    this.id = ++mealId;
    this.price = price;
    this.title = title;
    store.meals.push(this);
  }

    deliveries() {
      return store.deliveries.filter(
        function(delivery) {
          return delivery.mealId === this.id;
        }.bind(this));
    }

    customers() {
      return this.deliveries().map(delivery=> delivery.customer());
      // return store.customers.filter(
      //   function(customer) {
      //     return customer.mealId === this.id;
      //   }.bind(this));
    }

    static byPrice() {
      return store.meals.sort(function(a, b){return b.price - a.price});
    }


}

