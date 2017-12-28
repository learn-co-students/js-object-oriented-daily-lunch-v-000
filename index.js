
let store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

class Customer {
    constructor(name, employer){
        this.id = ++customerId;
        this.name = name;
        if (employer) {
            this.employerId = employer.id;
        }
        store.customers.push(this);
    }
    deliveries(){
        return store.deliveries.filter(delivery => {
            return delivery.customerId === this.id;
        })
    }
    meals(){
        return this.deliveries().map(delivery => delivery.meal());
    }

    totalSpent(){
        return this.meals().reduce( function(total, meal) {
            return total.price + meal.price;
        })
    }

}

class Meal {
    constructor(title, price){
        this.id = ++mealId;
        this.title = title;
        this.price = price;
        store.meals.push(this);
    }
    deliveries(){
        return store.deliveries.filter(delivery => {
            return delivery.mealId === this.id;
        })
    }
    customers(){
        return this.deliveries().map(delivery => delivery.customer());
    }

    static byPrice() {
        return store.meals.sort(function compare(meal1, meal2) {
            return meal1.price - meal2.price
        }).reverse();

    }
    
}

class Delivery {
    constructor(meal, customer){
        this.id = ++deliveryId;
        if (meal) {
            this.mealId = meal.id
        };
        if (customer) {
            this.customerId = customer.id;
        }
        store.deliveries.push(this)
    }
    meal(){
        return store.meals.find(meal => meal.id === this.mealId);
    }

    customer(){
        return store.customers.find(customer => customer.id === this.customerId);
    }
}

class Employer {
    constructor(name){
        this.name = name;
        this.id = ++employerId;
        store.employers.push(this);
    }

    employees(){
        return store.customers.filter(customer => {
            return customer.employerId === this.id;
        })
    }

    deliveries(){
        return store.deliveries.filter(delivery => {
            return delivery.customer().employerId === this.id;
        })
    }

    meals(){
            const array = this.deliveries().map(delivery => delivery.meal())
            return Array.from(new Set(array));
    }

    mealTotals() {
        let runningTotal = {};
        const allMeals = this.deliveries().map(delivery => delivery.meal());
        allMeals.forEach(function(meal){
            runningTotal[meal.id] = 0;
        });
        allMeals.forEach(function(meal){
            runningTotal[meal.id] += 1;
        });
        return runningTotal;
    }

    


}