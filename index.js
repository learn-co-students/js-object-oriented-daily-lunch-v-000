let store = { customers: [{}], meals: [{}], deliveries: [{}], employers: [{}] };
let customerId = 0;
class Customer {
    constructor(name, employer) {
        this.name = name;
        this.id = ++customerId;
        if (employer) {
            this.employerId = employer.id;
        }
        store.customers.push(this);
    }
    mealPrices() {
        return this.meals().map(meal => meal.price);
    }
    deliveries() {
        return store.deliveries.filter(delivery => {
            return delivery.customerId === this.id;
        });
    }
    meals() {
        const customerMeals = this.deliveries().map(meal => meal.mealId);
        return store.meals.filter(meal => {
            for (const value of customerMeals) {
                if (meal.id === value) {
                    return meal;
                }
            }
        });
    }
    totalSpent() {
        return this.mealPrices().reduce((sum, value) => sum + value);
    }
}
let mealId = 0;
class Meal {
    static byPrice() {
        return store.meals.sort(compareValues("price"));
    }
    constructor(title, price) {
        this.title = title;
        this.price = price;
        this.id = ++mealId;
        store.meals.push(this);
    }
    findMeal() {
        return store.meals.find((meal) => {
            return meal.id === this.id;
        });
    }
    deliveries() {
        let mealID = this.findMeal().id;
        return store.deliveries.filter((delivery) => {
            if (delivery.mealId === mealID) {
                return delivery;
            }
        });
    }
    customers() {
        const customerIds = this.deliveries().map(delivery => delivery.customerId);
        return store.customers.filter(customer => {
            for (const value of customerIds) {
                if (value === customer.id) {
                    return customer;
                }
            }
        });
    }
}
// tslint:disable-next-line:align
function compareValues(key, order = "desc") {
    return function (a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }
        const valA = a[key];
        const valB = b[key];
        let comparison = 0;
        if (valA > valB) {
            comparison = 1;
        }
        else if (valA < valB) {
            comparison = -1;
        }
        return order === "desc" ? comparison * -1 : comparison;
    };
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
    findDelivery() {
        return store.deliveries.find((delivery) => {
            return delivery.id === this.id;
        });
    }
    customer() {
        const customerID = this.findDelivery().customerId;
        return store.customers.find((customer) => {
            return customer.id === customerID;
        });
    }
    meal() {
        const mealID = this.findDelivery().mealId;
        return store.meals.find((meal) => {
            return meal.id === mealID;
        });
    }
}
let employerId = 0;
class Employer {
    constructor(name) {
        this.name = name;
        this.id = ++employerId;
        store.employers.push(this);
    }
    findEmployer() {
        return store.employers.find((employer) => {
            return employer.id === this.id;
        });
    }
    employees() {
        const employer = this.findEmployer();
        return store.customers.filter(customer => {
            return customer.employerId === employer.id;
        });
    }
    deliveries() {
        return store.deliveries.filter(delivery => {
            for (const value of this.employees()) {
                return delivery.customerId === value.id;
            }
        });
    }
    meals() {
        const customerMeals = this.deliveries().map(meal => meal.mealId);
        return store.meals.filter(meal => {
            for (const value of customerMeals) {
                if (meal.id === value) {
                    return meal;
                }
            }
        });
    }
    mealCount(array) {
        return array.reduce((tally, meal) => (tally[meal] = ++tally[meal] || 1, tally), {});
    }
    mealTotals() {
        return this.mealCount(store.deliveries.map(delivery => {
            for (const value of this.employees()) {
                if (delivery.customerId === value.id) {
                    return delivery.mealId;
                }
            }
        }));
    }
}
//# sourceMappingURL=index.js.map