const store = {customers: [], meals: [], deliveries: [], employers: []};
let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

Array.prototype.unique = function() {
  return this.filter(function (value, index, self) { 
    return self.indexOf(value) === index;
  });
}


class Customer {
  constructor(name, employer) {
    if (name) {
      this.name = name;
    }
    if (employer) {
      this.employerId = employer.id;
    }
    this.id = ++customerId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => { return delivery.customerId === this.id });
  }

  meals() {
    return this.deliveries().map(delivery => { return delivery.meal() });
  }

  totalSpent() {
    return this.meals().reduce( function(total, meal){
      return total + meal.price
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

  deliveries() {
    return store.deliveries.filter(delivery => { return delivery.meal() === this});
  }

  customers() {
    return this.deliveries().map(delivery => { return delivery.customer() });
  }

  static byPrice() {
    return store.meals.sort( function(a, b) {
      if (a.price > b.price) {
        return -1;
      } else if (a.price < b.price) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId;
    if (meal) {
      this.mealId = meal.id;
    }
    if (customer) {
      this.customerId = customer.id;
    }
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => { return meal.id === this.mealId });
  }

  customer() {
    return store.customers.find(customer => { return customer.id === this.customerId });
  }
}

class Employer {
  constructor(name){
    this.name = name;
    this.id = ++employerId;
    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(employee => { return employee.employerId === this.id });
  }

  deliveries() {
    return store.deliveries.filter(delivery => { return delivery.customer().employerId === this.id });
  }

  meals() {
    return this.deliveries().map(delivery => { 
      return delivery.meal()
    }).unique();
  }

  mealTotals() {
    const meals = this.deliveries().map(delivery => { return delivery.meal() });
    const totals = {};
    for (let meal of meals) {
      totals[meal.id] = totals[meal.id] || 0;
      totals[meal.id]++
    }
    return totals;
  }
}