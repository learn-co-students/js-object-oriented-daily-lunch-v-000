// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
const Neighborhood = (() => {
  let neighborhoodIds = 1;
  return class {
    constructor(name) {
      this.id = neighborhoodIds++;
      this.name = name;
      store.neighborhoods.push(this);
    }

    customers() {
      return store.customers.filter(customer => customer.neighborhoodId === this.id);
    }

    meals() {
      const allMeals = this.customers().map(customer => customer.meals());
      const merged = [].concat.apply([], allMeals);
      return [...new Set(merged)];
    }

    deliveries() {
      return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
    }
  };
})();

const Meal = (() => {
  let mealIds = 1;
  return class {
    constructor(title, price = 0) {
      this.id = mealIds++;
      this.title = title;
      this.price = price;
      store.meals.push(this);
    }

    deliveries() {
      return store.deliveries.filter(delivery => delivery.mealId === this.id);
    }

    customers() {
      const allCustomers = this.deliveries().map(delivery => delivery.customer());
      return [...new Set(allCustomers)];
    }

    static byPrice() {
      return store.meals.sort((a, b) => a.price < b.price);
    }
  };
})();

const Customer = (() => {
  let customerIds = 1;
  return class {
    constructor(name, neighborhoodId) {
      this.id = customerIds++;
      this.name = name;
      this.neighborhoodId = neighborhoodId;
      store.customers.push(this);
    }

    deliveries() {
      return store.deliveries.filter(delivery => delivery.customerId === this.id);
    }

    meals() {
      return this.deliveries().map(delivery => delivery.meal());
    }

    totalSpent() {
      return this.meals().reduce((total, meal) => (total += meal.price), 0);
    }
  };
})();

const Delivery = (() => {
  let deliveryIds = 1;
  return class {
    constructor(mealId, neighborhoodId, customerId) {
      this.id = deliveryIds++;
      this.mealId = mealId;
      this.neighborhoodId = neighborhoodId;
      this.customerId = customerId;
      store.deliveries.push(this);
    }

    meal() {
      return store.meals.find(meal => meal.id === this.mealId);
    }

    neighborhood() {
      return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
    }

    customer() {
      return store.customers.find(customer => customer.id === this.customerId);
    }
  };
})();