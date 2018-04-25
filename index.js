const store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0
class Customer {
  constructor(name, employer) {
    this.name = name
    if (employer) {
      this.employerId = employer.id
    }
    this.id = customerId++
    store.customers.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal())
  }

  totalSpent() {
    // debugger
    return this.meals().reduce(function(total, current) {
      return total + current.price
    }, 0)
  }
}

let mealId = 0
class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = mealId++
    store.meals.push(this)
  }
  static byPrice() {
    return store.meals.sort(function(a, b) {
      return b.price - a.price
    })
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }
  customers() {
    return this.deliveries().map(delivery => delivery.customer())
  }
}

let deliveryId = 0
class Delivery {
  constructor(meal, customer) {
    if (meal) {
      this.mealId = meal.id
    }
    if (customer) {
      this.customerId = customer.id
    }
    this.id = deliveryId++
    store.deliveries.push(this)
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId)
  }
  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }
}

let employerId = 0
class Employer {
  constructor(name) {
    this.name = name
    this.id = employerId++
    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(customer => customer.employerId === this.id)
  }

  deliveries() {
    return store.deliveries.filter(delivery => this.employees().includes(delivery.customer()))
  }

  meals() {
    let allMeals = this.deliveries().map(delivery => delivery.meal())
    let uniqueMeals = [...new Set(allMeals)]
    return uniqueMeals
  }

  mealTotals() {
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    let summaryObject = {};
    allMeals.forEach(function(meal) {
      summaryObject[meal.id] = 0;
    });
    allMeals.forEach(function(meal) {
      summaryObject[meal.id] += 1;
    });
    return summaryObject;
  }
}
