// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodID = 0
let mealID = 0
let customerID = 0
let deliveryID = 0

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodID
    this.name = name
    store.neighborhoods.push(this)
  }

  customers() {
    return store.customers.filter(x => {return x.neighborhoodId === this.id})
  }

  // meals() {
  //   return this.customers().map(x => x.meals())
  // }

  meals() {
      const allMeals = this.customers().map(customer => customer.meals());
      const merged = [].concat.apply([], allMeals);
      return [...new Set(merged)];
    }

  deliveries() {
    return store.deliveries.filter(x => x.neighborhoodId === this.id)
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
    return store.deliveries.filter(x => x.mealId === this.id)
  }

  // customers() {
  //   return store.customers.filter(x => x.mealId === this.id)
  // }

  customers() {
      const allCustomers = this.deliveries().map(delivery => delivery.customer());
      return [...new Set(allCustomers)];
    }


  static byPrice() {
      return store.meals.sort((a, b) => a.price < b.price);
    }
}


class Customer {
  constructor(name, neighborhoodID){
    this.id = ++customerID
    this.name = name
    this.neighborhoodId = neighborhoodID
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(x => x.customerId === this.id)
  }

  meals() {
    return this.deliveries().map(x => x.meal())
  }

  totalSpent() {
    return this.meals().reduce((a,b) => a += b.price, 0)
  }
}


class Delivery {
  constructor(mealID, neighborhoodID, customerID,){
    this.id = ++deliveryID
    this.mealId = mealID
    this.neighborhoodId = neighborhoodID
    this.customerId = customerID
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId)
  }

}
