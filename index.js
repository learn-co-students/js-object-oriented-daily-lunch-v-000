// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let driverId = 0;
class Neighborhood {
    constructor(name) {
        this.id = ++driverId;
        this.name = name;
        store.neighborhoods.push(this);
    }
    deliveries() {
        return store.deliveries.filter(
            function(delivery) {
                return delivery.neighborhoodId === this.id;
            }.bind(this)
        );
    }
    customers() {
        return store.customers.filter(
            function(customer) {
                return customer.neighborhoodId === this.id;
            }.bind(this)
        );
    }
    // - returns a unique list of meals that have been ordered in a particular neighborhood
    meals() {
      let allMeals = this.deliveries().map(delivery => delivery.meal());
      let uniqueMeals = new Set(allMeals);
      return Array.from(uniqueMeals);
    }

}

let customerId = 0;
class Customer {
    constructor(name, neighborhoodId) {
        this.id = ++customerId;
        this.name = name;
        this.neighborhoodId = neighborhoodId
        store.customers.push(this);
    }
    deliveries() {
        return store.deliveries.filter(
            function(delivery) {
                return delivery.customerId === this.id;
            }.bind(this)
        );
    }
    meals() {
        return this.deliveries().map(
            function(delivery) {
                return delivery.meal();
            }.bind(this)
        );
    }
    totalSpent() {
      let prices = this.meals().map(x => x.price);
      return prices.reduce((total, amount) => total + amount);
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
        return store.deliveries.filter(
            function(delivery) {
                return delivery.mealId === this.id;
            }.bind(this)
        );
    }
    customers() {
        return this.deliveries().map(
            function(delivery) {
                return delivery.customer();
            }.bind(this)
        );
    }

    static byPrice(price) {
      return store.meals.sort((a, b) => (a.price > b.price) ? 1 : -1).reverse();
    }
}

let deliveryId = 0;
class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
        this.id = ++deliveryId;
        this.mealId = mealId;
        this.neighborhoodId = neighborhoodId;
        this.customerId = customerId;
        store.deliveries.push(this);
    }

    meal() {
        return store.meals.find(
            function(meal) {
                return meal.id === this.mealId;
            }.bind(this)
        );
    }

    customer() {
        return store.customers.find(
            function(cust) {
                return cust.id === this.customerId;
            }.bind(this)
        );
    }

    neighborhood() {
        return store.neighborhoods.find(
            function(neighborhood) {
                return neighborhood.id === this.neighborhoodId;
            }.bind(this)
        );
    }

}
