// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 1
let mealId = 1
let customerId = 1
let deliveryId = 1
class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = neighborhoodId++
    store.neighborhoods.push(this)
  }
  deliveries() {
    return store.deliveries.filter(f => {
      return f.neighborhoodId = this.id
    })
  }

  customers() {
    return store.customers.filter(f => {
      return f.neighborhoodId = this.id
    })
  }
  meals() {
      const allMeals = this.customers().map(customer => customer.meals());
      const merged = [].concat.apply([], allMeals);
      return [...new Set(merged)];
    }
}

class Meal {
  constructor(title, price = 0) {
    this.id = mealId++
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  customers() {
    const allCustomers = this.deliveries().map(delivery => delivery.customer());
    return [...new Set(allCustomers)];
    }


  deliveries() {

    return store.deliveries.filter(f => {

      return f.mealId === this.id
    })

  }

  static byPrice() {
    return store.meals.sort((a, b) => {
        return b.price - a.price
      })

  }

}

class Delivery {
  constructor(meal, neighborhood, customer) {
    this.mealId = meal
    this.customerId = customer
    this.neighborhoodId = neighborhood
    this.id = deliveryId++
    store.deliveries.push(this)

  }

  meal() {
    return store.meals.find(f => f.id === this.mealId)
  }

  customer() {
    return store.customers.find(f => f.id === this.customerId)

  }

  neighborhood() {
    return store.neighborhoods.find(f => f.id === this.neighborhoodId)
  }
}

class Customer {
  constructor(name, neighborhood) {
    this.id = customerId++
    this.name = name
    this.neighborhoodId = neighborhood
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(f =>
      f.customerId === this.id
    )

  }

  meals() {
    return this.deliveries().map(m =>  {
      return m.meal()
    })
  }

  totalSpent() {
    let total = 0;
    this.meals().map(m => {

      total += m.price
    })
    return total
  }
}
