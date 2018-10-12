// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Neighborhood {
	constructor(name) {
		this.id = ++neighborhoodId;
		this.name = name;
		store.neighborhoods.push(this);
	}

	deliveries() {
		return store.deliveries.filter(d => d.neighborhoodId === this.id);
	}

	customers() {
		return store.customers.filter(c => c.neighborhoodId === this.id);
	}

	meals() {
		let deliveries = this.deliveries().map(d => d.mealId);
		return [...new Set(deliveries)];
	}
}

class Customer {
	constructor(name, neighborhoodId) {
		this.id = ++customerId;
		this.neighborhoodId = neighborhoodId;
		this.name = name;
		store.customers.push(this);
	}

	deliveries() {
		return store.deliveries.filter(d => d.customerId === this.id);
	}

	meals() {
		let deliveries = store.deliveries.filter(d => d.customerId === this.id); // deliveries with only this cust.
		let customerMeals = [];
		deliveries.forEach(
			function(d) {
				customerMeals.push(store.meals.find(m => m.id === d.mealId));
			}
		)
		
		return customerMeals;
	}

	totalSpent() {
		let meals = this.meals();
		return meals.reduce((t, m) => t + m.price, 0);
	}
}

class Meal {
	constructor(title, price) {
		this.id = ++mealId;
		this.title = title;
		this.price = price;
		store.meals.push(this);
	}

	deliveries() {
		return store.deliveries.filter(d => d.mealId === this.id);
	}

	customers() {
		let customerIds = this.deliveries().map(d => d.customerId);
		let meals = [];
		customerIds.forEach(
			function(custId) {
				meals.push(store.customers.find(c => c.id === custId));
			}
		);

		return meals;
	}

	static byPrice() {
		return store.meals.sort((a, b) => b.price - a.price);
	}
}

class Delivery {
	constructor(mealId, neighborhoodId, customerId) {
		this.id = ++deliveryId;
		this.mealId = mealId;
		this.neighborhoodId = neighborhoodId;
		this.customerId = customerId;
		store.deliveries.push(this);
	}

	meal() {
		return store.meals.find(m => m.id === this.mealId);
	}

	customer() {
		return store.customers.find(c => c.id === this.customerId);
	}

	neighborhood() {
		return store.neighborhoods.find(n => n.id === this. neighborhoodId);
	}
}

