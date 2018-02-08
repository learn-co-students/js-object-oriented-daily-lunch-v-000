let store = {customers:[], deliveries:[], employers:[], meals: []}

let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

class Customer {
  constructor(name, employer){
    this.id = ++customerId
    this.name = name
    this.employer = employer
    store.customers.push(this)
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }
  
  meals() {
    return this.deliveries().map(delivery =>{
      return delivery.meal()
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
  
  static byPrice() {
    return store.meals.sort((a, b) => {
      return a.price < b.price
    })
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }
  
  customers() {
    return store.customers.filter(customer => {
      return store.deliveries.filter(delivery =>{
        return delivery.mealId === this.id
      })
    })
  }
  
}

class Delivery {
  constructor(meal = {}, customer= {}) {
    this.id = ++deliveryId
    this.mealId = meal.id
    this.customerId = customer.id
    store.deliveries.push(this)
  }
  
  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }
  
  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId
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
    return store.customers.filter(customer => {
      return customer.employer.id === this.id
    })
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customer().employer.id === this.id
    })
  }
  
  meals() {
    let allMeals = this.deliveries().map(delivery =>{
      return delivery.meal()
    });
    
    let uniqueMeals = [...new Set(allMeals)]
    return uniqueMeals;
  }
  
  mealTotals() {
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    
    let sumObj = {};
    
    allMeals.forEach(function(meal) {
      sumObj[meal.id] = 0;
    });
    allMeals.forEach(function(meal) {
      sumObj[meal.id] += 1;
    });
    return sumObj;
    }
}