// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

// ids
customerId = 0;
neighborhoodId = 0;
mealId = 0;
deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this)
  }

  // has many deliveries
  deliveries () {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id
      }.bind(this)
    )
  }

  // has many customers through deliveries
  customers () {
    const allCustomers = this.deliveries().map(
      function (delivery) {
        return store.customers.find(
          function(customer) {
            return customer.id === delivery.customerId
          }
        )
      }
    )
    
    // return unique customers
    return Array.from(new Set(allCustomers))
  }

  //has many meals through deliveries
  meals () {
    const allMeals = this.deliveries().map(
      function (delivery) {
        return store.meals.find(
          function(meal) {
            return meal.id === delivery.mealId
          }
        )
      }
    )
    return Array.from(new Set(allMeals))
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++ customerId
    store.customers.push(this)
  }

  // has many deliveries
  deliveries () {
    return store.deliveries.filter(
      function (delivery) {
        return delivery.customerId === this.id
      }.bind(this)
    )
  }

  // has many meals through deliveries
  meals () {
    return this.deliveries().map(
      function (delivery) {
        return store.meals.find(
          function(meal) {
            return meal.id === delivery.mealId
          }
        )
      }
    )
  }

  // total spent on food
  totalSpent() {
    let prices = this.meals().map(
      function(meal) {
        return meal.price;
      }
    );

    return prices.reduce(
      function (total, price) {
        return total + price;
      }
    )

  }
}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++ mealId;
    store.meals.push(this)
  }

  // has many deliveries
  deliveries () {
    return store.deliveries.filter(
      function (delivery) {
        return delivery.mealId === this.id
      }.bind(this)
    )
  }

  // has many customers
  customers () {
    const allCustomers = this.deliveries().map(
      function (delivery) {
        return store.customers.find(
          function(customer) {
            return customer.id === delivery.customerId
          }
        )
      }
    )
    
    // return unique customers
    return Array.from(new Set(allCustomers))
  }

  // order all meals by price in descending order
  static byPrice () {
    console.log(store.meals)
    console.log(store.meals.sort(compare))
    return store.meals.sort(compare)
  }

}

function compare(a,b){
  if (a.price < b.price) {
    return 1
  } else {
    return -1
  } 
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.customerId = customerId;
    this.neighborhoodId = neighborhoodId;
    this.id = ++deliveryId
    store.deliveries.push(this)
  }

  // returns meal for a delivery
  meal() {
    return store.meals.find(
      function(meal) {
        return meal.id === this.mealId
      }.bind(this)
    )
  }

  // returns customer for a delivery
  customer() {
    return store.customers.find(
      function(customer) {
        return customer.id === this.customerId
      }.bind(this)
    )
  }

  // returns neighborhood for a delivery
  neighborhood() {
    return store.neighborhoods.find(
      function(neighborhood) {
        return neighborhood.id === this.neighborhoodId
      }.bind(this)
    )
  }
}