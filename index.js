let store = {deliveries: [], meals:[], customers:[], employers:[]}
let deliveryId = 0
let customerId = 0
let mealId = 0
let employerId = 0

class Delivery {
    constructor(meal = {}, customer= {}){
        this.mealId = meal.id
        this.customerId = customer.id
        this.id = deliveryId++
        store.deliveries.push(this)
    }

    meal(){
        return store.meals.find(meal => {
            return meal.id === this.mealId
        })
    }

    customer(){
        return store.customers.find(customer => {
            return customer.id === this.customerId 
        })
    }
}

class Meal {
    constructor(title, price){
        this.title = title 
        this.price = price 
        this.id = mealId++ 
        store.meals.push(this)
    }
    
    deliveries(){
        return store.deliveries.filter(delivery => {
            return delivery.mealId == this.id 
        })
    }
    
    customers() {
        return this.deliveries().map(delivery => {
            return delivery.customer()
        })
    }
    
    static byPrice() {
        return store.meals.sort((meal1, meal2) => {
            return meal1.price < meal2.price            
        })
    }
}



class Customer {
    constructor(name, employer = {}) {
            this.id = customerId++
            this.employerId = employer.id 
            this.name = name 
            store.customers.push(this)
    }
    
    deliveries(){
        return store.deliveries.filter(delivery => {
            return delivery.customerId == this.id 
        })
    }
    
    meals(){
        return this.deliveries().map(delivery => { 
            return delivery.meal();
        })
    }
    
    
    totalSpent(){
        return this.meals().reduce(function(sum, meal) {
            return sum + meal.price;
        }, 0);
    }
}

class Employer{
    constructor(name){
        this.name = name 
        this.id = employerId++
        
        store.employers.push(this)
    }
    
    employees() {
        return store.customers.filter(customer => {
            return customer.employerId == this.id
        })
    }
    
    deliveries(){
        let allDeliveries = this.employees().map(employee => {
            return employee.deliveries()
        })
        let merged = [].concat.apply([], allDeliveries)
        return merged 
    }
    
    meals(){
        let allMeals = this.deliveries().map(delivery => {
            return delivery.meal()
        })
        let uniqueMeals = [...new Set(allMeals)]
        return uniqueMeals 
    }
    
    mealTotals() {
        let mealsOrdered = this.deliveries().map(delivery => {
            return delivery.meal()
        })
        
        let summaryObject = {};
        
        mealsOrdered.forEach(function(meal) {
            summaryObject[meal.id] = 0;
        });
        
        mealsOrdered.forEach(function(meal) {
            summaryObject[meal.id] += 1;
        })
        
        return summaryObject;
    }
             
    
}

/* 


mealTotals() - returns a JavaScript object displaying each respective meal id ordered by 
the employer's employees. The keys of the JavaScript object are the meal ids and associated 
with each meal id is a value. For example, employerOne.mealTotals() returning an object of 
{1: 4, 2: 3} would mean that the meal with id of 1 was ordered by employerOne's employees four times, 
and the meal with id of 2 was ordered by employerOne's employees three times.

*/