// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;

class Neighborhood{
  // has many deliveries
  // has many customers through deliveries
  // has many meals through deliveries

  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;

    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function (delivery) {
        return delivery.neighborhoodId === this.id
      }.bind(this)
    )
  }

  customers() {
    return store.customers.filter(
      function (customer) {
        return customer.neighborhoodId === this.id
      }.bind(this)
    )
  }

  meals() {
    return this.deliveries().map(function(delivery) {
      return store.meals.find(
        function(meal) {
          return meal.id === delivery.mealId
        })
    }).filter(function(item, i, ar){ return ar.indexOf(item) === i; });
  }

}

let customerId = 0;

class Customer{
  // has many deliveries
  // has many meals through deliveries
  // belongs to a neighborhood

  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId

    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function (delivery) {
        return delivery.customerId === this.id
      }.bind(this)
    )
  }

  meals() {
    return this.deliveries().map(function(delivery) {
      return store.meals.find(
        function(meal) {
          return meal.id === delivery.mealId
        })
    });
  }

  totalSpent() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
    return this.meals().reduce(reducer, 0)
  }
}

let mealId = 0;

class Meal{
  // has many customers

  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function (delivery) {
        return delivery.mealId === this.id
      }.bind(this)
    )
  }

  customers() {
    return this.deliveries().map(function(delivery) {
      return store.customers.find(
        function(customer) {
          return customer.id === delivery.customerId
        })
    });
  }

  static byPrice() {
    return store.meals.sort((a, b) => b.price - a.price);
  }
}

let deliveryId = 0;

class Delivery{
  // belongs to a meal, belongs to a customer, and belongs to a neighborhood

  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId


    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(
      function (meal) {
        return this.mealId === meal.id
      }.bind(this)
    )
  }

  customer() {
    return store.customers.find(
      function (customer) {
        return this.customerId === customer.id
      }.bind(this)
    )
  }

  neighborhood() {
    return store.neighborhoods.find(
      function (neighborhood) {
        return this.neighborhoodId === neighborhood.id
      }.bind(this)
    )
  }
}
