let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

let store = {customers: [], meals: [], deliveries: [], employers: []};

class Customer {
  constructor (name, employer) {
    this.name = name;
    this.id = ++customerId;

    if (employer) {
      this.employerId = employer.id;
    }

    store.customers.push(this);
  }

  deliveries () {
    return store.deliveries.filter(function(delivery) {
      return delivery.customerId === this.id;
    }.bind(this));
  }

  meals () {
    return this.deliveries().map(function(delivery) {
      return delivery.meal();
    });
  }

  totalSpent () {
    return this.meals().reduce(this.addPricesOfMeals, 0);
  }

  addPricesOfMeals (acc, ele) {
    return acc += ele.price;
  }
}

class Meal {
  constructor (title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }

  static byPrice () {
    return store.meals.sort(function(meal1, meal2) {
      return meal2.price - meal1.price;
    });
  }

  deliveries () {
    return store.deliveries.filter(function(delivery) {
      return delivery.mealId === this.id;
    }.bind(this));
  }

  customers () {
    return this.deliveries().map(function(delivery) {
      return delivery.customer();
    });
  }
}

class Delivery {
  constructor (meal, customer) {
    this.id = ++deliveryId;
    if (meal) { this.mealId = meal.id; }
    if (customer) { this.customerId = customer.id; }

    store.deliveries.push(this);
  }

  meal () {
    return store.meals.find(function(meal) {
      return meal.id === this.mealId;
    }.bind(this));
  }

  customer () {
    return store.customers.find(function(customer) {
      return customer.id === this.customerId;
    }.bind(this));
  }
}

class Employer {
  constructor (name) {
    this.id = ++employerId;
    this.name = name;

    store.employers.push(this);
  }

  employees () {
    return store.customers.filter(function(customer) {
      return customer.employerId === this.id;
    }.bind(this));
  }

  deliveries () {
    const allDeliveries = this.employees().map(function(employee) {
      return employee.deliveries();
    });

    return [].concat.apply([], allDeliveries);
  }

  allMeals () {
    return this.deliveries().map(function(delivery) {
      return delivery.meal();
    });
  }

  meals () {
    let uniqueMeals = [];
    let mealIdTracker = [];

    const allMeals = this.allMeals();

    allMeals.map(function(meal) {
      if (!mealIdTracker.includes(meal.id)) {
        uniqueMeals.push(meal);
        mealIdTracker.push(meal.id);
      }
    });
    return uniqueMeals;
  }

  mealTotals () {
    let stats = {};
    this.allMeals().map(function(meal) {
      if (meal.id in stats) {
        stats[meal.id] += 1;
      } else {
        stats[meal.id] = 1;
      }
    });
    return stats;
  }
}
