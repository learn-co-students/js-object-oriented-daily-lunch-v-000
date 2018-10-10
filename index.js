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
        return store.deliveries.filter(
            function(delivery){
                return delivery.neighborhoodId === this.id;
            }.bind(this)
        );
    }
    customers(){
        return store.customers.filter(
            function(customer){
                return customer.neighborhoodId === this.id;
            }.bind(this)
        );
    }
    meals(){
        let list = [];
        this.deliveries().filter(
            function(delivery){
                list.push(delivery.meal());
            }
        )
        return [...new Set(list)];
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
        return store.deliveries.filter(
            function(delivery){
                return delivery.mealId === this.id;
            }.bind(this)
        );
    }
    customers(){
        let list = [];
        this.deliveries().map(
            function(delivery){
                list.push(delivery.customer());
            })
        return [...new Set(list)];
    }
    static byPrice(){
        return store.meals.sort(
            function(a, b){
                return b.price - a.price;
            }.bind(this)
        );
    }
}

class Customer {
    constructor(name, neighborhoodId){
        this.id = ++customerId;
        this.neighborhoodId = neighborhoodId;
        this.name = name;
        store.customers.push(this);
    }
    deliveries(){
        return store.deliveries.filter(
            function(delivery){
                return delivery.customerId === this.id;
            }.bind(this)
        );
    }
    meals(){
        return this.deliveries().map(
            function(delivery){
                return delivery.meal();
            }
        )
    }
    totalSpent(){
        let total = 0;
        this.meals().map(
            function(meal){
                total = total + meal.price;
            }
        )
        return total;
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
        return store.meals.find(
            function(meal){
                return meal.id === this.mealId;
            }.bind(this)
        );
    }
    customer(){
        return store.customers.find(
            function(customer){
                return customer.id === this.customerId;
            }.bind(this)
        );
    }
    neighborhood(){
        return store.neighborhoods.find(
            function(neighborhood){
                return neighborhood.id === this.neighborhoodId;
            }.bind(this)
        );
    }
}