let store = {customers: [], meals: [], deliveries: [], employers: []};
let id = 0;

class Customer{
    constructor(name, employer){
        if (name){
            this.name = name;
        }
        if (employer){
            this.employerId = employer.id;
        }
        
        this.id = ++id;
        store.customers.push(this);
    }
    meals(){
        return this.deliveries().map(delivery => {
            return store.meals.find(meal =>{
                return meal.id === delivery.mealId;
            });
        });
    }
    deliveries(){
        return store.deliveries.filter(delivery => {
            return delivery.customerId === this.id;
        });
    }
    totalSpent(){
        return this.meals().reduce(function(sum, meal){
            return sum + meal.price;
        },0);
    }
}

class Meal{
    constructor(title, price){
        this.title = title;
        this.price = price;
        this.id = ++id;
        store.meals.push(this);
    }
    deliveries(){
        return store.deliveries.filter(delivery =>{
            return delivery.mealId = this.id;
        });
    }
    customers(){
        return this.deliveries().map(delivery =>{ 
            return store.customers.find(customer => {
                return customer.id === delivery.customerId;
            });
        });
    }
    static byPrice(){
        return store.meals.sort(function(a,b){
            return b.price - a.price;
        });
    }
}

class Delivery{
    constructor(meal, customer){
        if(meal){
            this.mealId = meal.id;
        }
        if(customer){
            this.customerId = customer.id;
        }
        
        this.id = ++id;
        store.deliveries.push(this);
    }
    customer(){
        return store.customers.find(customer => {
            return customer.id === this.customerId;
        });
    }
    meal(){
        return store.meals.find(meal =>{
            return meal.id === this.mealId;
        });
    }
}

class Employer{
    constructor(name){
        this.name = name;
        this.id = ++id;
        store.employers.push(this);
    }
    employees(){
        return store.customers.filter(customer => {
            return customer.employerId === this.id;
        });
    }
    deliveries(){
        const deliveries = [];
        this.employees().forEach(employee => {
            deliveries.push( ...store.deliveries.filter(delivery =>{
                return employee.id === delivery.customerId;
            }));
        });
        return deliveries;
    }
    meals(){
        const meals = [];
        this.deliveries().forEach(delivery => {
            if(!meals.find(meal => {return meal.id === delivery.mealId})){
                meals.push(delivery.meal());
            }
        });
        return meals;
    }
    mealTotals(){

        const totals = {};
        let meals = [];

        this.meals().forEach(meal => {
            meals = this.deliveries().filter( delivery =>{
                return meal.id ===  delivery.mealId;
            });
            totals[meal.id] = meals.length;
        });
        return totals;
    }
}

