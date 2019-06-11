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

	deliveries() {
		return store.deliveries.filter(delivery => {
			return delivery.neighborhoodId === this.id;
		});
	}

	customers() {
		return store.customers.filter(customer => {
			return customer.neighborhoodId === this.id;
		});
	}

	meals() {
		const neighborhoodsCustomers = this.customers().map(customer => customer.meals());
		return [...new Set (neighborhoodsCustomers.flat())];
	}

}

let customerId = 0;

class Customer {
	// has many deliveries
	// has many meals through deliveries
	// belongs to neighborhood

	constructor(name, neighborhoodId = undefined) {
		this.name = name;
		if (neighborhoodId) {
			this.neighborhoodId = neighborhoodId;
		}
		this.id = ++customerId

		store.customers.push(this);
	}

	deliveries() {
		return store.deliveries.filter(delivery => {
			return delivery.customerId === this.id;
		});
	}

	meals() {
		return this.deliveries().map(delivery => {
			return delivery.meal();
		});
	}

	totalSpent() {
		let customersMealsByPrice = this.meals().sort((a, b) => b.price - a.price);
		return customersMealsByPrice.reduce(function (total, currentMeal) {
			return total += currentMeal.price;
		}, 0);
	}


}

let mealId = 0;

class Meal {
	// has many customers
	// has many deliveries through customers

	constructor(title, price) {
		this.title = title;
		this.price = price;
		this.id = ++mealId;

		store.meals.push(this);
	}

	deliveries() {
		return store.deliveries.filter(delivery => {
			return delivery.mealId === this.id;
		});
	}

	customers() {
		return store.customers.filter(customer => {
			return customer.meals().filter(meal => {
				return mealId === this.id;
			});
		});
	}

	static byPrice() {
		return store.meals.sort((a, b) => b.price - a.price);
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

	meal() {
		return store.meals.find(
			function(meal) {
				return meal.id === this.mealId;
			}.bind(this)
		);
	}

	customer() {
		return store.customers.find(
			function(customer) {
				return customer.id === this.customerId;
			}.bind(this)
		);
	}

	neighborhood() {
		return store.neighborhoods.find(
			function(neighborhood) {
				return neighborhood.id === this.neighborhoodId;
			}.bind(this)
		);
	}

}
