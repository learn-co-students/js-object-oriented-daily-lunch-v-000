store = {deliveries: [], drivers: [], meals: [], employers: [], customers: []}

// Build all the clases: Customer, Meal, Delivery, Employer


// Customer

let customerId = 0
class Customer {
  constructor(name) {
    this.id = ++customerId;
    this.name = name;

    store.customers.push(this)
  }
  meals() {
    return store.meals.filter(meal =>{
      return meal.customerId = this.id
    })
  }
  deliveries() {
    return store.deliveries.filter(delivery =>{
      return delivery.customerId = this.id
    })
  }
}

// Delivery

let deliveryId = 0
class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.customerId = customerId;

    store.deliveries.push(this)
  }
  meal() {
    return store.meals.find((meal) =>{return meal.id === this.mealId})
  }
  customer() {
    return store.customers.find((customer) => {return customer.id === this.customerId})
  }
}

// Meal
let mealId = 0
class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery =>{
      return delivery.mealId = this.id
    })
  }
  customers() {
    return store.customers.filter(customer =>{
      return customer.mealId = this.id
    })
  }
}

// Employer
let employerId = 0
class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;

    store.employers.push(this)
  }
}
