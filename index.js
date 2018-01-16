let store = {customers: [], meals: [], deliveries: [], employers: []}
let customerId = 0

class Customer {
  constructor(name, employer = {}) {
    this.id = ++customerId
    this.employerId = employer.id
    this.name = name

    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    });
  }

  meals() {
    return this.deliveries().map((delivery) => {
      return delivery.meal()
    });
  }

  totalSpent() {
    return this.meals().reduce(function (sum, meal) {
      return sum + meal.price;
    }, 0)
  };
}

let mealId = 0

class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price

    store.meals.push(this)
  }

  static byPrice() {
      return store.meals.sort(function(a, b) {
        return b.price - a.price
      });
    }

    deliveries() {
      return store.deliveries.filter(delivery => {
        return delivery.mealId === this.id
      });
    }

    customers() {
      return this.deliveries().map((delivery) => {
        return delivery.customer()
      });
    }
  }

let deliveryId = 0

class Delivery {
  constructor(meal, customer) {
      this.id = ++deliveryId
    if (customer) {
        this.customerId = customer.id
      }
    if (meal) {
      this.mealId = meal.id
    }
      store.deliveries.push(this)
  }

  meal() {
    return store.meals.find((meal) => {
      return meal.id === this.mealId
    });
  }

  customer() {
    return store.customers.find((customer) => {
      return customer.id === this.customerId
    });
  }
}

let employerId = 0
class Employer {
  constructor(name) {
    this.id = ++employerId
    this.name = name

    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    });
  }

  deliveries() {
    let allDeliveries =
    this.employees().map((employee) => {
      return employee.deliveries()
    });

    let combined = [].concat.apply([], allDeliveries)
      return combined
    }

  allMeals() {
    return this.deliveries().map(function (delivery)
    {
      return delivery.meal()
    });
  }

  meals() {
    let uniqueMeals = [...new Set(this.allMeals())]
    return uniqueMeals
  }

  mealTotals() {
    let mealsTotal = {}
    this.allMeals().forEach(function (meal) {
      mealsTotal[meal.id] = 0
    });
    this.allMeals().forEach(function (meal) {
      totals[meal.id]  += 1
    });
    return mealsTotal
  }
}
