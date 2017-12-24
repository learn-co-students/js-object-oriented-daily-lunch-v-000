const store = {deliveries: [], meals: [], employers: [], customers: []};

deliveryId = 1;
mealId = 1;
employerId = 1;
customerId = 1;

class Delivery {
  constructor(meal, customer) {
    this.id = deliveryId++;
    if (meal) {this.mealId = meal.id;}
    if (customer) {this.customerId = customer.id;}
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(meal => this.mealId === meal.id)
  }

  customer() {
    return store.customers.find(function(customer){return customer.id === this.customerId}.bind(this))
  }
}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = mealId++;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.meal().id === this.id)
  }

  customers() {
    return this.deliveries().map(function(delivery) {
      return delivery.customer()})
  }

  static byPrice() {
    let meals = store.meals.slice();
    meals.sort(function(meal1, meal2) {
      return meal2.price - meal1.price;
    })
    return meals;
  }
}

class Employer {
  constructor(name) {
    this.name = name;
    this.id = employerId++;
    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(function(customer) {return customer.employerId === this.id}.bind(this))
  }

  deliveries() {
    const deliveries = [];
    this.employees().forEach(function(employee) {
      employee.deliveries().forEach(function(delivery){
        deliveries.push(delivery)
      })
    })
    return deliveries;
  }

  meals() {
    const meals = [];
    this.deliveries().forEach(function(delivery) {
      if (meals.includes(delivery.meal()) === false) {meals.push(delivery.meal())}
    })
    return meals;
  }

  mealTotals() {
    const totals = {};
    this.meals().forEach(function(meal) {
      totals[meal.id] = 0;
    })
    this.deliveries().forEach(function(delivery) {
      totals[delivery.meal().id]++;
    })
    return totals;
  }

}

class Customer {
  constructor(name, employer) {
    this.id = customerId++;
    this.name = name;
    if (employer) {this.employerId = employer.id;}
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(function(delivery) {return delivery.customerId === this.id}.bind(this))
  }

  meals() {
    return this.deliveries().map(function(delivery) {return delivery.meal()})
  }

  totalSpent() {
    return this.meals().reduce(function(subtotal, meal) {
      return subtotal + meal.price;
    }, 0)
  }
}
