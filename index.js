let customerID = 0;
let mealID = 0;
let deliveryID = 0;
let employerID = 0;
const store = {customers: [], meals: [], deliveries: [], employers: []};

class Customer {
  constructor (name, employer) {
    this.id = ++customerID;
    this.name = name;
    if (employer) {
      this.employerId = employer.id;
    }
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {return delivery.customerId === this.id;});
  }

  meals() {
    return this.deliveries().map(delivery => {return delivery.meal();});
  }

  totalSpent() {
    return this.meals().reduce(function (aggregatePrice, meal) {return aggregatePrice += meal.price}, 0);
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++ mealID;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {return delivery.mealId === this.id;})
  }

  customers() {
    return this.deliveries().map(delivery => {return delivery.customer();});
  }

  static byPrice () {
    return store.meals.sort((meal1, meal2) => {return meal2.price - meal1.price;});
  }
}

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryID;
    if (meal) {
      this.mealId = meal.id;
    }
    if (customer) {
      this.customerId = customer.id;
    }
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(meal => {return meal.id === this.mealId;});
  }

  customer() {
    return store.customers.find(customer => {return customer.id === this.customerId;});
  }
}

class Employer {
  constructor(name) {
    this.id = ++employerID;
    this.name = name;
    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(customer => {return customer.employerId === this.id;});
  }

  deliveries() {
    return this.employees().map(employee => {return employee.deliveries();}).reduce(function (aggregateArray, arrayElement) {return aggregateArray.concat(arrayElement)}, []);
  }

  meals() {
    const allMeals = this.deliveries().map(delivery => {return delivery.meal();});
    const uniqueMeals = [...new Set(allMeals)];
    return uniqueMeals;
  }

  mealTotals() {
    const mealTotalSummary = {}
    const mealIDs = this.meals().map(meal => {return meal.id});
    mealIDs.forEach(id => {mealTotalSummary[id] = 0;})
    const allMeals = this.deliveries().map(delivery => {return delivery.meal();});
    allMeals.forEach(meal => {mealTotalSummary[meal.id] += 1})
    return mealTotalSummary;
  }
}
