let store = {deliveries: [], meals: [], employers: [], customers: []}

//Delivery
let deliveryId = 0;
class Delivery {
  constructor(meal = {}, customer = {}){
    this.id = ++deliveryId;
    this.mealId = meal.id;
    this.customerId = customer.id;
    store.deliveries.push(this);
  }
  meal() {
    return store.meals.find( meal => meal.id === this.mealId)
  }
  customer() {
    return store.customers.find( customer => customer.id === this.customerId)
  }
}

//Meal
let mealId = 0;
class Meal {
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }
  static byPrice(){
    return store.meals.sort((meal1, meal2) => {
      return meal1.price < meal2.price
    })
  }
  deliveries(){
    return store.deliveries.filter( delivery => {
      return delivery.mealId === this.id
    })
  }
  customers(){
    return this.deliveries().map( delivery => {
      return delivery.customer();
    })
  }
}

//Employers
let employerId = 0;
class Employer {
  constructor(name){
    this.id = ++employerId;
    this.name = name
    store.employers.push(this);
  }
  employees(){
    return store.customers.filter( customer => {
      return customer.employerId === this.id;
    })
  }
  deliveries(){
    let allDeliveries = this.employees().map( employee => {
      return employee.deliveries()
    })
    let combined = [].concat.apply([], allDeliveries);
    return combined;
  }
  meals(){
    let allMeals = this.deliveries().map( delivery => {
      return delivery.meal();
    })
    let uniqueMeals = [...new Set(allMeals)];
    return uniqueMeals;
  }
  mealTotals(){
    let allMeals = this.employees().reduce(function(all, employee) {
      return all.concat(employee.meals())
    }, [])

    let stats = {};
    allMeals.forEach(function(meal) {
      if (stats[meal.id] === undefined){
        stats[meal.id] = 1;
      } else {
        stats[meal.id] += 1;
      }
    })
    return stats;
  }
}

//Customers
let customerId = 0;
class Customer {
  constructor(name, employer = {}){
    this.id = ++customerId;
    this.name = name
    this.employerId = employer.id;
    store.customers.push(this);
  }
  deliveries(){
    return store.deliveries.filter( delivery => {
      return delivery.customerId === this.id
    })
  }
  meals() {
    return this.deliveries().map( delivery => {
      return delivery.meal();
    })
  }
  totalSpent(){
    return this.meals().reduce(function(sum, meal) {
      return sum + meal.price;
    }, 0)
  }
}
