let store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0

class Customer {
  constructor(name, employer) {
    this.id = ++customerId;
    this.name = name;
    if (employer) {
    this.employerId = employer.id;
    }

    store.customers.push(this);
  }

  setEmployer(employer) {
    this.employerId = employer.id;
  }

  meals() {
    let deliveries = this.deliveries();

    return deliveries.map(delivery => {
      return delivery.meal();
    });
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  }

  totalSpent() {
    let meals = this.meals();

    const reduceTotal = function(agg, el, i, arr) {
      return agg += el.price;
    };

    return meals.reduce(reduceTotal, 0);
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
    });
  }

  customers() {
    let deliveries = this.deliveries();

    return deliveries.map(delivery => {
      return delivery.customer();
    });
  }

    static byPrice() {
      function priceSorter(a,b) {
        return b.price - a.price;
      }

      return store.meals.sort(priceSorter);
    }
}


let deliveryId = 0;

class Delivery {
    constructor(meal, customer) {
      this.id = ++deliveryId;
      if (meal) {
      this.mealId = meal.id;
    }
      if (customer) {
      this.customerId = customer.id;
    }

      store.deliveries.push(this);
    }

    setMeal(meal) {
      this.mealId = meal.id;
    }

    setCustomer(customer) {
      this.customerId = customer.id;
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

let employerId = 0;

class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;

    store.employers.push(this);
  }
}
