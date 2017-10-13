let store = {customers: [], meals: [], deliveries: [], employers: []};

let customerId = 0;

class Customer {
  constructor (name, employer) {
    this.id = ++customerId;
    this.name = name;
    if (employer) {
      this.employerId = employer.id;
    }
    store.customers.push(this);
  }

  meals () {
    return this.deliveries().map(function (delivery) {
      return delivery.meal();
    });
  }

  deliveries () {
    return store.deliveries.filter(function (delivery) {
      return delivery.customerId === this.id;
    }.bind(this));
  }

  totalSpent() {
    const reduceMealPrices = function (agg, el) {
      return agg + el.price;
    };
    return this.meals().reduce(reduceMealPrices, 0);
  }
}

let mealId = 0;

class Meal {
  constructor (title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries () {
    return store.deliveries.filter(function (delivery) {
      return delivery.mealId === this.id;
    }.bind(this));
  }

  customers () {
    return this.deliveries().map(function (delivery) {
      return delivery.customer();
    });
  }

  static byPrice () {
    const priceSorter = function (objA, objB) {
      return objB.price - objA.price;
    };
    return store.meals.sort(priceSorter);
  }
}

let deliveryId = 0;

class Delivery {
  constructor (meal, customer) {
    this.id = ++deliveryId;
    if (meal) {
      this.mealId = meal.id;
    }
    if (customer) {
      this.customerId = customer.id;
    }
    store.deliveries.push(this);
  }

  meal () {
    return store.meals.find(function (meal) {
      return meal.id === this.mealId;
    }.bind(this));
  }

  customer () {
    return store.customers.find(function (customer) {
      return customer.id === this.customerId;
    }.bind(this));
  }
}

let employerId = 0;

class Employer {
  constructor (name) {
    this.id = ++ employerId;
    this.name = name;
    store.employers.push(this);
  }

  employees () {
    return store.customers.filter(function (customer) {
      return customer.employerId === this.id;
    }.bind(this));
  }

  deliveries () {
    const allDeliveries = this.employees().map(function (employee) {
      return employee.deliveries();
    });
    const mergedDeliveries = [].concat.apply([], allDeliveries);
    return mergedDeliveries;
  }

  allMeals () {
    return this.deliveries().map(function (delivery) {
      return delivery.meal();
    });
  }

  meals () {
    const uniqueMeals = [...new Set(this.allMeals())];
    return uniqueMeals;
  }

  mealTotals () {
    let summaryObject = {};
    this.allMeals().forEach(function (meal) {
      summaryObject[meal.id] = 0;
    });
    this.allMeals().forEach(function (meal) {
      summaryObject[meal.id] += 1;
    });
    return summaryObject;
  }
}
