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

  // returns a list of all deliveries placed in a neighborhood
  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
  }

  // returns all of the customers that live in a particular neighborhood
  // PASSING
  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id)
  }

  // returns a unique list of meals that have been ordered in a particular neighborhood (you might want to do this one last)
  meals() {
    const mealIds = this.deliveries().slice().map(delivery => delivery.mealId)

    for (let id of mealIds) {
      return store.meals.filter(
        function(meal) {
          return meal.id === id
        }
      )
    }
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

  // returns all of the deliveries that customer has received
  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.id
      }.bind(this)
    )
  }

  // returns all meals that a customer has ordered
  meals() {
    return this.deliveries().map(delivery => delivery.meal()).unique()
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

  // returns all of the deliveries associated with a particular meal.
  // PASSING
  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.mealId === this.id
      }.bind(this)
    )
  }
  // returns all of the customers who have had the meal delivered. Be careful not to return the same customer
  // PASSING
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

  //  returns the meal associated with a particular delivery
  meal() {
    return store.meals.find(
      function(meal) {
        return meal.id === this.mealId
      }.bind(this)
    )
  }

  // returns the customer associated with a particular delivery
  customer() {
    return store.customers.find(
      function(customer) {
        return this.customerId === customer.id
      }.bind(this)
    )
  }

  // returns the neighborhood associated with a particular delivery
  neighborhood() {
    return store.neighborhoods.find(
      function(neighborhood) {
        return this.neighborhoodId === neighborhood.id
      }.bind(this)
    )
  }
}

///

let neighborhood = new Neighborhood('Dumbo');
let secondNeighborhood = new Neighborhood('Hamsterdam');
let meal = new Meal('5 lbs of Fruity Pebbles', 25);
let secondMeal = new Meal('An entire large stuffed crust pizza from pizza hut', 20);
let customer = new Customer('Paul Rudd', neighborhood.id);
let secondCustomer = new Customer('Todd', secondNeighborhood.id);
let delivery = new Delivery(meal.id, neighborhood.id, customer.id);
let secondDelivery = new Delivery(secondMeal.id, secondNeighborhood.id, secondCustomer.id);
let thirdDelivery = new Delivery(secondMeal.id, secondNeighborhood.id, secondCustomer.id);
let thirdNeighborhood = new Neighborhood('Detroit')
let thirdMeal = new Meal('Cheesy Poofs', 55)
let thirdCustomer = new Customer ('Avery Scott', thirdNeighborhood.id)
let fourthDelivery = new Delivery(secondMeal.id, neighborhood.id, thirdCustomer.id)
let fifthDelivery = new Delivery(meal.id, thirdNeighborhood.id, thirdCustomer.id)
