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
        return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
    }

    customers() {
        return store.customers.filter(customer => customer.neighborhoodId === this.id );
    }

    meals() {
        let meals = this.customers().map(customer => customer.meals())[0];
        let unique = meals.filter((it, i, ar) => ar.indexOf(it) === i);
        return unique;
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
        return store.deliveries.filter(delivery => delivery.customerId === this.id );
    }

    meals() {
        return this.deliveries().map(delivery => delivery.meal());
    }

    totalSpent() {
        return this.meals().reduce(function(acc, curr) {
            return acc + curr.price;
        }, 0);
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
        return store.deliveries.filter(delivery => delivery.mealId === this.id );
    }

    customers() {
        return this.deliveries().map(delivery =>  delivery.customer());
    }

    static byPrice() {
        let sorted = store.meals.sort(function(a, b) {
          return b.price - a.price;
        })
        return sorted;
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
        return store.meals.filter(meal => meal.id == this.mealId)[0];
    }

    customer() {
        return store.customers.filter(customer => customer.id == this.customerId)[0];
    }

    neighborhood() {
        return store.neighborhoods.filter(neighborhood => neighborhood.id == this.neighborhoodId)[0];
    }
}