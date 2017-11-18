let store = { employers: [], customers: [], meals: [], deliveries: [] };

let employerId = 0;

class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;

    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(function (customer) {
      return customer.employerId === this.id;
    }.bind(this));
  }

  deliveries() {
    const deliveriesCompoundedArr = this.employees().map(function (employee) {
      return employee.deliveries();
    });

    const coDeliveries = [].concat.apply(...deliveriesCompoundedArr);
    return coDeliveries;
  }

  meals() {
    const allMeals = this.deliveries().map(function (delivery) {
      return delivery.meal();
    });

    return allMeals.filter(function (elem, pos, arr) {
      return arr.indexOf(elem) == pos;
    });
  };

  mealTotals() {
    const mealsArr = this.deliveries().map(function (delivery) {
      return delivery.meal();
    });

    let mealCount = {};

    mealsArr.forEach(function (meal) {
      // setting the meal ids as the key in mealCount hash
      mealCount[meal.id] = 0;
    });

    mealsArr.forEach(function (meal) {
      // adds num of meal baised on id???
      mealCount[meal.id] += 1;
    });

    return mealCount;
  }
}

let customerId = 0;

class Customer {
  constructor(name, employerObj) {
    this.id = ++customerId;
    this.name = name;

    if (employerObj) {
      this.employerId = employerObj.id;
    }

    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(function (delivery) {
      return delivery.customerId === this.id;
    }.bind(this));
  }

  meals() {
    return this.deliveries().map(function (delivery) {
      return delivery.meal();
    });
  }

  totalSpent() {
    return this.meals().reduce(function (agg, element) {
      return agg += element.price;
    }, 0);
  }
}

let mealId = 0;

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }

  static byPrice() {
    return store.meals.sort(function (meal1, meal2) {
      return (meal2.price) - (meal1.price);
    });
  }

  deliveries() {
    return store.deliveries.filter(function (delivery) {
      return delivery.mealId === this.id;
    }.bind(this));
  }

  customers() {
    return this.deliveries().map(function (delivery) {
      return delivery.customer();
    });
  }
}

let deliveryId = 0;

class Delivery {
  constructor(mealOjb, customerObj) {
    this.id = ++deliveryId;

    if (mealOjb) {
      this.mealId = mealOjb.id;
    }

    if (customerObj) {
      this.customerId = customerObj.id;
    }

    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(function (meal) {
      return meal.id === this.mealId;
    }.bind(this));
  }

  customer() {
    return store.customers.find(function (customer) {
      return customer.id === this.customerId;
    }.bind(this));
  }
}
