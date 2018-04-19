const store = {
  deliveries: [],
  meals: [],
  employers: [],
  customers: []
};

let customerIds = 0;
let employerIds = 0;
let mealIds = 0;
let deliveryIds = 0;

class Customer {
  constructor(name, employer) {
    this.id = ++customerIds;
    if (name !== undefined) {
      this.name = name;
    }
    if (employer !== undefined) {
      this.employerId = employer.id;
    }
    store.customers.push(this);
  }

  meals() {
    const meals = [];
    const mealIdArray = this.deliveries().map((customerDelivery) => customerDelivery.mealId);
    mealIdArray.forEach((id) => {
      meals.push(store.meals.find((meal) => meal.id === id));
    });
    return meals;
  }

  deliveries() {
    return store.deliveries.filter((delivery) => delivery.customerId === this.id);
  }

  totalSpent() {
    let total = 0;
    this.meals().forEach((meal) => {
      total += meal.price;
    })
    return total;
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealIds;
    if (title !== undefined) {
      this.title = title;
    }
    if (price !== undefined) {
      this.price = price;
    }
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter((delivery) => delivery.mealId === this.id);
  }

  customers() {
    const customers = [];
    const customerIdArray = this.deliveries().map((delivery) => delivery.customerId);
    customerIdArray.forEach((id) => {
      customers.push(store.customers.find((customer) => customer.id === id));
    });
    return customers;
  }

  static byPrice() {
    return store.meals.sort((a,b) => b.price-a.price);
  }
}

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryIds;
    if (meal !== undefined) {
      this.mealId = meal.id;
    }
    if (customer !== undefined) {
      this.customerId = customer.id;
    }
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find((meal) => meal.id === this.mealId);
  }

  customer() {
    return store.customers.find((customer) => customer.id === this.customerId);
  }
}

class Employer {
  constructor(name) {
    this.id = ++employerIds;
    if (name !== undefined) {
      this.name = name;
    }
    store.employers.push(this);
  }

  employees() {
    return store.customers.filter((customer) => customer.employerId === this.id);
  }

  deliveries() {
    const deliveries = [];
    const employeeIdArray = this.employees().map((employee) => employee.id);
    employeeIdArray.forEach((id) => {
      let temp = store.deliveries.filter((delivery) => delivery.customerId === id);
      while (temp.length > 0) {
        deliveries.push(temp.pop());
      }
    });
    return deliveries;
  }

  meals() {
    const meals = [];
    const mealIdArray = this.deliveries().map((delivery) => delivery.mealId);
    mealIdArray.forEach((id) => {
      meals.push(store.meals.find((meal) => meal.id === id));
    });
    return meals.filter((meal, index, self) => self.indexOf(meal) === index);
  }

  mealTotals() {
    const totals = {};
    const deliveries = this.deliveries();
    deliveries.forEach((delivery) => {
      if (totals.hasOwnProperty(delivery.mealId) === false) {
        totals[delivery.mealId] = 1;
      }
      else {
        totals[delivery.mealId] += 1;
      }
    });
    return totals;
  }
}
