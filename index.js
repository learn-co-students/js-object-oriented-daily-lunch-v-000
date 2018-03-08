let store = {customers: [], meals: [], deliveries: [], employers: []};
let customerID = 0;
let mealID = 0;
let deliveryID = 0;
let employerID = 0;


class Customer {
  constructor(name, employer = {}) {
    this.id = customerID++;
    this.employerId = employer.id;
    this.name = name;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId == this.id;
    });
  }

  meals(){
    let allMeals =  this.deliveries().map(delivery=>{
      return delivery.meal();
    });
    return [].concat(...allMeals);
  }

  totalSpent(){
    return this.meals().reduce((a, b) => +a + +b.price, 0);
  }

}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = mealID++;
    store.meals.push(this);
  }
  deliveries(){
    return store.deliveries.filter( delivery => {
      return delivery.mealId === this.id;
    });
  }

  customers(){
    let allCustomers = this.deliveries().map( delivery => {
      return delivery.customer();
    });
    return [].concat(...allCustomers);
  }

  static byPrice(){
    return store.meals.sort((a, b) => Number(b.price) - Number(a.price));
  }
}

class Delivery {
  constructor(meal = {}, customer = {}) {
    this.mealId = meal.id;
    this.customerId = customer.id;
    this.id = deliveryID++;
    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find( meal => {
      return meal.id === this.mealId;
    })
  }

  customer(){
    return store.customers.find( customer => {
      return customer.id === this.customerId;
    })
  }

}

class Employer {
  constructor(name) {
    this.name = name;
    this.id = employerID++;
    store.employers.push(this);
  }

  employees(){
    return store.customers.filter(customer => {
      return customer.employerId === this.id;
    })
  }

  deliveries() {
    let allDeliveries = this.employees().map(employee => {
      return employee.deliveries();
    });
    return [].concat(...allDeliveries);
  }

  meals() {
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    let uniqueMeals =  Array.from(new Set(allMeals));
    return [].concat(...uniqueMeals);
  }

  mealTotals(){
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    let Flatmeals = [].concat(...allMeals);
    let mealTotals = {};
    Flatmeals.forEach(meal => {
      mealTotals[meal.id] = 0;
    });
    Flatmeals.forEach(meal => {
      mealTotals[meal.id] += 1;
    });
    return mealTotals;

  }

}
