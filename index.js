// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;

    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter((delivery) => {
      return delivery.neighborhoodId === this.id;
    });
  }

  customers() {
    return store.customers.filter((customer) => {
      return customer.neighborhoodId === this.id;
    });
  }

  meals() {
    const mealIds = this.deliveries().map((delivery) => {
      return delivery.mealId;
    });

    const meals = store.meals.filter((meal) => {
      return mealIds.includes(meal.id);
    });

    return [...new Set(meals)];
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;

    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter((delivery) => {
      return delivery.customerId === this.id;
    });
  }

  meals() {
    const mealIds = this.deliveries().map((delivery) => {
      return delivery.mealId;
    });

    const meals = [];

    for (const mealId of mealIds) {
      meals.push(store.meals.find((meal) => {
        return meal.id === mealId;
      }));
    }
    
    return meals;
  }

  totalSpent() {
    let total = 0.0;

    for (const meal of this.meals()) {
      total += meal.price;
    }

    return total;
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter((delivery) => {
      return delivery.mealId === this.id;
    });
  }

  customers() {
    const customerIds = this.deliveries().map((delivery) => {
      return delivery.customerId;
    });

    const customers = store.customers.filter((customer) => {
      return customerIds.includes(customer.id);
    });

    return [...new Set(customers)];
  }

  static byPrice() {
    return store.meals.sort((a, b) => {
      return b.price - a.price;
    });
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;

    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find((meal) => {
      return meal.id === this.mealId;
    });
  }

  customer() {
    return store.customers.find((customer) => {
      return customer.id === this.customerId;
    });
  }

  neighborhood() {
    return store.neighborhoods.find((neighborhood) => {
      return neighborhood.id === this.neighborhoodId;
    });
  }
}
