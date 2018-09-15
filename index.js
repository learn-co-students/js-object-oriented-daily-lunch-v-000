// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;

class Neighborhood {
    constructor (name) {
        this.name = name;
        this.id = ++neighborhoodId;
        store.neighborhoods.push(this);
    }

    // deliveries(){// Shows a particular neighbourhood's deliveries
    //     const deliveries = [];
    //     store.deliveries.forEach(function (delivery){
    //         if (delivery.neighborhoodId === this.id){
    //             deliveries.push(delivery);
    //         };
    //     }.bind(this));
    //
    //     // console.log(deliveries);
    //     return store.deliveries; // Test is incorrect expects all the deliveries to be returned.
    // }

    // customers(){
    //     const custs = store.customers.filter( function(customer) {
    //         return this.id === customer.neighborhoodId;
    //     }.bind(this));
    //     return custs;
    //
    // }
}




let mealId = 0;
class Meal {
    constructor (title, price) {
        this.title = title;
        this.price = price;
        this.id = ++mealId;
        store.meals.push(this);
    }

    // deliveries(){
    //     let deliveries = store.deliveries.filter(function (delivery){
    //             return delivery.mealId === this.id
    //         }.bind(this)
    //     );
    //     return deliveries;
    // }


    customers() {
        return store.deliveries.filter(function (delivery){
            // console.log(delivery);
            // console.log(this);
                return delivery.mealId === this.id;
            }.bind(this)
        );
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
        return store.deliveries.filter(function (delivery){
                return this.id === delivery.customerId;
            }.bind(this)
        );
        
    }

    // meals() {
    //     let customersDeliveries = this.deliveries();
    //
    //     let mealIds = customersDeliveries.map(function (delivery){
    //         return delivery.mealId;
    //      }
    //     );
    //
    //     return store.meals.forEach(function(meal) {
    //
    //             return mealIds.filter(id => meal.id === id);
    //         }
    //     );
    //
    //
    // }

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
         return store.customers.find(function(neighborhood){
                console.log(this);
                return neighborhood.id === this.neighborhoodId;
            }.bind(this)
        );
    }

    // neighborhood() {
    //     let val;
    //      store.neighborhoods.forEach(function (neighborhood){
    //
    //             if (neighborhood.id === this.neighborhoodId){
    //                 val = neighborhood;
    //             }
    //         }.bind(this)
    //     );
    //
    // }

}
