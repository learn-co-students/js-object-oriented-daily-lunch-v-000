const store = {
  customers: [],
  meals: [],
  deliveries: [],
  employers: []
};

class Customer {
  constructor(name, employer) {
    this.name = name;
    if (typeof employer !== "undefined") {
      this.employerId = employer.id;
    }
    this.constructor.currentId++;
    this.id = this.constructor.currentId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(deliv => {
      return deliv.customerId === this.id;
    });
  }

  meals() {
    return this.deliveries().map(function(deliv) {
      return deliv.meal();
    });
  }

  totalSpent() {
    let result = 0;
    this.meals().forEach(meal => (result += meal.price));
    return result;
  }
}
Customer.currentId = 0;

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.constructor.currentId++;
    this.id = this.constructor.currentId;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(deliv => {
      return deliv.mealId === this.id;
    });
  }

  customers() {
    return this.deliveries().map(function(deliv) {
      return deliv.customer();
    });
  }

  static byPrice() {
    return store.meals.sort((a, b) => {
      return b.price - a.price;
    });
  }
}
Meal.currentId = 0;

class Delivery {
  constructor(meal, customer) {
    store.deliveries.push(this);
    if (typeof meal !== "undefined") {
      this.mealId = meal.id;
    }
    if (typeof customer !== "undefined") {
      this.customerId = customer.id;
    }

    this.constructor.currentId++;
    this.id = this.constructor.currentId;
  }

  customer() {
    return store.customers.find(cust => {
      return cust.id === this.customerId;
    });
  }
  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
  }
}
Delivery.currentId = 0;

class Employer {
  constructor(name) {
    this.name = name;
    this.constructor.currentId++;
    this.id = this.constructor.currentId;
    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(cust => {
      return cust.employerId === this.id;
    });
  }
  deliveries() {
    return store.deliveries.filter(deliv => {
      return this.employees().includes(deliv.customer());
    });
  }

  meals() {
    let delivMeals = this.deliveries().map(deliv => {
      return deliv.meal();
    });
    return store.meals.filter(meal => {
      return delivMeals.includes(meal);
    });
  }

  mealTotals() {
    let mealCounts = {};
    let delivMeals = this.deliveries().map(deliv => {
      return deliv.meal();
    });
    delivMeals.forEach(meal => {
      if (mealCounts[meal.id] === undefined) {
        mealCounts[meal.id] = 1;
      } else {
        ++mealCounts[meal.id];
      }
    });
    return mealCounts;
  }
}
Employer.currentId = 0;
