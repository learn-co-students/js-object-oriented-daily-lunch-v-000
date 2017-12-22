let store = { deliveries: [], meals: [], employers: [], customers: [] };

let customerId = 0;
class Customer {
  constructor(name, employer){
    this.id = ++customerId;
    this.name = name;
    if (employer) {
      this.employerId = employer.id;
    }
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    });
  }

  totalSpent(){
    return this.meals().reduce(function(sum, theMeal){
      return sum + theMeal.price;
    }, 0)
  }
};

let mealId = 0;
class Meal {
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    });
  }

  customers() {
    return store.deliveries.map(delivery => {
      return delivery.customer();
    });
  }

  static byPrice(){
    return store.meals.sort((a, b) => {
      return a.price < b.price;
    });
  }
};


let deliveryId = 0;
class Delivery {
  constructor(meal, customer){
    this.id = ++deliveryId;
    if (meal) {
      this.mealId = meal.id;
    }
    if (customer) {
      this.customerId = customer.id;
    }
    store.deliveries.push(this);
  }

  setMeal(meal){
    this.mealId = meal.id
  }

  seCustomer(customer){
    this.customerId = customer.id
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
  }
  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
  }
};


let employerId = 0;
class Employer {
  constructor(name){
    this.id = ++employerId;
    this.name = name;
    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id;
    });
  }

  deliveries() {
    let allDeliveries = this.employees().map(employee => {
      return employee.deliveries();
    });
    let merged = [].concat.apply([], allDeliveries);
    return merged;
  }

  allMeals() {
    return this.deliveries().map(delivery => delivery.meal());
  }

  meals() {
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    let mealChosen = [...new Set(allMeals)];
    return mealChosen;
  }

   mealTotals() {
    return this.allMeals().reduce((totals, meal) => {
      totals[meal.id] = totals[meal.id] || 0;
      totals[meal.id] += 1;

      return totals;
    }, {});
  }

};
