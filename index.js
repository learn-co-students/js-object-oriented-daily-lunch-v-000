let store = {deliveries: [], meals: [], employers: [], customers: []}
let deliveryId = 0;
let mealId = 0;
let employerId = 0;
let customerId = 0;

class Delivery {

  constructor(meal, customer) {
    if (meal) {this.mealId = meal.id}
    if (customer) {this.customerId = customer.id}
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

  customer() {return store.customers.find(customer => {return customer.id === this.customerId})}
  meal() {return store.meals.find(meal => {return meal.id === this.mealId})}

}

class Meal {

  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  deliveries() {return store.deliveries.filter(delivery => {return delivery.mealId === this.id})}
  customers() {return this.deliveries().map(delivery => {return delivery.customer()})}



  static byPrice() {return store.meals.sort(function(meal1, meal2) {
    return meal1.price < meal2.price;
  })}

  // More ways to sort the same array of objects:

  // static byPrice() {return store.meals.sort(function(meal1, meal2) {
  //   if (meal1.price > meal2.price)
  //     return -1;
  //   else if (meal1.price < meal2.price)
  //     return 1;
  //   else
  //     return 0;
  //   })
  // }

  // static byPrice() {
  //   let sorter = function(el1, el2) {
  //     return el1.price < el2.price;
  //   };
  //   return store.meals.sort(sorter)
  // }

  // static byPrice() {let sorter = function(meal1, meal2) {
  //   if (meal1.price > meal2.price)
  //     return -1;
  //   else if (meal1.price < meal2.price)
  //     return 1;
  //   else
  //     return 0;
  //   };
  // return store.meals.sort(sorter);
  // }

}

class Employer {

  constructor(name) {
    this.name = name;
    this.id = ++ employerId;
    store.employers.push(this);
  }

  employees() {return store.customers.filter(customer => {return customer.employerId === this.id})}
  deliveries() {return this.employees().map(customer => {return customer.deliveries()}).reduce(
    function(a, b) {
      return a.concat(b);
    }
  )}

  meals() {let allMeals = this.employees().map(customer => {return customer.meals()}).reduce(
    function(a, b) {
      return a.concat(b);
    });
    let uniqueMeals = [...new Set(allMeals)];
    return uniqueMeals;
  }


  mealTotals() {
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal()
    });
    let stats = {};
    allMeals.forEach(function(meal){
      stats[meal.id] = 0;
    });
    allMeals.forEach(function(meal){
      stats[meal.id] += 1;
    });
    return stats
  }

}

class Customer {

  constructor(name, employer) {
    this.name = name;
    if (employer) {this.employerId = employer.id}
    this.id = ++customerId;
    store.customers.push(this);
  }

  deliveries() {return store.deliveries.filter(delivery => {return delivery.customerId === this.id})}
  meals() {return this.deliveries().map(delivery => {return delivery.meal()})}

  totalSpent() {return this.meals().reduce(function(agg, meal){
    return agg + meal.price;
  }, 0)}

}
