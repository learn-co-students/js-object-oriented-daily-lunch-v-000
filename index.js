// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId
    this.name = name
    store.neighborhoods.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    });
  }
  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    });
  }
  meals(){
    const meals = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    let uniqueMeals = [...new Set(meals)]
    return uniqueMeals
  }
}

class Customer {
  constructor(name, neighborhood) {
    this.id = ++customerId
    this.name = name
    if (neighborhood) {
      this.neighborhoodId = neighborhood;
      store.customers.push(this);
    }
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    });
  }
  
  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }

  totalSpent() {
    return this.meals().reduce(function (total, meal) {
      return total + meal.price
    }, 0)
  }
}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    });
  }
  customers() {
    const customers = this.deliveries().map(delivery =>
      delivery.customer()
    );
    let uniqueCustomers = [...new Set(customers)]
    return uniqueCustomers
  }
  static byPrice() {
        return store.meals.sort((a, b) => a.price < b.price);
  }
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
    return store.meals.find(meal => {
      return meal.id === this.mealId
    });
  }
  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId
    });
  }
  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId
    });
  }
}
