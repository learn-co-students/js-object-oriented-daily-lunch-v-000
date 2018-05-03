store = { customers: [], meals: [], deliveries: [], employers: [] };

let customerId = 0;
class Customer {
  constructor(name, employer) {
    this.name = name
    if (employer) { this.employerId = employer.id }
    this.id = ++customerId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(function (delivery) {
      return delivery.customerId === this.id;
    }.bind(this))
  }

  meals() {
    return store.meals.filter(function (meal) {
      return meal.deliveries().filter(function (delivery) {
        return delivery.customerId === this.id
      }.bind(this))
    }.bind(this))
  }

  totalSpent() {
    let total = 0
    this.deliveries().forEach(function (delivery) {
      total += delivery.meal().price
    })
    return total;
  }
}

let mealId = 0;
class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  static byPrice() {
    return store.meals.sort(function (a, b) {
      return b.price - a.price;
    })
  }

  deliveries() {
    return store.deliveries.filter(function (delivery) {
      return delivery.mealId === this.id;
    }.bind(this))
  }

  customers() {
    return this.deliveries().map(function (delivery) {
      return delivery.customer();
    }.bind(this))
  }
}

let deliveryId = 0;
class Delivery {
  constructor(meal, customer) {
    if (meal) { this.mealId = meal.id; }
    if (customer) { this.customerId = customer.id; }
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

  customer() {
    return store.customers.find(function (customer) {
      return customer.id === this.customerId;
    }.bind(this))
  }

  meal() {
    return store.meals.find(function (meal) {
      return meal.id === this.mealId;
    }.bind(this))
  }
}

let employerId = 0;
class Employer {
  constructor(name) {
    this.name = name;
    this.id = ++employerId;
    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(function (customer) {
      return customer.employerId === this.id;
    }.bind(this))
  }

  deliveries() {
    let arr = this.employees().map(function (employee) {
      return employee.deliveries();
    })
    return [].concat(...arr) //Flattens the returned array
  }

  meals() {
    let arr = []
    this.deliveries().forEach(function (deliveries) {
      let meal = deliveries.meal()
      if (!arr.includes(meal)) { arr.push(meal) }
    })
    return arr
  }

  mealTotals() {
    let total = {}
    this.deliveries().forEach(function(delivery) {
      console.log(delivery)
      if (total[delivery.mealId]) {
        total[delivery.mealId] += 1;
      } else {
        total[delivery.mealId] = 1;
      }
    })
    console.log(total)
    return total
  }
}