// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood {
    constructor(name){
        this.name = name;
        this.id = ++neighborhoodId;
        store.neighborhoods.push(this);
    }

    deliveries(){
        return store.deliveries.filter(
            function(delivery){
                return neighborhoodId === this.id;
            }.bind(this)
        )
    }

    customers(){
        return store.customers.filter(
            function(customer){
                return neighborhoodId === this.id;
            }.bind(this)
        )
    }

    meals(){
        let neighborhoodMeals = this.deliveries().map(function(delivery){
            return delivery.meal();
        })

        let uniqueNeighborhoodMeals = [];

        neighborhoodMeals.forEach(
            function(meal){
                if (!uniqueNeighborhoodMeals.includes(meal)) {
                    uniqueNeighborhoodMeals.push(meal);
                }
            }
        )

        return uniqueNeighborhoodMeals;
    }
}

class Customer {
    constructor(name, neighborhoodId){
        this.name = name;
        this.neighborhoodId = neighborhoodId;
        this.id = ++customerId;
        store.customers.push(this);
    }

    deliveries(){
        return store.deliveries.filter(
            function(delivery){
                return delivery.customerId === this.id;
            }.bind(this)
        )
    }

    meals(){
        return this.deliveries().map(function(delivery){
            return delivery.meal();
        })
    }

    totalSpent(){
        return this.meals().reduce(function(accumulator, currentValue){
            return accumulator + currentValue.price;
        }, 0);

    }
}

class Meal {
    constructor(title, price){
        this.title = title;
        this.price = price;
        this.id = ++mealId;
        store.meals.push(this);
    }

    deliveries(){
        return store.deliveries.filter(
            function(delivery){
                return delivery.mealId  === this.id;
            }.bind(this)
        )
    }

    customers(){
        return this.deliveries().map(function(delivery){
            return delivery.customer();
        })
    }

    static byPrice(){
        let allMeals = store.meals.slice();
        return allMeals.sort(function(a, b){
            return b.price - a.price;
        });
    }
}

class Delivery {
    constructor(mealId, neighborhoodId, customerId){
        this.id = ++deliveryId;
        this.mealId = mealId;
        this.customerId = customerId;
        this.neighborhoodId = neighborhoodId;
        store.deliveries.push(this);
    }

    meal(){
        return store.meals.find(
            function(meal){
                return meal.id  === this.mealId;
            }.bind(this)
        )
    }

    customer(){
        return store.customers.find(
            function(customer){
                return customer.id  === this.customerId;
            }.bind(this)
        )      
    }

    neighborhood(){
        return store.neighborhoods.find(
            function(neighborhood){
                return neighborhood.id === this.neighborhoodId;
            }.bind(this)
        )
    }
}