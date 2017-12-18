store = {customers: [], meals: [], deliveries: [], employers: []};

let customerId = 0
class Customer {
  constructor(name, employer) {
    this.name = name;
    if (employer) {
      this.employerId = employer.id;
    }
    this.id = ++customerId;
    store.customers.push(this);
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    })
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  }

  totalSpent() {
    return this.meals().reduce(function (total, meal) {
      return total + meal.price;
    }, 0);
  }
}

let mealId = 0
class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
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
    });
  }

  static byPrice() {
    return store.meals.sort((meal1, meal2) => {
      return meal1.price < meal2.price;
    })
  }
}

let deliveryId = 0
class Delivery {
  constructor(meal, customer) {
    if (meal) {
      this.mealId = meal.id;
    }
    if (customer) {
      this.customerId = customer.id;
    }
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
  }
}

let employerId = 0
class Employer {
  constructor(name) {
    this.name = name;
    this.id = ++employerId;
    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id;
    });
  }

  deliveries() {
    let allDeliveries = this.employees().map(employee => {
      return employee.deliveries();
    });
    return [].concat.apply([], allDeliveries);
  }

  meals() {
    for (const employee of this.employees()) {
      return employee.meals();
    }
  }

  mealTotals() {
    let meals = this.deliveries().map(delivery => {
      return delivery.meal();
    });

    let mealsOrdered = {};
    meals.forEach(function(meal) {
      mealsOrdered[meal.id] = 0;
    });
    meals.forEach(function(meal) {
      mealsOrdered[meal.id] += 1;
    })
    return mealsOrdered;
  }
}
