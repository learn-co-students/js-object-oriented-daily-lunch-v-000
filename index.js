// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;

class Neighborhood {
	// has many deliveries
	// has many customers through deliveries
	// has many meals through deliveries

	constructor(name) {
		this.name = name;
		this.id = ++neighborhoodId;

		store.neighborhoods.push(this);
	}

}

let customerId = 0;

class Customer {
	// has many deliveries
	// has many meals through deliveries
	// belongs to neighborhood

	constructor(name, neighborhoodId) {
		this.name = name;
		this.neighborhoodId = neighborhood.id;
		this.id = ++customerId

		store.customers.push(this);
	}

}

let mealId = 0;

class Meal {
	// has many customers

	constructor(title, price) {
		this.title = title;
		this.price = price;
		this.id = ++mealId;

		store.meals.push(this);
	}

}

let deliveryId = 0;

class Delivery {
	// belongs to meal
	// belongs to customer
	// belongs to neighborhood

	constructor(mealId, neighborhoodId, customerId) {
		this.mealId = mealId;
		this.neighborhoodId = neighborhoodId;
		this.customerId = customerId;
		this.id = ++deliveryId;

		store.deliveries.push(this);
	}

}
