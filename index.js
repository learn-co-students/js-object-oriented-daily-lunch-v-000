let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;
let store = {customers: [], meals: [], deliveries: [], employers: []}

class Customer {
  constructor(name, employer) {
    this.name = name;
    this.employer = employer;
    this.id = ++customerId;

    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    })
  }

  meals() {
    let customerDeliveries = this.deliveries();

    return store.meals.filter(meal => {
      return customerDeliveries.some(function(el) {
        return el.mealId === meal.id;
      });
    });
  }

  totalSpent() {
    let customerMeals = this.meals();

    return customerMeals.reduce(function(agg, el, i, arr) {
      return agg + el.price
    }, 0);
  }
}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;

    store.meals.push(this);
  }

  static byPrice() {
    return store.meals.sort(function(a, b) {
      return b.price - a.price;
    })
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    })
  }

  customers() {
    let mealDeliveries = this.deliveries();

    return store.customers.filter(customer => {
      return mealDeliveries.some(function(el) {
        return el.customerId === customer.id;
      });
    });
  }
}

class Delivery {
  constructor(meal, customer) {
    if(meal) {
        this.mealId = meal.id;
    }
    if(customer) {
        this.customerId = customer.id;
    }
    this.id = ++deliveryId;

    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find(function(meal){
      return meal.id === this.mealId;
    }.bind(this))
  }

  customer(){
    return store.customers.find(function(customer){
      return customer.id === this.customerId;
    }.bind(this))
  }
}

class Employer {
  constructor(name) {
    this.name = name;
    this.id = ++employerId;

    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(employee => {
      return employee.employer === this;
    })
  }

  deliveries() {
    const currentEmployees = this.employees();

    return store.deliveries.filter(delivery => {
      return currentEmployees.some(function(el) {
        return el.id === delivery.customerId;
      });
    });
  }

  meals() {
    const currentDeliveries = this.deliveries();

    return store.meals.filter(meal => {
      return currentDeliveries.some(function(el) {
        return el.mealId === meal.id;
      });
    });
  }

  mealTotals() {
    let mealCounts = {};
    let currentMeals = this.meals();
    let currentDeliveries = this.deliveries();
    let count = 0;

    for(var i = 0; i < currentMeals.length; i++) {
      for(var j = 0; j < currentDeliveries.length; j++) {
        if(currentMeals[i].id === currentDeliveries[j].mealId) {
          count += 1;
        }
      }
      mealCounts[currentMeals[i].id] = count;
      count = 0;
    }

    return mealCounts
  }
}
