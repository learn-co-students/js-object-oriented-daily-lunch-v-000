let store = { customers: [], meals: [], deliveries: [], employers: [] };

let customerId = 0;

class Customer {
  constructor(name, employer = {}) {
    this.id = ++customerId
    this.name = name
    this.employerId = employer.id
    store.customers.push(this)
  }
  deliveries() {
    return store.deliveries.filter(element => {
      return element.customerId === this.id
    })
  }
  meals() {
    return this.deliveries().map(element => {
      return element.meal();
    })
  }
  totalSpent() {
    return this.meals().reduce(function(total, eachMeal) {
      return total + eachMeal.price;
    }, 0)
  }
} 

let mealId = 0;

class Meal {
  constructor(title, price) {
    this.id = ++mealId,
    this.title = title,
    this.price = price
    store.meals.push(this)
  }
  deliveries() {
    return store.deliveries.map(element => {
      if (element.mealId === this.id) {
        return element
      }
    })
  } 
  customers() {
    return store.deliveries.map(element => {
      return element.customer();
    })
  }
  static byPrice() {
    return store.meals.sort((meala, mealb) => {
      return meala.price < mealb.price
    })
  }
}

let deliveryId = 0;

class Delivery {
  constructor(meal = {}, customer = {}) {
    this.id = ++deliveryId
    this.mealId = meal.id
    this.customerId = customer.id

    store.deliveries.push(this)
  }
  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    })
  }
  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    })
  }
}

let employerId = 0;

class Employer {
  constructor(name) {
    this.id = ++employerId,
    this.name = name

    store.employers.push(this)
  }
  employees() {
    return store.customers.filter(element => {
      return element.employerId === this.id
    })
  }
  deliveries() {
    let totalDeliveries = this.employees().map(element => {
      return element.deliveries();
    })
    let pushed = [].concat.apply([], totalDeliveries)
    return pushed;
  }
  meals() {
    let totalMeals = this.deliveries().map(element => {
      return element.meal();
    })
    let unique = [...new Set(totalMeals)];
    return unique;
  }
  mealTotals() {
    let totalMeals = this.deliveries().map(element => {
      return element.meal();
    })
    let allObjects = {};
    totalMeals.forEach(meal => {
      allObjects[meal.id] = 0;
    })
    totalMeals.forEach(meal => {
      allObjects[meal.id] += 1;
    })
    return allObjects;
  }
}