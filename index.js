const store = {customers: [], employers: [], meals: [], deliveries: []};

let customerId = 0;
let employerId = 0;
let mealId = 0;
let deliveryId = 0;

class Customer {
  constructor(name, employer) {
    this.id = ++customerId;
    this.name = name;
    if (employer) {
      this.employerId = employer.id;
    }
    store.customers.push(this);
  }

  meals() {
    let arr = [];
    this.deliveries().forEach(function(delivery) {
      arr.push(delivery.meal());
    });
    return arr;
  }

  deliveries() {
    return store.deliveries.filter(function(delivery){
      return delivery.customerId === this.id;
    }.bind(this));
  }

  totalSpent() {
    return this.meals().reduce(function(agg, meal) {
      return agg += meal.price;
    }, 0);
  }
}

class Employer {
  constructor(name) {
    this.id = ++employerId
    this.name = name;
    store.employers.push(this);
  }
  employees() {
    return store.customers.filter(function(customer) {
      return customer.employerId === this.id;
    }.bind(this));
  }
  deliveries() {
    let arr = [];
    this.employees().forEach(function(employee) {
      employee.deliveries().forEach(function(delivery) {
        arr.push(delivery);
      });
    });
    return arr;
  }
  mealsRepeated() {
    let arr = [];
    this.deliveries().forEach(function(delivery) {
      arr.push(delivery.meal());
    })
    return arr;
  }
  meals() {
    let arr = [];
    this.deliveries().forEach(function(delivery) {
      if (!arr.includes(delivery.meal())) {
        arr.push(delivery.meal());
      }
    })
    return arr;
  }
  mealTotals() {
    let obj = {};
    this.mealsRepeated().forEach(function(meal) {
      if (obj[meal.id]) {
        obj[meal.id] += 1;
      } else {
        obj[meal.id] = 1;
      }
    })
    return obj;
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }
  deliveries() {
    return store.deliveries.filter(function(delivery){
      return delivery.mealId === this.id;
    }.bind(this));
  }
  customers() {
    return store.customers.filter(function(customer) {
      return this.deliveries().filter(function(delivery) {
        return delivery.customerId === customer.id;
      });
    }.bind(this));
  }
  static byPrice() {
    return store.meals.sort(function(a, b) {
      return b.price - a.price;
    });
  }
}

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId;
    if (meal) {
      this.mealId = meal.id
    }
    if (customer) {
      this.customerId = customer.id;
    }
    store.deliveries.push(this);
  }
  meal() {
    return store.meals.find(function(meal) {
      return meal.id === this.mealId;
    }.bind(this));
  }
  customer() {
    return store.customers.find(function(customer) {
      return customer.id === this.customerId;
    }.bind(this));
  }
}