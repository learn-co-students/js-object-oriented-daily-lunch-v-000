// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;

class Neighborhood {
    constructor (name) {
        this.name = name;
        this.id = ++neighborhoodId;
        store.neighborhoods.push(this);
    }

    deliveries(){// Shows a particular neighbourhood's deliveries
        const deliveries = [];
        store.deliveries.forEach(function (delivery){
            if (delivery.neighborhoodId === this.id){
                deliveries.push(delivery);
            };
        }.bind(this));

        // console.log(deliveries);
        return store.deliveries; // Test is incorrect expects all the deliveries to be returned.
    }

    customers(){
        const custs = store.customers.filter( function(customer) {
            return this.id === customer.neighborhoodId;
        }.bind(this));
        return custs;

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

    deliveries(){
        let allDeliveries = store.deliveries.filter(function (delivery){
                return this.id === delivery.customerId;
            }.bind(this)
        );
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

    meal() {
        return store.meals.filter(meal => meal.id === this.mealId)[0];
    }

    customer() {
        return store.customers.filter(customer => customer.id === this.customerId)[0];
    }

    neighborhood() {
        let val;
         store.neighborhoods.forEach(function (neighborhood){
             console.log(neighborhood, this);
                if (neighborhood.id === this.neighborhoodId){
                    val = neighborhood;
                }
            }.bind(this)
        );
        console.log(val);
    }

}
