// global datastore

let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;

class Neighborhood {
    constructor(name) {
        this.name = name
        this.id = ++neighborhoodId

        store.neighborhoods.push(this)
    }
    // neighborhood has many deliveries
    deliveries() {
        return store.deliveries.filter(
            function(delivery) {
                return delivery.neighborhoodId === this.id;
            }.bind(this)
        )
    }

    //neighborhood has many customers through deliveries
    customers() {
        return store.customers.filter(
            function(customer) {
                return customer.neighborhoodId === this.id;
            }.bind(this)
        )

    }

    //neighborhood has many meals through deliveries -- do this last
    meals() {
        const allMeals = this.customers().map(customer => customer.meals());
        const merged = [].concat.apply([], allMeals);
        return [...new Set(merged)];
    }
}

let customerId = 0;

class Customer {
    constructor(name, neighborhoodId) {
        this.name = name
        this.id = ++customerId
        this.neighborhoodId = neighborhoodId

        store.customers.push(this)
    }

    //customer has many deliveries
    deliveries() {
        return store.deliveries.filter(
            function(delivery) {
                return delivery.customerId === this.id;
            }.bind(this)
        )
    }

    //customer has many meals through deliveries
    meals() {
        return this.deliveries().map(delivery => {
            return delivery.meal()
        })
    }

    totalSpent() {
        return this.meals().reduce(function(total, meal) {
            return total += meal.price;},
            0);
    }
}

let mealId = 0

class Meal {
    constructor(title, price) {
        this.title = title
        this.price = price
        this.id = ++mealId

        store.meals.push(this)
    }

    //meal has one delivery
    deliveries() {
        let allDeliveries = store.deliveries.filter(
            function(delivery) {
                return delivery.mealId === this.id;
            }.bind(this))
        return allDeliveries
    }

    //meal has many customers
    customers() {
        return this.deliveries().map(
            function(delivery) {
                return delivery.customer()
            }.bind(this)
        )
    }

    static byPrice() {
        return store.meals.sort(function(meal1, meal2) {
            return meal2.price - meal1.price;
        })
    }
}

let deliveryId = 0

class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
        this.id = ++deliveryId
        this.mealId = mealId
        this.neighborhoodId = neighborhoodId
        this.customerId = customerId
        
        store.deliveries.push(this)
        
    }
    
    //delivery belongs to a meal
    meal() {
        return store.meals.find(meal => {
            return this.mealId === meal.id;
        })
    }

    //delivery belongs to a customer
    customer() {
        return store.customers.find(customer => {
            return this.customerId === customer.id;
        })
    }

    //delivery belongs to a neighborhood
    neighborhood() {
        return store.neighborhoods.find(neighborhood => {
            return this.neighborhoodId === neighborhood.id;
        })
    }
        

    
}