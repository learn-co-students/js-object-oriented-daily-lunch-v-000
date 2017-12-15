Array.prototype.unique = function() {
  return this.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
}

let store = {deliveries: [], meals: [], employers: [], customers: []};

let deliveryId = 0;
let mealId = 0;
let employerId = 0;
let customerId = 0;

class Delivery {
  constructor(meal = {}, customer = {}) {
    this.id = ++deliveryId;
    this.mealId = meal.id;
    this.customerId = customer.id;
    store.deliveries.push(this);
  }

  constructor(meal, customer) {
    this.id = ++deliveryId;
    if (meal && customer) {
      this.mealId = meal.id;
      this.customerId = customer.id;
    }
    store.deliveries.push(this);
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  static byPrice() {
    return store.meals.slice().sort((a, b) => {
      return b.price - a.price;
    });
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    });
  }

  // customers() {
  //   return store.customers.filter(customer => {
  //     return customer.deliveries().filter(delivery => {
  //       return delivery.mealId === this.id;
  //     });
  //   })
  // }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    });
  }

}

class Customer {
  constructor(name, employer = {}) {
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer.id;
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

  totalSpent() {
    return this.meals().reduce((sum, meal) => {
      return sum + meal.price;
    }, 0);
  }
}

class Employer {
  constructor(name) {
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
    return store.deliveries.filter(delivery => {
      return this.employees().includes(delivery.customer());
    });
  }

  // deliveries() {
  //   let allDeliveries = this.employees().map(employee => {
  //     return employee.deliveries();
  //   });
  //   let merged = [].concat.apply([], allDeliveries);
  //   return merged;
  // }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    }).unique();
  }

  // meals() {
  // let allMeals = this.deliveries().map(delivery => {
  //   return delivery.meal();
  // });
  //   let uniqueMeals = [...new Set(allMeals)];
  //   return uniqueMeals;
  // }

  mealTotals(){
  return this.deliveries().reduce((allMeals, delivery) => {
    if (delivery.mealId in allMeals) {
      allMeals[delivery.mealId]++;
    } else {
      allMeals[delivery.mealId] = 1;
    }
    return allMeals;
    }, {});
  }

}
