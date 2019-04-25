// global datastore

let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;


 class Neighborhood {
    constructor(name) {
      this.id = ++neighborhoodId;
      this.name = name;
      store.neighborhoods.push(this);
    }

    deliveries() {
      return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
    }

     customers() {
      return store.customers.filter(customer => customer.neighborhoodId = this.id);
    }

     meals() {
      let meals = this.deliveries().map(delivery => delivery.meal());
      return [...new Set(meals)];
    }
}

 class Meal {
    constructor(title, price) {
      this.id = ++mealId;
      this.title = title;
      this.price = price;
      store.meals.push(this);
    }

    deliveries(){
      return store.deliveries.filter(delivery => delivery.mealId === this.id);
    }
    customers() {
      return this.deliveries().map(delivery => store.customers.find(customer => customer.id === delivery.customerId));
    }
    static byPrice() {
      return store.meals.sort((a, b) =>  b.price - a.price);
    }
}

 class Customer {
    constructor(name, neighborhood) {
      this.id = ++customerId;
      this.name = name;
      this.neighborhoodId = neighborhood;
      store.customers.push(this);
    }
    deliveries() {
      return store.deliveries.filter(delivery => delivery.customerId === this.id);
    }
    meals() {
      return this.deliveries().map(delivery => delivery.meal());
    }
    totalSpent(){
      let prices = this.meals().map(meal=> meal.price);
      return prices.reduce((total, amount) => total + amount, 0);
    }
}

 class Delivery {
    constructor(meal, neighborhood, customer) {
      this.id = ++deliveryId;
      this.mealId = meal;
      this.neighborhoodId = neighborhood;
      this.customerId = customer;
      store.deliveries.push(this);
    }
    customer() {
        return store.customers.find(customer => customer.id === this.customerId);
    }
    neighborhood() {
        return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
    }
    meal() {
        return store.meals.find(meal => meal.id === this.mealId);
    }
  }
