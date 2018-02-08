let store = {customers:[], deliveries:[], employers:[], meals: []}

let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;



class Customer {
  constructor(name, employer= {}) {
    this.id = ++customerId
    this.name = name
    this.employerId = employer.id
    store.customers.push(this)
  }
  
  meals() {
    // returns all of the meals that a customer has had delivered
    return this.deliveries().map(delivery => { // Return all customer(this).deliveries
      return delivery.meal()  // By returning all delivery.meal(s)
    })
  }
  
  deliveries() {
    // returns all of the deliveries that customer has received
    return store.deliveries.filter(delivery => { // Filter all deliveries where
      return this.id === delivery.customerId // this(customers)id matches delivery.customerId
    })
  }
  
  totalSpent() {
    return this.meals().reduce((total, meal) => {
      return total += meal.price
    }, 0)
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price
    
    store.meals.push(this)
  }
  static byPrice(){
    return store.meals.sort((a, b) => {
      return a.price < b.price
    })
  }
  
  deliveries() {
    // returns all of the deliveries that delivered the particular meal.
    return store.deliveries.filter(el => { // Filter all deliveries where
      return this.id === el.mealId // this(meal).id matches the delivery.mealId
    })
  }
  
  customers() {
    // returns all of the customers who have had the meal delivered.
    return store.customers
  }
}

class Delivery {
  constructor(meal= {}, customer= {}) {
    this.id = ++deliveryId
    this.mealId = meal.id
    this.customerId = customer.id
    store.deliveries.push(this)
  }
  
  meal() {
    // returns the meal associated with the delivery
    return store.meals.find(meal => { // Find the meal 
      return this.mealId === meal.id // That matches this(delivery).mealId to meal.id
    })
  }
  
  customer() {
  // returns the customer associated with the delivery
    return store.customers.find(customer => { // Find the customer
      return this.customerId === customer.id // That matches this(delivery).customerId to customer.id
    })
  }
}

class Employer {
  constructor(name) {
    this.id = ++employerId
    this.name = name
    store.employers.push(this)
  }
  
  employees() {
    // returns a list of customers employed by the employer
    return store.customers.filter(customer => {
      return this.id === customer.employerId
    })
  }
  
  deliveries() {
    // What the fuck...
    // returns a list of deliveries ordered by the employer's employees
    let allDeliveries = this.employees().map(employee => { 
      // Return all deliveries by all customers of this employer
      // This is an array of 2 delivery objects
      return employee.deliveries()
    })
    // Make new array, concat both arrays while apply each delivery object
    return [].concat.apply([], allDeliveries)
  }
  
  meals() {
    // returns a list of meals ordered by the employer's employees. The method is to not return the same meal multiple times.
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    
    let uniqueMeals = [...new Set(allMeals)]
    return uniqueMeals;
  }
  
  mealTotals() {
    // What the even more fuck??
    // returns a JavaScript object displaying each respective meal id ordered by the employer's employees
    // Get all the employees meals by getting every delivery meal per employee
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    // Create a new sum object
    let sumObj = {};
    // For each delivery meal, set the meal.id = 0
    allMeals.forEach(meal => {
      sumObj[meal.id] = 0
    })
    // Iterate through each delivery.mealId by adding it to the sumObj
    allMeals.forEach(meal => {
      sumObj[meal.id] +=1
    })
    
    return sumObj
  }
}
