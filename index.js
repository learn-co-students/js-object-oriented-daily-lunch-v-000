// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let customerId = 0;

class Neighborhood {
	let neighborhoodId = 0;

	constructor(name) {
		this.name = name;
		this.id = ++neighborhoodId;

		store.neighborhoods.push(this);
	}
}

class Meal {
	let mealId = 0;

	constructor(name, price) {
		this.name = name;
		this.price = price;
		this.mealId = ++mealId;
	}

	deliveries () {

	}

	customers () {

	}

	byPrice () {

	}
}

class Delivery {
	let deliveryId = 0;

	constructor(mealId, neighborhoodId, customerId) {
		this.mealId = mealId;
		this.neighborhoodId = neighborhoodId;
		this.customerId = customerId;
		this.deliveryId = ++deliveryId;
	}
}

