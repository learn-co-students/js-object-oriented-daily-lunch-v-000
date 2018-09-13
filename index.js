// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;

class Neighborhood {
    constructor (name) {
        this.name = name;
        this.id = ++neighborhoodId;
        store.neighborhoods.push(this);
    }

    deliveries(){
        let deliveries = store.deliveries.filter(delivery => delivery.neighborhoodId == this.id);

        console.log(deliveries);
    }
}

let mealId = 0;
class Meal {
    constructor (title, price) {
        this.title = title;
        this.price = price;
        this.id = ++mealId;
        store.meals.push(this);
    }
}

let customerId = 0;
class Customer {
    constructor (name, neighborhood) {
        this.name = name;
        this.id = ++customerId;
        store.customers.push(this);
        if (neighborhood){
            this.neighborhoodId = neighborhood;
        }


    }

}

let deliveryId = 0;

class Delivery {
    constructor (meal, customer, neighborhood){
        this.id = ++deliveryId;
        this.mealId = meal;
        this.customerId = customer;
        this.neighborhoodId = neighborhood;
        store.deliveries.push(this);
    }

}
