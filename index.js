// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let customerId = 0;
let neighborhoodId = 0;
let mealId = 0;
let deliveryId = 0;
class Neighborhood {
	constructor(name) {
		this.name = name;
		this.id = ++neighborhoodId;

		store.neighborhoods.push(this);
	}
}
class Customer {
	constructor(name, neighborhoodId) {
		this.name = name;
		this.neighborhoodId = neighborhoodId;
		this.id = ++customerId;

		store.customers.push(this);
	}
}
class Meal {
	constructor(title, price) {
		this.title = title;
		this.price = price;
		this.id = ++mealId;

		store.meals.push(this);
	}
}
