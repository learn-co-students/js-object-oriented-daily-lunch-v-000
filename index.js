let store = { deliveries: [], meals: [], employers: [], customers: []};
let customerId = 0;

class Customer {
    constructor (name, employer) {
        this.id = ++customerId;
        this.name = name;
        if (employer) { this.employerId = employer.id; }

        store.customers.push(this);
    }
    meals () {
        const meals = [];
        this.deliveries().forEach(function (delivery, i, array) {
            meals.push(delivery.meal());
        });
        return meals;
    }
    deliveries() {
        return store.deliveries.filter (delivery => {
            return delivery.customerId === this.id;
        })
    }
    totalSpent() {
        const sumPrice = function(agg, meal, i, arr) {
            return agg + meal.price;
        }
        return this.meals().reduce(sumPrice, 0);
    } 
}

let mealId = 0;
class Meal {
    constructor (title, price) {
        this.title = title;
        this.price = price;
        this.id = ++mealId;

        store.meals.push(this);
    }
    deliveries() {
        return store.deliveries.filter (delivery => {
            return delivery.mealId === this.id;
        })
    }
    customers () {
        const customers = [];
        this.deliveries().forEach(function (delivery, i, array) {
            customers.push(delivery.customer());
        });
        return customers;
    }
    static byPrice() {
        return store.meals.sort(function (meal1,meal2) {
            return meal2.price - meal1.price;
        });
    }
}

let deliveryId = 0;
class Delivery {
    constructor (meal, customer) {
        if (meal) { this.mealId = meal.id; }
        if (customer) { this.customerId = customer.id; }
        this.id = ++deliveryId;
        store.deliveries.push(this);
    }
    meal() {
        return store.meals.find(function (meal) {
            return meal.id === this.mealId;
        }.bind(this));
    
    }
    customer() {
        return store.customers.find(function (customer) {
            return customer.id === this.customerId;
        }.bind(this));

    }
}

let employerId = 0;
class Employer {
    constructor (name) {
        this.name = name;
        this.id = ++employerId;

        store.employers.push(this);
    }
    employees() {
        return store.customers.filter (customer => {
            return customer.employerId === this.id;
        })
    }

    deliveries () {
        const deliveries = [];
        this.employees().forEach(function (customer, i, array) {
            customer.deliveries().forEach(function (delivery, j, array2) {
             deliveries.push(delivery);
            });
        });
        return deliveries;
    }

    meals() {
        const meals = [];
        this.deliveries().forEach(function (delivery, i, array) {
            if (!meals.find(function (meal) { return meal.id === delivery.mealId })) {
                meals.push(delivery.meal()); 
            }
        });
        return meals;
    }
    mealTotals() {
        const mealTotals = {};
        this.deliveries().forEach(function (delivery, i, array) {
            if (!Object.keys(mealTotals).find(function (mealId) { return parseInt(mealId) === delivery.mealId })) {
                mealTotals[delivery.mealId] = 1;
            } else {
                mealTotals[delivery.mealId] += 1;
            }
        });
        return mealTotals;
    }
}