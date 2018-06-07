// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };


let neighborhoodId = 0;
class Neighborhood {
	constructor(name){
		this.id = ++neighborhoodId;
        this.name = name;
        
        store.neighborhoods.push(this);
	}

	deliveries() {
		return store.deliveries.filter(delivery => {
			return delivery.neighborhoodId === this.id;
		});
    }
    
    customers() {
        const customerIds = this.deliveries().map(delivery => {
            return delivery.customerId;
        });

        return store.customers.filter(customer => {
            return customerIds.indexOf(customer.id) > -1;
        });
    }

    meals(){
        // TODO
    }
}

let customerId = 0;
class Customer {
    constructor(name, neighborhoodId){
        this.id = ++customerId;
        this.name = name;
        this.neighborhoodId = neighborhoodId;

        store.customers.push(this);
    }

    deliveries() {
        return store.deliveries.filter(delivery => {
            return delivery.customerId === this.id;
        });
    }
}

let mealId = 0;
class Meal {
    constructor(title, price){
        this.id = ++mealId;
        this.title = title;
        this.price = price;

        store.meals.push(this);
    }
}

let deliveryId = 0;
class Delivery {
    constructor(mealId, neighborhoodId, customerId){
        this.id = ++deliveryId;
        this.mealId = mealId;
        this.neighborhoodId = neighborhoodId;
        this.customerId = customerId;

        store.deliveries.push(this);
    }
}