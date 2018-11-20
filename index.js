// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId
    this.name = name

    store.neighborhoods.push(this)
  }

  deliveries() {
    //returns list of all deliveries placed in neighborhood
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id
      }.bind(this)
    );
  }

  customers() {
    //returns list of customers in neighborhood
    let allCust = this.deliveries().map(delivery => {
      return delivery.customer();
    });
    let uniqCust = [...new Set(allCust)];
    return uniqCust
  }

  meals() {
    //returns unique list of meals ordered in neighborhood
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    let uniqMeals = [...new Set(allMeals)];
    return uniqMeals
  }
}

let customerId = 0

class Customer {
  constructor(name, neighborhood) {
    this.id = ++customerId
    this.name = name
    this.neighborhoodId = neighborhood

    store.customers.push(this)
  }

  deliveries() {
    //returns all deliveris that customer has received
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.id
      }.bind(this)
    );
  }

  meals() {
    //returns all meals that a customer has ordered (through)
    return this.deliveries().map(delivery => {
      return delivery.meal();
    })
  }

  totalSpent() {
    //returns the total amount that the customer has spent on deliveries
    let total = 0
    for (const delivery of this.deliveries()) {
      total += delivery.meal().price;
    }
    return total
  }
}

let mealId = 0

class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price

    store.meals.push(this)
  }

  deliveries() {
    //returns all deliveries associated with particular meal
    return store.deliveries.filter(
      function(delivery) {
        return delivery.mealId === this.id
      }.bind(this)
    );
  }

  customers() {
    //returns all unique customers who have had this meal delivered
    return this.deliveries().map(delivery => {
      return delivery.customer();
    })
  }

  static byPrice() {
    //a class method that orders all meals by price in descending order
    //use static keyword to write class method
    const priceSorter = function (meal2, meal1) {
      return meal1.price - meal2.price;
    };
    return store.meals.sort(priceSorter);
  }
}

let deliveryId = 0

class Delivery {
  constructor(meal, neighborhood, customer) {
    this.id = ++deliveryId
    this.mealId = meal
    this.neighborhoodId = neighborhood
    this.customerId = customer

    store.deliveries.push(this)
  }

  meal() {
    //returns meal associated with delivery
    return store.meals.find(
      function(meal) {
        return meal.id === this.mealId
      }.bind(this)
    );
  }

  customer() {
    //returns customer associated with delivery
    return store.customers.find(
      function(customer) {
        return customer.id === this.customerId
      }.bind(this)
    );
  }

  neighborhood() {
    //returns neighborhood associated with delivery
    return store.neighborhoods.find(
      function(neighborhood) {
        return neighborhood.id === this.neighborhoodId
      }.bind(this)
    );
  }
}
