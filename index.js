// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

neighborhoodId = 0
class Neighborhood {
    constructor(name) {
        this.name = name;
        this.id = ++neighborhoodId;

        store.neighborhoods.push(this);
    }

    deliveries() {
        return store.deliveries.filter(
            function(delivery) {
                return delivery.neighborhoodId === this.id;
            }.bind(this)
        );
    }

    customers() {
        return store.customers.filter(
            function(customer) {
                return customer.neighborhoodId === this.id;
            }.bind(this)
        );
    }

    meals() {
            let meals = []
            store.meals.filter(
                function(meal) {
                    let deliveries = this.deliveries()
                    deliveries.forEach(
                        function(delivery){ 
                            delivery.mealId === meal.id ? meals.push(meal) : null
                        }.bind(this)
                    )
                }.bind(this)
            )
            function onlyUnique(value, index, self) { 
                return self.indexOf(value) === index;
            }
            let unique = meals.filter( onlyUnique );
            return unique;
        }
}

customerId = 0
class Customer {
    constructor(name, neighborhoodId) {
        this.name = name;
        this.neighborhoodId = neighborhoodId;
        this.id = ++customerId;

        store.customers.push(this);
    }

    deliveries() {
        return store.deliveries.filter(
            function(delivery) {
                return delivery.customerId === this.id;
            }.bind(this)
        )
    }

    meals() {
        let meals = []
        store.meals.filter(
            function(meal) {
                let deliveries = this.deliveries()
                deliveries.forEach(
                    function(delivery){ 
                        delivery.mealId === meal.id ? meals.push(meal) : null
                    }.bind(this)
                )
            }.bind(this)
        )
        return meals;
    }

    totalSpent() {
        let meals = this.meals()

        return meals.reduce(
            function(acc, el, ci, arr) {
                if (ci === arr.length-1) {
                    return acc += el.price  ;
                } else {
                    return acc += el.price;
                }
            },     
        0)
    }
}

mealId = 0
class Meal {
    constructor(title, price) {
        this.title = title;
        this.price = price;
        this.id = ++mealId;

        store.meals.push(this);
    }

    deliveries() {
        return store.deliveries.filter(
            function(delivery) {
                return delivery.mealId === this.id
            }.bind(this)
        )
    }

    customers() {
        let customers = []
        store.customers.filter(
            function(customer) {
                let deliveries = this.deliveries()
                deliveries.forEach(
                    function(delivery){ 
                        delivery.customerId === customer.id ? customers.push(customer) : null
                    }.bind(this)
                )
            }.bind(this)
        )
        return customers;
    }
}

Meal.byPrice = function() {
    return store.meals.sort((a, b) => b.price - a.price)
}

deliveryId = 0
class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
        this.id = ++deliveryId;
        this.mealId = mealId;
        this.neighborhoodId = neighborhoodId;
        this.customerId = customerId;

        store.deliveries.push(this);
    }

    meal() {
        return store.meals.find(
            function(meal) {
                return meal.id === this.mealId
            }.bind(this)
        )
    }

    customer() {
        return store.customers.find(
            function(customer) {
                return customer.id === this.customerId
            }.bind(this)
        )
    }

    neighborhood() {
        return store.neighborhoods.find(
            function(neighborhood) {
                return neighborhood.id === this.neighborhoodId
            }.bind(this)
        )
    }
}