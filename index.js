// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
let classId = 0
let mealId = 0
let deliveryId = 0

class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId == this.id
      }.bind(this)
    )
  }

  customers() {
    return store.customers.filter(
      function(customer) {
        return customer.neighborhoodId == this.id
      }.bind(this)
    )
  }

  meals() {
    const allMeals = this.customers().map(customer => customer.meals());
    const merged = [].concat.apply([], allMeals);
    return [...new Set(merged)];
  }

}

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.id = ++classId
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId == this.id
      }.bind(this)
    )
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }

  // meals() {
  //   return this.deliveries() {
  //     function(delivery) {
  //       delivery.meal
  //     }.bind(this)
  //   }
  // }
  // meals() {
  //   return store.meals.filter(
  //     function(meal) {
  //       return meal.customerId == this.id
  //     }.bind(this)
  //   )
  // }
  totalSpent() {
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
  } 

}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  deliveries() {
    // console.log(store.deliveries[3])
    return store.deliveries.filter(
      function(delivery) {
        return delivery.mealId == this.id
      }.bind(this)
    )
  }
  
  customers() {
      const allCustomers = this.deliveries().map(delivery => delivery.customer());
      //console.log(store.customers)
      return store.customers;
    }

  static byPrice() {
    //console.log(store.meals.sort(function(a, b) {return a.price - b.price}))
    return store.meals.sort(function(a, b) {return a.price - b.price}).reverse()
  }

}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.customerId = customerId
    this.neighborhoodId = neighborhoodId
    this.id = ++deliveryId
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(
      function(meal) {
        return meal.id == this.mealId
      }.bind(this)
    )
  }

  customer() {
    return store.customers.find(
      function(customer) {
        return customer.id = this.customerId
      }.bind(this)
    )
  }

  neighborhood() {
    return store.neighborhoods.find(
      function(neighborhood) {
        return neighborhood.id = this.neighborhoodId
      }.bind(this)
    )
  }

}