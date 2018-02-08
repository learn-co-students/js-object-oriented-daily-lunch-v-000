let store = {deliveries: [], meals: [], employers: [], customers: []}

let deliveryId = 0;
class Delivery{
    constructor(meal, customer){
        this.id = ++deliveryId
        if(meal && customer){
            this.mealId =  meal.id
            this.customerId = customer.id
        }
        store.deliveries.push(this)
    }

    customer(){
        return store.customers.find(cust =>{
            return cust.id === this.customerId
        })
    }

    meal(){
        return store.meals.find(meal =>{
            return meal.id === this.mealId
        })
    }
}

let mealId = 0;
class Meal{
    constructor(title, price){
        this.id = ++mealId;
        this.title = title;
        this.price = price;
        store.meals.push(this)
    }

    deliveries(){
        return store.deliveries.filter(delivery =>{
            return delivery.mealId === this.id
        })
    }

    customers(){
        return store.customers.filter(cust =>{
            return store.deliveries.filter(delivery =>{
                delivery.mealId === this.id
            })
        })
    }

    static byPrice(){
        return store.meals.sort(function(a,b){
            return b.price - a.price
        })
    }
}

let employerId = 0;
class Employer{
    constructor(name){
        this.id = ++employerId;
        this.name = name;
        store.employers.push(this)
    }

    mealTotals() {
        let allMeals = this.deliveries().map(delivery => {
          return delivery.meal();
        });
        let summaryObject = {};
        allMeals.forEach(function(meal) {
          summaryObject[meal.id] = 0;
        });
        allMeals.forEach(function(meal) {
          summaryObject[meal.id] += 1;
        });
        return summaryObject;
      }

    employees(){
        return store.customers.filter(cust =>{
            return cust.employer.id === this.id
        })
    }

    deliveries(){
        return store.deliveries.filter(delivery =>{
            return delivery.customer().employer.id === this.id
        })
    }

    meals() {
        let allMeals = this.deliveries().map(delivery => {
          return delivery.meal();
        });
        let uniqueMeals = [...new Set(allMeals)];
        return uniqueMeals;
      }
    
}

let customerId = 0;
class Customer{
    constructor(name, employer){
        this.id = ++customerId;
        this.name = name;
        this.employer = employer
        store.customers.push(this)
    }

    meals() {
        return this.deliveries().map(delivery => {
          return delivery.meal();
        });
      }
    

    deliveries(){
        return store.deliveries.filter(delivery =>{
            return delivery.customerId === this.id
        })
    }

    totalSpent(){
        return this.meals().reduce(function(total, el){
            return total + el.price            
        }, 0)
    }
    
}