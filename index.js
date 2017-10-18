const store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

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
    return this.deliveries().map(function(delivery) {
      return delivery.meal();
    });
  }

  deliveries() {
    return store.deliveries.filter(function(delivery) {
        return delivery.customerId === this.id
    }.bind(this));
  }

  totalSpent() {
    return this.meals().reduce(function(totalPrice, meal) {
      return totalPrice + meal.price;
    }, 0);
  }
}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price
    this.id = ++mealId;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.mealId === this.id;
    }.bind(this));
  }

  customers() {
    return this.deliveries().map(function(delivery) {
      return delivery.customer();
    });
  }

  static byPrice() {
    return store.meals.sort(function(mealA, mealB) {
      return mealB.price - mealA.price;
    });
  }
}

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

class Employer {
  constructor(name) {
    this.name = name;
    this.id = ++employerId;
    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(function(customer) {
      return customer.employerId === this.id;
    }.bind(this));
  }

  deliveries() {
    return this.employees().reduce(function(deliveries, employee) {
      return [...deliveries, ...employee.deliveries()];
    }, []);
  }

  meals() {
    return this.deliveries().reduce(function(meals, delivery) {
      if (meals.indexOf(delivery.meal())) {
        return [...meals, delivery.meal()];
      } else {
        return meals;
      }
    }, []);
  }

  mealTotals() {
    return this.deliveries().reduce(function(ordersByMeal, delivery) {
      ordersByMeal[delivery.meal().id] = (ordersByMeal[delivery.meal().id] || 0) + 1;
      return ordersByMeal;
    }, {});
  }
}
