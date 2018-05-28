// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };


let neighborhoodId = 0;

class Neighborhood {	
	constructor (name) {
		this.id = ++neighborhoodId;
		this.name = name 

		store.neighborhoods.push(this);
	}

	deliveries() {
		return store.deliveries.filter(delivery => {
			return delivery.neighborhood() === this;
		});
	}

	customers() {
		return store.customers.filter(customer => {
			return customer.neighborhoodId === this.id;
		});
	}

	meals() {
		let uniqueMeals = this.deliveries().map(delivery => {
			return delivery.meal();
		});
		return Array.from(new Set(uniqueMeals));
	}
}

let customerId = 0;

class Customer {
	constructor (name, neighborhoodId) {
		this.id = ++customerId;
		this.name = name;
		if (neighborhoodId) {
			this.neighborhoodId = neighborhoodId;
		}

		store.customers.push(this);
	}

	deliveries() {
		return store.deliveries.filter(delivery => {
			return delivery.customer() === this;
		});
	}

	meals() {
		return this.deliveries().map(delivery => {
			return delivery.meal();
		});
	}

	totalSpent() {
		return this.meals().reduce(function (agg, meal) {
			return agg + meal.price;
		}, 0);
	}
}

let mealId = 0;

class Meal {
	constructor (title, price) {
		this.id = ++mealId;
		this.title = title;
		this.price = price;

		store.meals.push(this);
	}

	deliveries() {
		return store.deliveries.filter(delivery => {
			return delivery.mealId === this.id;
		});
	}

	customers() {
		return this.deliveries().map(delivery => {
			return delivery.customer();
		});
	}

	static byPrice() {
		return store.meals.slice().sort(function (meal1, meal2) {
			return meal2.price - meal1.price;
		});
	}
}

let deliveryId = 0;

class Delivery {
	constructor (mealId, neighborhoodId, customerId) {
		this.id = ++deliveryId;
		if (mealId) {
			this.mealId = mealId;
		}
		if (neighborhoodId) {
			this.neighborhoodId = neighborhoodId;
		}
		if (customerId) {
			this.customerId = customerId;
		}

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












































