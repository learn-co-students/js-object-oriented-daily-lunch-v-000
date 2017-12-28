let store = { deliveries: [], customers: [], employers: [], meals: [] }

let mealId = 0
let customerId = 0
let employerId = 0
let deliveryId = 0

class Delivery {
  constructor(meal = {}, customer = {}) {
    this.id = ++deliveryId
    this.mealId = meal.id
    this.customerId = customer.id

    store.deliveries.push(this)
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }
}

class Customer {
  constructor(name, employer = {}) {
    this.id = ++customerId
    this.name = name
    this.employerId = employer.id

    store.customers.push(this)
  }

  totalSpent(){
    return this.meals().reduce(function(sum, theMeal){
      return sum + theMeal.price;
    }, 0)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
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
    return store.meals.sort(function(meal1, meal2){
      return meal1.price < meal2.price
    })
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }
}

class Employer {
  constructor(name) {
    this.id = ++employerId
    this.name = name

    store.employers.push(this)
  }

  allMeals() {
    return this.deliveries().map(delivery => delivery.meal());
  }
  
  mealTotals() {
   return this.allMeals().reduce((totals, meal) => {
     totals[meal.id] = totals[meal.id] || 0;
     totals[meal.id] += 1;

     return totals;
   }, {});
 }

  employees(){
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    })
  }

  deliveries(){
    let allDeliveries = this.employees().map(employee => {
      return employee.deliveries();
    });
    let merged = [].concat.apply([], allDeliveries);
    return merged;
  }

  meals() {
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });

    let uniqueMeals = [...new Set(allMeals)];
    return uniqueMeals;
  }
}
