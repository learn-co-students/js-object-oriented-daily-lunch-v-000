let customerId = 0;
let deliveryId = 0;
let mealId = 0;
let employerId = 0;
let store = {drivers: [], deliveries:[], meals: [], employers: [], customers: []}

class Customer {
    constructor(name, employer) {
        this.id = ++customerId;
        if (name) {this.name = name};
        if (employer) {this.employerId = employer.id};
        store.customers.push(this);
    }

    totalSpent() {
        const allDeliveries = store.deliveries.filter(delivery => delivery.customerId === this.id);
        return allDeliveries.reduce(function(total, delivery) {
            return delivery.meal().price + total;
        }, 0)
    }

    deliveries() {
        return store.deliveries.filter(delivery => delivery.customerId === this.id);
    }

    meals() {
        return this.deliveries().map(delivery => delivery.meal());
    }
}


class Delivery {
    constructor(meal, customer) {
        this.id = ++deliveryId;
        if (meal) {
            this.mealId = meal.id;};
        if (customer) {this.customerId = customer.id};
        store.deliveries.push(this);
    }

    customer() {
        return store.customers.find(customer => customer.id === this.customerId);
    }

    meal() {
        return store.meals.find(meal => meal.id === this.mealId);
    }
}

class Meal {
    constructor(name, price) {
        this.id = ++mealId;
        this.title = name;
        this.price = price;
        store.meals.push(this);
    }

    static byPrice() {
        return store.meals.sort(function(mealOne, mealTwo) {
            return mealOne.price - mealTwo.price
        }).reverse();
    };

    deliveries() {
        return store.deliveries.filter(delivery => delivery.mealId === this.id);
    }

    customers() {
        return this.deliveries().map(delivery => delivery.customer())
    }
}

class Employer {
    constructor(name) {
        this.id = ++ employerId;
        this.name = name;
        store.employers.push(this);
    }

    employees() {
        return store.customers.filter(customer => customer.employerId === this.id);
    }

    deliveries() {
        const allDeliveries = this.employees().map(employee => employee.deliveries());
        return [].concat.apply([], allDeliveries);
    }

    meals() {
        return [...new Set(this.deliveries().map(delivery => delivery.meal()))];
    }

    mealTotals() {
        const allMeals = this.deliveries().map(delivery => delivery.meal());
        let meals = {};
        allMeals.forEach(meal => meals[meal.id] = 0);
        allMeals.forEach(meal => meals[meal.id] += 1);
        return meals;
    }
}
