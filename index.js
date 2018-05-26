// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let n_counter = 0
let c_counter = 0
let m_counter = 0
let d_counter = 0
class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = n_counter++
    store["neighborhoods"].push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    })
  }

  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    })
  }

  meals() {
    let meals = this.customers().map(customer => {
      return customer.meals().filter(function(item, pos) {
        return customer.meals().indexOf(item) == pos;
      })
    })
    console.log(meals[0]);
    return meals[0]
  }

}


class Customer {
  constructor(name, neighborhood){
    this.name = name
    this.id = c_counter++
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
    // console.log(meals);
  }

  totalSpent() {
    return this.meals().reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price
    }, 0)
  }
}

class Meal {
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = m_counter++
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

class Delivery {
  constructor(meal, neighborhood, customer) {
    this.mealId = meal
    this.customerId = customer
    this.neighborhoodId = neighborhood
    this.id = d_counter++
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
