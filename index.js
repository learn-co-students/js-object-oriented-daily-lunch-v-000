// Customer class:
store = {customers: [], meals: [], deliveries: [], employers: []}
let customerId = 0;
class Customer {
    constructor(name, employer = {}){
        this.id = ++customerId;
        this.name = name;
        this.employerId = employer.id;
        store.customers.push(this);
    }

    deliveries(){
        return store.deliveries.filter(delivery => {
            return delivery.customerId === this.id;
        })
    }

    meals(){
        return this.deliveries().map(delivery => {
            return delivery.meal();
        })
    }
    totalSpent(){
        return this.meals().reduce((sum, meal) => {
            return sum + meal.price;
        }, 0);
    }
}
let mealId = 0;
class Meal {
    constructor(title, price) {
        this.id = ++mealId
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
        return store.deliveries.map(delivery => {
            return delivery.customer();
        })
    }
    static byPrice(){
        return store.meals.sort(function(a,b) {
            return a.price < b.price;
        });
    }
}

// Delivery class:
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
    setMeal(meal){
        this.mealId = meal.id;
    }
    setCustomer(customer){
        this.customerId = customer.id;
    }
    meal(){
        return store.meals.find((meal) => {
            return meal.id === this.mealId;
        })
    }
    customer(){
        return store.customers.find((customer) => {
            return customer.id === this.customerId;
        })
    }
}
    
// Employer class:
let employerId = 0
class Employer {
    constructor(name) {
        this.id = ++employerId;
        this.name = name;
        store.employers.push(this);
    }
    employees(){
        return store.customers.filter(customer => {
            return customer.employerId === this.id;
        })
    }
    deliveries(){
        return this.employees().reduce((allDelivs, employee) => {
            return allDelivs.concat(employee.deliveries());
        }, []);
    }
    meals(){
        return this.allMeals().filter((meal, idx, ary) => ary.indexOf(meal) === idx);
    }
    allMeals(){
        return this.employees().reduce((allMeals, employee) => {
            return allMeals.concat(employee.meals());
        }, []);
    }
    mealTotals(){
        let totals = {}
        for (const meal of this.allMeals()) {
            if (totals[meal.id]) {
                totals[meal.id] += 1;
            } else {
                totals[meal.id] = 1;
            }
        }
        return totals;
    }
}