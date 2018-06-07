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
        const mealIds = this.deliveries().map(delivery => {
            return delivery.mealId;
        });

        return store.meals.filter(meal => {
            return mealIds.indexOf(meal.id) > -1;
        });
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

    meals() {
        const mealIds = this.deliveries().map(delivery => {
            return delivery.mealId;
        });

        const allMeals = [];
        mealIds.forEach(function(mId, index, arr){
            allMeals.push(store.meals.find(meal => {
                return mId === meal.id;
            }));
        });

        // the description of the test ('unique meals')
        // seems to contradict the assertion tested? (line 195 in indexTest.js)
        return allMeals;

        // this actually returns unique meals only, but fails test
        /*
        return store.meals.filter(meal => {
            return mealIds.indexOf(meal.id) > -1;
        });
        */
    }

    totalSpent(){
        return this.meals().reduce(function(agg, el, i, arr){
            return agg + el.price;
        }, 0);
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

    deliveries(){
        return store.deliveries.filter(delivery => {
            return delivery.mealId === this.id;
        });
    }

    customers(){
        const customerIds = this.deliveries().map(delivery => {
            return delivery.customerId;
        });

        return store.customers.filter(customer => {
            return customerIds.indexOf(customer.id) > -1;
        });
    }

    static byPrice(){
        return store.meals.sort(function(meal1, meal2){
            return meal2.price - meal1.price;
        });
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

    meal() {
        return store.meals.find(meal => {
            return meal.id === this.mealId;
        });
    }

    customer() {
        return store.customers.find(customer => {
            return customer.id === this.customerId;
        });
    }

    neighborhood() {
        return store.neighborhoods.find(neighborhood => {
            return neighborhood.id === this.neighborhoodId;
        });
    }
}