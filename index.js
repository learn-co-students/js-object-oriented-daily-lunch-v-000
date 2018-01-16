let store = {customers: [], meals: [], deliveries: [], employers: []};

let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

class Customer {
    constructor(name=null,employer=null) {
       this.id = ++customerId;
       if (name) this.name = name;
       if (employer) this.employerId = employer.id;
       store.customers.push(this);
    }
    meals() {
        return this.deliveries().map(d => {return store.meals.find(m => {
            return m.id === d.mealId} ) })
    }
    deliveries() {
        return store.deliveries.filter(d => {return d.customerId === this.id})
    }
    totalSpent() {
        return this.meals().reduce((a,b) => a + b.price, 0)
    }
}

class Meal {
    constructor(title=null,price=null) {
        this.id = ++mealId;
        if (title) { 
            this.title = title;
        }
        if (price) {
            this.price = price;
        }
        store.meals.push(this);
    }
    deliveries() {
        return store.deliveries.filter(d => {return d.mealId === this.id})
    }
    customers() {
        return this.deliveries().map(d => {return store.customers.find(c => {return c.id === d.customerId} ) })
    }
    static byPrice() {
        return store.meals.sort( (m1,m2) => {
            return m2.price - m1.price;
        })
    }
}

class Delivery {
    constructor(meal=null,customer=null) {
        this.id = ++deliveryId;
        if (meal) {
            this.mealId = meal.id;
        }
        if (customer) {
            this.customerId = customer.id;
        }
        store.deliveries.push(this);
    }
    meal() {
        return store.meals.find(m => {return m.id === this.mealId})
    }
    customer() {
        return store.customers.find(c => {return c.id === this.customerId})
    }
}

class Employer {
    constructor(name) {
        this.id = ++employerId;
        this.name = name;
        store.employers.push(this);
    }
    employees() {
        return store.customers.filter(c => {return c.employerId === this.id})
    }
    deliveries() {
        let employerDeliveries =  [];
        store.deliveries.forEach(d => {
            let c = store.customers.find(c => {return c.id === d.customerId});
            if (c.employerId === this.id) {
                employerDeliveries.push(d);
            }
        })
        //console.log(employerDeliveries);
        return employerDeliveries;
    }
    meals() {

        const employerMeals =  [];
        this.deliveries().forEach(d => {
            let m = store.meals.find(m => {return m.id === d.mealId});
            
            //console.log(employerMeals.length);
            //console.log(m);
            //console.log(employerMeals.find(e => {return e.id === 26}));
            
            if (employerMeals.find(e => {return e.id === m.id}) === undefined) {
               
               employerMeals.push(m); 
            }
        })

        return employerMeals;
    }
    mealTotals() {
        const employerMealsCount =  {};
        this.deliveries().forEach(d => {

            if (Object.keys( employerMealsCount).indexOf( d.mealId.toString() ) === -1) {
                employerMealsCount[d.mealId] = 1;
            } 
            else {
                ++employerMealsCount[d.mealId];
            }
        })
        console.log(employerMealsCount);
        return employerMealsCount;        
    }
}