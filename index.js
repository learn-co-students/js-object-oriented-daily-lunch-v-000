// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId
    this.name = name

    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.neighborhood() === this
    }.bind(this))
  }

  customers() {
    return store.customers.filter(function(customer) {
      return customer.neighborhoodId === this.id
    }.bind(this))
  }

  meals() {
  let array = this.deliveries().map(delivery => delivery.meal())
    return array.filter(function(element, i, array) {
      return array.indexOf(element) === i
    })
  }
}


class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price

    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.meal() === this
    }.bind(this))
  }

  customers() {
    return store.customers.map(customer => {
      if (customer.meals().find(meal =>
        meal === this)) {
          return customer
        }
    })
  }

  static byPrice() {
    return store.meals.sort((num1, num2) =>
       parseFloat(num2.price) - parseFloat(num1.price));
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId
    this['neighborhoodId'] = neighborhoodId
    this.name = name

    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customer() === this)
  }

  meals() {
    return this.deliveries().map(function(delivery) {
      return delivery.meal()
    })
  }

  totalSpent() {
    let totalPrice = 0;
    let prices = this.meals().map(meal => meal.price);

    prices.forEach(price => totalPrice += price)
 
    return totalPrice;
  };
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId

    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(function(meal) {
      return meal.id === this.mealId
    }.bind(this))
  }

  customer() {
    return store.customers.find(function(customer) {
      return customer.id === this.customerId
    }.bind(this))
  }

  neighborhood() {
    return store.neighborhoods.find(function(neighborhood) {
      return neighborhood.id === this.neighborhoodId
    }.bind(this))
  }
}
