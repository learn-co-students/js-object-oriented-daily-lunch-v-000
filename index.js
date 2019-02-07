// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
// variables
let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

// Define classes
class Neighborhood {
    constructor(name){
        this.name = name;
        this.id = ++neighborhoodId;

        store.neighborhoods.push(this);
    }

    deliveries() {
        return store.deliveries.filter(function(delivery) {
                return delivery.neighborhoodId === this.id
            }.bind(this)
        )
    }

    customers() {
        return store.customers.filter(function(customer) {
                return customer.neighborhoodId === this.id
            }.bind(this)
        )
    }
}
class Customer {
    constructor(name, neighborhoodId){
        this.name = name;
        this.neighborhoodId = neighborhoodId;
        this.id = ++customerId;

        store.customers.push(this);
    }

    deliveries() {
        return store.deliveries.filter(function(delivery) {
                return delivery.customerId === this.id
            }.bind(this)
        )
    }

    meals() {
        return this.deliveries().map(function(delivery) {
                return store.meals.find(function(meal){
                    return meal.id === delivery.mealId;
                })
            }
        )
    }
}

class Meal {
    constructor(title, price){
        this.title = title;
        this.price = price;
        this.id = ++mealId;

        store.meals.push(this);
    }

    deliveries() {
        return store.deliveries.filter(function(delivery) {
                return delivery.mealId === this.id
            }.bind(this)
        )
    }

    customers() {
        return this.deliveries().map(function(delivery) {
                return store.customers.find(function(customer){
                    return customer.id === delivery.customerId
                })
            }
        )
    }
}

class Delivery {
    constructor(mealId, neighborhoodId, customerId){
        this.mealId = mealId;
        this.neighborhoodId = neighborhoodId;
        this.customerId = customerId;
        this.id = ++deliveryId;

        store.deliveries.push(this);
    }

    meal() {
        return store.meals.find(function(meal) {
                return meal.id === this.mealId
            }.bind(this)
        )
    }

    customer() {
        return store.customers.find(function(customer) {
                return customer.id === this.customerId
            }.bind(this)
        )
    }

    neighborhood() {
        return store.neighborhoods.find(function(neighborhood) {
                return neighborhood.id === this.neighborhoodId
            }.bind(this)
        )
    }
}

// Define aggregate / prototype functions

Meal.byPrice = function() {
    let meals = store.meals

    return meals.sort(function(a, b) {
        return a.price - b.price
    }).reverse()
}

Customer.prototype.totalSpent = function() {
    let i = 0;
    
    return this.meals().reduce(function(totalSpent, el){
        return totalSpent + el.price;
    }, i)
}

Neighborhood.prototype.meals = function() {
    let allNeighborHoodMeals = this.deliveries().map(function(delivery) {
            return delivery.meal()
        }
    )
    
    let uniqueNeighborHoodMeals = [...new Set(allNeighborHoodMeals)]
    
    return uniqueNeighborHoodMeals
}