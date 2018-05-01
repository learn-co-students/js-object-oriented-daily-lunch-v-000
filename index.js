// global datastore
let store = { meals: [], customers: [], deliveries: [] };

const Meal = (() => {
  let mealIds = 1;
  return class {
    constructor(title, price = 0) {
      this.title = title;
      this.price = price;
      this.id = mealIds++;
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
    constructor(name) {
      this.name = name;
      this.id = customerIds++;
      store.customers.push(this);
    }

    deliveries() {
      return store.deliveries.filter(delivery => delivery.customerId === this.id);
    }

    meals() {
      const allMeals = this.deliveries().map(delivery => delivery.meal());
      return Array.from(new Set(allMeals));
    }

    totalSpent() {
      return this.meals().reduce((total, meal) => (total += meal.price), 0);
    }
  };
})();

const Delivery = (() => {
  let deliveryIds = 1;
  return class {
    constructor(mealId, customerId) {
      this.mealId = mealId;
      this.customerId = customerId;
      this.id = deliveryIds++;
      store.deliveries.push(this);
    }

    meal() {
      return store.meals.find(meal => meal.id === this.mealId);
    }

    customer() {
      return store.customers.find(customer => customer.id === this.customerId);
    }
  };
})();
