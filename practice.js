store = {deliveries: [], drivers: [], meals: [], employers: [], customers: []}

// Build all the clases: Customer, Meal, Delivery, Employer


// Customer

let customerId = 0
let totalAmount = 0
class Customer {
  // remember: {} is an object
  constructor(name, employer = {}) {
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer.id
    store.customers.push(this)
  }
  meals() {
    // .map generates a new array based on cb or conditions, in this case, we just want to gather all the 'meal'
    return store.meals.map(meal =>{
      return meal
    })
  }
  deliveries() {
    return store.deliveries.filter(delivery =>{
      return delivery.customerId === this.id
    })
  }
  // total amount spent
  totalSpent() {
    return for(meal in this.deliveries) {
      return totalAmount + meal.price
    }
  }
}

let customer = new Customer('bob')
// console.log(customer.name)
// console.log(store.customers)
console.log(customer.totalSpent())



// Delivery

let deliveryId = 0
class Delivery {
  constructor(meal = {}, customer = {}) {
    this.id = ++deliveryId;
    this.mealId = meal.id;
    this.customerId = customer.id;

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
      return delivery.mealId === this.id
    })
  }
  // returns all of the customers who have had the meal delivered.
  customers() {
    return store.customers.map(customer =>{
      return customer
    })
  }
  // class method that orders the meals by their price

  // Class methods are methods that are not called on an instance of the class, but on the class itself, for example Meal.byPrice() is a class method as it is called on the Meal class
  static byPrice() {
    return store.meals.sort(function(a,b) {
      return b.price-a.price;
    })
  }
}

let meal = new Meal('sandwich')
// console.log(meal.title)
// console.log(store.meals)

// Employer
let employerId = 0
class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;

    store.employers.push(this)
  }
  // employees() function returns list of customers
  employees() {
    return store.customers.filter(customer =>{
      return customer.employerId === this.id;
    })
  }
  // deliveries() returns a list of deliveries ordered by the employer's employees
  deliveries() {
    return store.deliveries.filter(delivery =>{
      return delivery.customerId === this.id;
    })
  }
}
