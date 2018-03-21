const store = {deliveries: [], meals: [], employers: [], customers: []};

let deliveryId = 0;
let mealId = 0;
let employerId = 0;
let customerId = 0;

class Delivery {
  constructor (meal, customer) {
    this.id = ++deliveryId;
    if (meal) {this.mealId = meal.id;}
    if (customer) {this.customerId = customer.id;}

    store.deliveries.push(this);
  }

  customer () {
    return store.customers.find (customer => {
      return customer.id === this.customerId;
    });
  }

  meal () {
    return store.meals.find (meal => {
      return meal.id === this.mealId;
    });
  }
}

class Meal {
  constructor (title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }

  deliveries () {
    return store.deliveries.filter (delivery => {
      return delivery.mealId === this.id;
    });
  }

  customers () {
    return this.deliveries().map (delivery => {
      return delivery.customer();
    });
  }

  static byPrice () {
    return store.meals.sort (function (a, b) {
      return b.price - a.price;
    });
  }
}

class Employer {
  constructor (name) {
    this.id = ++employerId;
    this.name = name;

    store.employers.push(this);
  }

  employees () {
    return store.customers.filter (customer => {
      return customer.employerId === this.id;
    });
  }

  deliveries () {
    let deliveryArray = []
    this.employees().map(employee => {
      employee.deliveries().map(delivery => {
        deliveryArray.push(delivery);
      });
    });
    return deliveryArray;
  }

  meals () {
    let mealArray = []
    this.deliveries().map(delivery => {
      mealArray.push(delivery.meal());
    });
    return Array.from(new Set(mealArray));
  }

  mealTotals() {
    let obj = {}

    this.meals().map(meal => {
      let customerCount = 0;
      meal.customers().map(customer => {
        ++customerCount;
      });
      obj[meal.id] = customerCount;
    });
    return obj;
  }
}

class Customer {
  constructor (name, employer) {
    this.id = ++customerId;
    this.name = name;
    if (employer) {this.employerId = employer.id;}

    store.customers.push(this);
  }

  deliveries () {
    return store.deliveries.filter (delivery => {
      return delivery.customerId === this.id;
    });
  }

  meals () {
    return this.deliveries().map (delivery => {
      return delivery.meal();
    });
  }

  totalSpent () {
    const cb = function (agg, el, i, arr) {
      return agg += el.price;
    }
    return this.meals().reduce (cb, 0);
  }
}
