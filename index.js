// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

//object Id variables
let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

//Classes

class Neighborhood {
    constructor(name) {
        this.id = ++neighborhoodId;
        this.name = name;

        store.neighborhoods.push(this);
    }

    deliveries() {
        return store.deliveries.filter( delivery => {
            return delivery.neighborhoodId === this.id;
        });
    }

    customers() {
        let customerList = this.deliveries().map( delivery => {
            return delivery.customer();
        });

        return [...new Set(customerList)];
    }

    meals() {
        let mealsList = this.deliveries().map( delivery => {
            return delivery.meal();
        });

        return [...new Set(mealsList)];

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
        return store.deliveries.filter( delivery => {
            return delivery.customerId === this.id;
        })
    }

    meals() {
        return this.deliveries().map( delivery => {
            return delivery.meal();
        });
    }

    totalSpent() {
       return this.meals().reduce((total, meal) => (total += meal.price), 0);
    }
}

class Meal {
    constructor(title, price = 0) {
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
        let customerList = this.deliveries().map( delivery => {
            return delivery.customer();
        });
        
        return [...new Set(customerList)];
    }

    static byPrice() {
        return store.meals.sort((a,b) => {
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
        return store.meals.find(meal => {
            return meal.id === this.mealId;
        });
    }

    customer() {
        return store.customers.find(cust => {
            return cust.id === this.customerId;
        });
    }

    neighborhood() {
        return store.neighborhoods.find(neighborhood => {
            return neighborhood.id === this.neighborhoodId;
        });
    }

}
