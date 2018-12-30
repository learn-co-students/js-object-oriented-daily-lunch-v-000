// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodID = 0
let customerID = 0
let mealID = 0
let deliveryID = 0
class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodID
    this.name = name
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id
      }.bind(this)
    )
  }

  customers() {
    return store.customers.filter(
      function(customer) {
        return customer.neighborhoodId === this.id
      }.bind(this)
    )
  }

  meals() {
    let allMeals = this.customers().map(customer => customer.meals())
    let all = [].concat.apply([], allMeals)

    return [...new Set(all)]
    //unique(allMeals, meal["id"])
  }
}

class Customer {
  constructor(name, neighborhoodID) {
    this.id = ++customerID
    this.name = name
    this.neighborhoodId = neighborhoodID
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.id
      }.bind(this)
    )
  }

  meals() {
    return this.deliveries().map(
      function(delivery) {
        return delivery.meal()
      }
    )
  }

  totalSpent() {
    const prices = this.meals().map(function(meal) {
      return meal.price
    })
    return prices.reduce(function(total, num) {
      return total + num
    })
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealID
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.mealId === this.id
      }.bind(this)
    )
  }

  customers() {
    return this.deliveries().map(
      function(delivery) {
        return delivery.customer()
      }
    )
  }

  static byPrice() {
    return store.meals.sort(function(a, b) {
      return b.price - a.price
    })
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryID
    this.mealId = mealId
    this.customerId = customerId
    this.neighborhoodId = neighborhoodId
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

function unique(array, propertyName) {
   return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
}
