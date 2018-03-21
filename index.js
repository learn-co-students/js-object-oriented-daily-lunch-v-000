let store = {deliveries: [], meals: [], employers: [], customers: []};
let customerId = 0;
let deliveryId = 0;
let mealId = 0;
let employerId = 0;

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId;
    if (meal) this.mealId = meal.id;
    if (customer) this.customerId = customer.id;
    store.deliveries.push(this);
  }
  customer() {
    return store.customers.find(function (customer) {
      return customer.id === this.customerId;
    }.bind(this));
  }
  meal() {
    return store.meals.find(function (meal) {
      return meal.id === this.mealId;
    }.bind(this));
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }
  deliveries() {
    return store.deliveries.filter(function (delivery) {
      return delivery.mealId === this.id;
    }.bind(this));
  }
  customers() {
    return store.deliveries.map(function (delivery) {
      return delivery.customer();
    })
  }
  static byPrice() {
    return store.meals.sort(function (mealA, mealB) {
      return mealB.price - mealA.price;
    })
  }
}

class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;

    store.employers.push(this);
  }
  employees() {
    return store.customers.filter(function (customer) {
      return customer.employerId === this.id
    }.bind(this));
  }
  deliveries() {
    let arrays = this.employees().map(function (customer) {
      return customer.deliveries();
    });
    return arrays[0].concat(arrays[1])
  }
  meals() {
    let meals = this.deliveries().map(function (delivery) {
      return delivery.meal();
    });
    return meals.filter(function (meal, index) {
      return meals.indexOf(meal) === index;
    })
  }
  mealTotals() {
    let mealCounter = 1;
    return this.deliveries().reduce(function (obj, delivery) {
      if (obj[delivery.mealId] && obj.hasOwnProperty(delivery.mealId)) {
        obj[delivery.mealId] = mealCounter + 1;
        return obj;
      } else {
        obj[delivery.mealId] = mealCounter;
        return obj;
      }
    }, {})
  }
}

class Customer {
  constructor(name, employer) {
    this.id = ++customerId;
    this.name = name;
    if (employer) {
      this.employerId = employer.id;
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
    })
  }
  totalSpent() {
    return this.meals().reduce(function (sum, meal) {
      return sum + meal.price;
    },0)
  }
}
