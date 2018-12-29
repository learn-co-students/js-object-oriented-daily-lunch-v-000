// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
let deliveryId = 0
let customerId = 0
let mealId = 0

class Neighborhood {
  constructor(name) {
    this.id = neighborhoodId++
    this.name = name
    store.neighborhoods.push(this)
  }
  deliveries() {
    const this_neighborhood = this
    return store.deliveries.filter(
      function (delivery) {
        return delivery.neighborhoodId === this_neighborhood.id
      }
    )
  }
  customers() {
   const this_neighborhood = this
   return store.customers.filter(
     function (customer) {
       return customer.neighborhoodId === this_neighborhood.id
     }
   )
 }
   meals() {
     return this.deliveries()
      .map( d => d.meal() )
      .sort( (a,b) => a.id > b.id )
      .filter( (m, idx, meals) => idx === meals.indexOf(m) )
   }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = deliveryId++
    this.mealId = mealId
    this.customerId = customerId
    this.neighborhoodId = neighborhoodId

    store.deliveries.push(this)
  }
  meal() {
    const this_delivery = this
    return store.meals.find(
      function (meal) {
        return meal.id === this_delivery.mealId
      }
    )
  }
  customer() {
    const this_delivery = this
    return store.customers.find(
      function (customer) {
        return customer.id === this_delivery.customerId
      }
    )
  }
  neighborhood() {
    const this_delivery = this
    return store.neighborhoods.find(
      function (neighborhood) {
        return neighborhood.id === this_delivery.neighborhoodId
      }
    )
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = customerId++
    this.name = name
    this.neighborhoodId = neighborhoodId

    store.customers.push(this)
  }
  deliveries() {
    const this_customer = this
    return store.deliveries.filter(
      function (delivery) {
        return delivery.customerId === this_customer.id
      }
    )
  }
  meals() {
    return this.deliveries().map( d => d.meal() )
  }
  totalSpent() {
    const adder = (acc, m) => acc + m.price
    return this.meals().reduce(adder, 0)
  }
}

class Meal {
  constructor(title, price) {
     this.id = mealId++
     this.title = title
     this.price = price

     store.meals.push(this)
  }
  deliveries() {
    const this_meal = this
    return store.deliveries.filter(
      function (delivery) {
        return delivery.mealId === this_meal.id
      }
    )
  }
  customers() {
    return this.deliveries().map(delivery => delivery.customer())
  }
  static byPrice() {
    return store.meals.sort(
      function (a,b) {
        return a.price < b.price
      }
    )
  }
}
