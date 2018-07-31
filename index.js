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
    return store.deliveries.filter(delivery=> {
      return delivery.neighborhoodId === this.id
    })
  }

  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    })
  }

  meals() {
    return this.deliveries().filter(delivery => {
      return delivery.meal()
    })
  }


}

let customerId = 0

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId
    this.name = name
    this.neighborhoodId = neighborhoodId

    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery=> {
      return delivery.customerId === this.id
    })
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }


  totalSpent() {
    return this.meals().reduce(function (total, currentMeal) {
      return currentMeal.price + total
    }, 0)
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
    return store.deliveries.filter(delivery=> {
      return delivery.mealId === this.id
    })
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }

  static byPrice() {
    return store.meals.slice().sort(function (mealOne, mealTwo) {
      return mealOne.price - mealTwo.price
    })
  }

}


let deliveryId = 0

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId

    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find((meal) => this.mealId === meal.id);
  }

  customer() {
    return store.customers.find((customer) => this.customerId === customer.id);
  }

  neighborhood() {
    return store.neighborhoods.find((neighborhood) => this.neighborhoodId === neighborhood.id);
  }

}
