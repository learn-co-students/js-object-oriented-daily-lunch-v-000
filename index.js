// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood {
    constructor(name){
        this.id = ++neighborhoodId;
        this.name = name;
        store.neighborhoods.push(this);
    }

    deliveries(){
        return store.deliveries.filter(function(delivery){
            return delivery.neighborhoodId === this.id;
        }.bind(this)
        );
    }

    customers(){
        return store.customers.filter(function(customer){
            return customer.neighborhoodId === this.id;
        }.bind(this)
        );
    }

    meals(){
       const allMeals = this.customers().map(function(customer){
            return customer.meals();
        })
        const uniqueMeals = Array.prototype.concat.apply([], allMeals) 
        //concatenates [] and allMeals
        //or [].concat.apply([], allMeals) - apply and not call because apply takes in an array as its second argument
        //concat() simply concatenates the two, and apply just executes the method
        return [...new Set(uniqueMeals)]; //to get unique values, in Set, there can't be duplicates
    }
}

class Customer {
    constructor(name, neighborhoodId){
        this.id = ++customerId;
        this.name = name;
        this.neighborhoodId = neighborhoodId;
        store.customers.push(this);
    }

    deliveries(){
        return store.deliveries.filter(function(delivery){
            return delivery.customerId === this.id;
        }.bind(this)
        );
    }

    meals(){
        return this.deliveries().map(function(delivery){
            return delivery.meal();
        });
    }

    totalSpent(){
        return this.meals().reduce(function(sum, meal){
            return sum + meal.price;
        }, 0);
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
        return store.deliveries.filter(function(delivery){
            return delivery.mealId === this.id;
        }.bind(this)
        );
    }

    customers(){
        return this.deliveries().map(function(delivery){
            return delivery.customer();
        });
    }

    static byPrice(){
        return store.meals.sort(function(a, b){
            return a.price < b.price;
        });
    }
}

class Delivery {
    constructor(mealId, neighborhoodId, customerId){
        this.id = ++deliveryId;
        this.mealId = mealId;
        this.neighborhoodId = neighborhoodId;
        this.customerId = customerId;
        store.deliveries.push(this);
    }

    meal(){
        return store.meals.find(function(meal){
           return meal.id === this.mealId;
        }.bind(this)
        );
    }
    //return store.meals.find(meal => meal.deliveryID === this.id)

    customer(){
        return store.customers.find(function(customer){
            return customer.id === this.customerId;
         }.bind(this)
         );
     }

    neighborhood(){
        return store.neighborhoods.find(function(neighborhood){
            return neighborhood.id === this.neighborhoodId;
         }.bind(this)
         );
    }
}