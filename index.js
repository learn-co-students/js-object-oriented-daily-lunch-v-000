// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor (name) {
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this);
  }

  deliveries () {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id;
      }.bind(this)
    );
  }

  customers () {
    let deliveries = this.deliveries();
    let customers = [];
    deliveries.forEach(function(delivery) {customers.push(delivery.customer())});
    let uniqueCustomerInstances = [...new Set(customers)]
    return uniqueCustomerInstances;
  }

  meals () {
    let deliveries = this.deliveries();
    let meals = [];
    deliveries.forEach(function(delivery) {meals.push(delivery.meal())});
    let uniqueMealsInstances = [...new Set(meals)]
    return uniqueMealsInstances;
  }



}

class Customer {
  constructor (name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }

  deliveries () {
    return store.deliveries.filter (
      function(delivery) {
        return delivery.customerId === this.id
      }.bind(this)
    );
  }

  meals () {
    let deliveries = this.deliveries();
    let meals = [];
    deliveries.forEach(function(delivery) {meals.push(delivery.meal())});
    return meals;
  }

  totalSpent () {
    const mealsPrices = this.meals().map(function(meal) {return meal.price});
    const reducer = (accum, currentValue) => accum + currentValue;
    return mealsPrices.reduce(reducer);
  }


}

class Meal {
  constructor (title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries () {
    return store.deliveries.filter (
      function(delivery) {
        return delivery.mealId === this.id
      }.bind(this)
    );
  }

  customers () {
    let deliveries = this.deliveries();
    let customers = [];
    deliveries.forEach(function(delivery) {customers.push(delivery.customer())});
    let uniqueCustomerInstances = [...new Set(customers)]
    return uniqueCustomerInstances;
  }

  static byPrice() {
    const allMeals = store.meals;
    function compare(a, b) {

        const mealPriceA = a.price;
        const mealPriceB = b.price;

        let comparison = 0;
        if (mealPriceA > mealPriceB) {
          comparison = -1;
        } else if (mealPriceA < mealPriceB) {
          comparison = 1;
        }
        return comparison;
        }

    return allMeals.sort(compare);

  }

}

class Delivery {
  constructor (mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;

    store.deliveries.push(this);
  }

  customer () {
    return store.customers.find(
      function(customer) {
        return customer.id === this.customerId;
      }.bind(this)
    );
  }

  meal () {
    return store.meals.find(
      function(meal) {
        return meal.id === this.mealId;
      }.bind(this)
    );
  }

  neighborhood () {
    return store.neighborhoods.find(
      function(neighborhood) {
        return neighborhood.id === this.neighborhoodId;
      }.bind(this)
    );
  }

}


/*  Meal.byPrice() {

    const allMeals = store.meals;

    function compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const mealPriceA = a.price;
        const mealPriceB = b.price;

        let comparison = 0;
        if (mealPriceA > mealPriceB) {
          comparison = 1;
        } else if (mealPriceA < mealPriceB) {
          comparison = -1;
        }
        return comparison;
        }

    allMeals.sort(compare);

  } */
