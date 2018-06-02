// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhood_counter = 0
class Neighborhood {
  constructor(name) {
  this.name = name
  this.id = neighborhood_counter++
  store["neighborhoods"].push(this)
  }

  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    })
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    })
  }

  meals() {
    let meals = this.customers().map(customer => {
      return customer.meals().filter(function(item, pos) {
        return customer.meals().indexOf(item) == pos;
      })
    })
    return meals[0]
  }
}


let customer_counter = 0
class Customer {
  constructor(name, neighborhood) {
    this.name = name
    this.id = customer_counter++
    if (neighborhood) {
      this.neighborhoodId = neighborhood
    }
    store["customers"].push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customer().id === this.id
    })
  }

  meals() {
    return this.deliveries().map(delivery => {

      return delivery.meal()
    })
  }

  totalSpent() {
    return this.meals().reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price
    }, 0)
  }
}


let meal_counter = 0
class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = meal_counter++
    store["meals"].push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }

  static byPrice() {

    let thing = store.meals.sort((a, b) => {
      return b.price - a.price
    })

    return thing
  }
}


let delivery_counter = 0
class Delivery {
  constructor(meal, neighborhood, customer) {
    this.mealId = meal
    this.customerId = customer
    this.neighborhoodId = neighborhood
    this.id = delivery_counter++
      store["deliveries"].push(this)
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId
    })
  }

}