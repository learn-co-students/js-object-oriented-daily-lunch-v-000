// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
// ID counters for instances of our classes:
let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;
let totalExpenditure = 0;



class Neighborhood {
    
    constructor(name) {
        this.id = ++neighborhoodId;
        this.name = name;
        store.neighborhoods.push(this)
    };

    deliveries() {
        return store.deliveries.filter(delivery => {
            return delivery.neighborhoodId == this.id;
        })
    };

    customers() {
        return store.customers.filter(customer => {
            return customer.neighborhoodId == this.id;
        }); 
    };

    meals() {
        function onlyUnique(value, index, array) { 
            return array.indexOf(value) === index;
        };

        let neighborhoodMeals =  this.deliveries().map(delivery => {
            return delivery.meal()
        });

        return neighborhoodMeals.filter(onlyUnique);
    };
};

class Meal {
    constructor(title, price) {
        this.id = ++mealId;
        this.title = title;
        this.price = price;
        store.meals.push(this);
    };

    deliveries() {
        return store.deliveries.filter(delivery => {
            return delivery.mealId == this.id
        })
    };

    customers() {
        return this.deliveries().map(delivery => {
            return delivery.customer();
        })
    };
    
    static byPrice() {
        return store.meals.sort(function(firstMeal, secondMeal) {
            return (firstMeal.price - secondMeal.price) * -1;
        });
    };
};

class Customer {
    constructor(name, neighborhoodId) {
        this.id = ++customerId;
        this.name = name;
        if(neighborhoodId) {
            this.neighborhoodId = neighborhoodId;
        };
        store.customers.push(this); 
    };

    deliveries() {  
        return store.deliveries.filter(delivery => {
            return delivery.customerId == this.id
        })
    };

    meals() {
        return this.deliveries().map(delivery => {
            return delivery.meal();
        })
    };

    totalSpent() {
        return this.meals().reduce(function(agg, currentValue) {
            return agg + currentValue.price;
        }, 0)
    }
};

class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
        this.id = ++deliveryId;
        if (mealId) {
            this.mealId = mealId;
        };
        if (neighborhoodId) {
            this.neighborhoodId = neighborhoodId; 
        };
        if (customerId) {
            this.customerId = customerId;
        };

        store.deliveries.push(this);
    };

    meal() {
        return store.meals.find(meal => {
            return meal.id == this.mealId;
        })
    };

    customer() {
        return store.customers.find(customer => {
            return customer.id == this.customerId
        })
    };

    neighborhood() {
        return store.neighborhoods.find(neighborhood => {
            return neighborhood.id == neighborhoodId;
        })
    };
};

// less than 0 — a comes before b
// greater than 0  — b comes before a
// equal to 0  — a and b are left unchanged with respect to each other