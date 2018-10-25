// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

// meal has many customers
// delivery belongs to a meal, belongs to a customer, and belongs to a neighborhood
  // delivery: mealId, customerId, neighborhoodId
// customer has many deliveries
// customer has many meals through deliveries
// customer belongs to a neighborhood
  // customer: neighborhoodId
// neighborhood has many deliveries
// neighborhood has many customers through deliveries
// neighborhood has many meals through deliveries

let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

///
class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId

    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id
      }.bind(this)
    )
  }

  customers() {
    return store.customers.filter(
      function(customer) {
        return customer.neighborhoodId === this.id
      }.bind(this)
    )
  }

  meals() {

  }
}

///
class Customer {
  constructor(name, neighborhoodId){
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId

    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.id
      }.bind(this)
    )
  }

  meals() {
    let meals = []
    const mealIds = this.deliveries().slice().map(
      function (delivery) {
        return delivery.mealId
      }
    )
    return mealIds.map(
      function (id) {
        return store.meals.find(
          function (meal) {
            if (meal.id === id) {
              return meals.push(meal)
            }
          }
        )
      }
    )
    return meals
  }
}

///
class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId

    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.mealId === this.id
      }.bind(this)
    )
  }

  customers() {
    return store.customers.filter(
      function(customer) {
        return customer.deliveryId === this.deliveryId
      }.bind(this)
    )
  }

  byPrice() {

  }
}

///
class Delivery {
  constructor(mealId, customerId, neighborhoodId) {
    this.mealId = mealId
    this.customerId = customerId
    this.neighborhoodId = neighborhoodId
    this.id = ++deliveryId

    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(
      function(meal) {
        return meal.id === this.mealId
      }.bind(this)
    )
  }

  customer() {
    return store.customers.find(
      function(customer) {
        return this.customerId === customer.id
      }.bind(this)
    )
  }

  neighborhood() {
    return store.neighborhoods.find(
      function(neighborhood) {
        return this.neighborhoodId === neighborhood.id
      }.bind(this)
    )
  }
}

let neighborhood = new Neighborhood('Dumbo');
let secondNeighborhood = new Neighborhood('Hamsterdam');
let meal = new Meal('5 lbs of Fruity Pebbles', 25);
let secondMeal = new Meal('An entire large stuffed crust pizza from pizza hut', 20);
let customer = new Customer('Paul Rudd', neighborhood.id);
let secondCustomer = new Customer('Todd', secondNeighborhood.id);
let delivery = new Delivery(meal.id, neighborhood.id, customer.id);
let secondDelivery = new Delivery(secondMeal.id, secondNeighborhood.id, secondCustomer.id);
let thirdDelivery = new Delivery(secondMeal.id, secondNeighborhood.id, secondCustomer.id);
