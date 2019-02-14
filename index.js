// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0 
let mealId = 0 
let customerId = 0
let deliveryId = 0

class Neighborhood {
    constructor(name) {
        this.id = ++neighborhoodId
        this.name = name         
        store.neighborhoods.push(this)
    }

    deliveries() {
        return store.deliveries.filter(delivery => {
            return delivery.neighborhoodId === this.id
        })
    }

    // // this method was a tough one
    customers() {
        const allCustomers = this.deliveries().map(delivery => delivery.customer()); //.map creates a new array and assigns it to allCustomers variable here
        return [...new Set(allCustomers)]; //use ...new Set to remove duplicate elements from the array
    }

    //this works too for customers()
    // customers() {
    //     return store.customers.filter(customer => customer.neighborhoodId === this.id)
    // }

    // googled "how to return only unique elements of an array in javascript" and this first link had the answer https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
    meals() {
        const arrayOfMeals = this.deliveries().map(delivery => delivery.meal()); //creates an array of meals that were delivered to a neighborhood

        // this function returns only unique values of a given array. Found on stackoverflow
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        return arrayOfMeals.filter(onlyUnique)
    }
}

class Meal {
    constructor(title, price) {
        this.id = ++mealId
        this.title = title 
        this.price = price
        store.meals.push(this) 
    }

    deliveries() {
        return store.deliveries.filter(delivery => {
            return delivery.mealId === this.id
        })
    }

    customers() {
        const allCustomers = this.deliveries().map(delivery => delivery.customer()); //.map creates a new array and assigns it to allCustomers variable here
        return [...new Set(allCustomers)]; //use ...new Set to remove duplicate elements from the array
    }
    //this does NOT work here even though it does for Neighborhood for some reason... probably because it does not return UNIQUE elements
    // customers() {
    //     return store.customers.filter(customer => customer.mealId === this.id)
    // }

    // this method is used  A LOT in REACT
    static byPrice() {
        return store.meals.sort((a, b) => a.price > b.price ? -1 : 1)
    }
}

class Customer {
    constructor(name, neighborhoodId) {
        this.id = ++customerId
        this.name = name 
        this.neighborhoodId = neighborhoodId
        store.customers.push(this)
    }

    deliveries() {
        return store.deliveries.filter(delivery => delivery.customerId === this.id)
    }

    meals() {
        return this.deliveries().map(delivery => delivery.meal())
    }

    totalSpent() {
        return this.meals().reduce((total, meal) => total += meal.price, 0) // figure out why adding the '0' changes "[object Object]750600600" to an actual number 2450
    }
}


class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
        this.id = ++deliveryId;
        this.mealId = mealId;
        this.neighborhoodId = neighborhoodId;
        this.customerId = customerId;
        store.deliveries.push(this)
    }

    meal() {
        return store.meals.find(meal => {
            return meal.id === this.mealId
        })
    }

    neighborhood() {
        return store.neighborhoods.find(neighborhood => {
            return neighborhood.id === this.neighborhoodId
        })
    }

    customer() {
        return store.customers.find(customer => {
           return customer.id === this.customerId
        })
    }
}