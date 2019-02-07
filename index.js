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
        
    }
}
class Customer {
    constructor(name, neighborhoodId){
        this.name = name;
        this.neighborhoodId = neighborhoodId;
        this.id = ++customerId;

        store.customers.push(this);
    }
}

class Meal {
    constructor(title, price){
        this.title = title;
        this.price = price;
        this.id = ++mealId;

        store.meals.push(this);
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
}


// VARIABLES FOR TESTING

// neighborhood = new Neighborhood('Dumbo');
// secondNeighborhood = new Neighborhood('Hamsterdam');
// meal = new Meal('5 lbs of Fruity Pebbles', 25);
// secondMeal = new Meal('An entire large stuffed crust pizza from pizza hut', 20);
// customer = new Customer('Paul Rudd', neighborhood.id);
// secondCustomer = new Customer('Todd', secondNeighborhood.id);
// delivery = new Delivery(meal.id, neighborhood.id, customer.id);
// secondDelivery = new Delivery(secondMeal.id, secondNeighborhood.id, secondCustomer.id);
// thirdDelivery = new Delivery(secondMeal.id, secondNeighborhood.id, secondCustomer.id);