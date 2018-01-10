let store = {customers: [], meals: [], employers: [], deliveries: []}

let customerId = 0;
class Customer {
  constructor(name, employer={}) {
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer.id;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
     return delivery.customerId === this.id;
   })
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    })
  }

  totalSpent() {
    return this.meals().reduce(function(total, meal) {
      return total + meal.price;
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

  deliveries() {
    return store.deliveries.filter(delivery => {
     return delivery.mealId === this.id;
   })
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    })
  }

  static byPrice() {
    return store.meals.sort(function(a, b) {
      return a.price < b.price;
    })
  }
}

let employerId = 0;
class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;
    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id;
    })
  }

  deliveries() {
    const employeeDeliveries = this.employees().map(employee => {
      return employee.deliveries();
    });
    return [].concat.apply([], employeeDeliveries);
  }

  meals() {
    const employeeMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    return employeeMeals.filter(function(meal, i, array) {
      return array.indexOf(meal) === i
    });
  }

  mealTotals() {
    const employeeMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    let countMeals = {};
    for (let i = 0; i < employeeMeals.length; i++) {
      if (countMeals[employeeMeals[i].id] != null) {
        countMeals[employeeMeals[i].id] += 1;
      } else {
        countMeals[employeeMeals[i].id] = 1;
      }
    };
    return countMeals;
  }
}

let deliveryId = 0;
class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId;
    if (meal) {
      this.mealId = meal.id
    };
    if (customer) {
      this.customerId = customer.id
    };
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find((meal) => {
      return meal.id === this.mealId
    })
  }

  customer() {
    return store.customers.find((customer) => {
      return customer.id === this.customerId
    })
  }
}
