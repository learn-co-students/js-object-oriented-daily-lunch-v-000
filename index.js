let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

let store = {customers:[], meals:[], deliveries:[], employers:[]}

class Customer {
  constructor(name, employer = {}) {
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer.id;

    store.customers.push(this);

  }

  //has many deliveries
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  }

  //has many meals through deliveries
  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    });
  }

  totalSpent() {
    return this.meals().reduce(function(sum, meal) {
      return sum + meal.price;
    }, 0)
  }

}

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }

  //has many deliveries
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    });
  }

  //has many customers through deliveries
  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    });
  }

  //statice keyword denotes class level method
  static byPrice() {
    return store.meals.sort(function (meal1, meal2) {
      return meal1.price < meal2.price;
    });
  }

}

class Delivery {
  constructor(meal = {}, customer = {}) {
    this.id = ++deliveryId;
    this.mealId = meal.id;
    this.customerId = customer.id;

    store.deliveries.push(this);
  }

  //belongs to meal
  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
  }

  //belongs to customer 
  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    })
  }

}

class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;

    store.employers.push(this);
  }

  //has many employees(customers)
  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id;
    });
  }

  //has many deliveries through employees(customers)
  deliveries() {
    let allDeliveries = this.employees().map(employee => {
      return employee.deliveries();
    });
    let merged = [].concat.apply([], allDeliveries);
    return merged;
  }

  //has many meals through employees(customers)
  meals(){
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    return allMeals.filter((v, i, a) => a.indexOf(v) === i); 
  }

  mealTotals() {
    //find all meals ordered by employees(customers)
    //cannot use above as we do not want to exclude duplicate orders
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    //create object to store count
    let mealCountObj = {};
    //iterate through allMeals and add key value pairs as needed and/or increase count
    allMeals.forEach(function(meal) {
      if (!mealCountObj[meal.id]) {
        mealCountObj[meal.id] = 1;
      } else {
        mealCountObj[meal.id] += 1;
      }
    });
    return mealCountObj;
  }

}




