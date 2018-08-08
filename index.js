// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighId = 0;
let custId = 0;
let mId = 0;

class Neighborhood{
    constructor(name){
        this.name = name;
        this.id = ++neighId;
    
        store.neighborhoods.push(this)
    }

    deliveries(){
        return store.deliveries.filter(deliv => {
            return deliv.neighborhoodId === this.id;
        });
    }

    // a neighborhood has many customers through deliveries
    customers(){
        return this.deliveries().map(x => {x.customer()})
    }

    meals(){
        // do this one last
    }
}

class Customer{
    constructor(name, neighborhoodId){
        this.name = name;
        this.neighborhoodId = neighborhoodId;
        this.id = ++ custId;

        store.customers.push(this)
    }

    deliveries(){
        return store.deliveries.filter(x => {return x.customerId === this.id})
    }
    // a customer has many meals through deliveries! 
    meals(){
        return this.deliveries().map(x => { return x.meal})
    }

    totalSpent(){
        // returns the total amount that the customer has spent on food.
    }
}

class Meal{
    constructor(title, price){
        this.title = title;
        this.price = price;
        this.id = ++mId;

        store.meals.push(this)

    }
    // a delivery belongs to a meal
    deliveries(){
        return store.meals.filter(meal => {return meal.deliveryId === this.id})
    }

    // a meal has many customers
    // ahh I'm confused
    customers(){
        return store.customers.filter(customer => {return customer.mealId === this.id})
    }

    static byPrice(){
        return store.meals.sort(function(a, b){
            return (a.price) - (b.price)
        });
    }    
}