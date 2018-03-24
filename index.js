const store = { deliveries: [], meals: [], employers: [], customers: [] }

let deliveryId = 0;

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId;

    if(meal) {
      this.mealId = meal.id
    }

    if(customer) {
      this.customerId = customer.id
    }

    store.deliveries.push(this);
  }

  customer() {
    return store.customers.find((customer) => {
      return customer.id === this.customerId;
    })
  }

  meal() {
    return store.meals.find((meal) => {
      return meal.id === this.mealId;
    })
  }
}

let mealId = 0;

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    })
  }

  customers() {
    return this.deliveries().map((delivery) => {
      return delivery.customer()
    })
  }

  static byPrice() {
    return store.meals.sort(function(a, b) {
      return b.price - a.price;
    })
  }
}

let employerId = 0

class Employer {
  constructor(name) {
    this.id = ++employerId
    this.name = name

    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    })
  }

  deliveries() {
    let allDeliveries = this.employees().map((employee) => {
      return employee.deliveries()
    })

    let merged = [].concat.apply([], allDeliveries)
    return merged
  }

  allMeals() {
    return this.deliveries().map(function(delivery) {
      return delivery.meal()
    })
  }

  meals() {
    let uniqueMeals = [...new Set(this.allMeals())]
    return uniqueMeals
  }

  mealTotals() {
    let totals = {}
    this.allMeals().forEach(function(meal) {
      totals[meal.id] = 0
    })
    this.allMeals().forEach(function(meal) {
      totals[meal.id] += 1
    })
    return totals
  }
}

let customerId = 0;

class Customer {
  constructor(name, employer = {}) {
    this.id = ++customerId;
    this.employerId = employer.id;
    this.name = name;

    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    })
  }

  meals() {
    return this.deliveries().map((delivery) => {
      return delivery.meal()
    })
  }

  totalSpent() {
    return this.meals().reduce(function(sum, meal) {
      return sum + meal.price;
    }, 0)
  }
}
