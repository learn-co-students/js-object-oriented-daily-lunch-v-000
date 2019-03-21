// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 1;
let customerId = 1;
let mealId = 1;
let deliveryId = 1;

class Neighborhood {
	constructor(name) {
		this.name = name;
		this.id = neighborhoodId;
		neighborhoodId++;
		store.neighborhoods.push(this);
	}

	deliveries() {
		return store.deliveries.filter(
			function(delivery) {
				return delivery.neighborhoodId === this.id
			}.bind(this)
		);
	}

	customers() {
		return store.customers.filter(
			function(customer) {
				return customer.neighborhoodId === this.id
			}.bind(this)
		);
	}

	meals() {
		const allMeals = this.customers().map(customer => customer.meals());
		const merged = [].concat.apply([], allMeals);
		return [...new Set(merged)];
	}
}

class Customer {
	constructor(name, neighborhoodId) {
		this.name = name;
		this.neighborhoodId = neighborhoodId;
		this.id = customerId;
		customerId++;
		store.customers.push(this);
	}

	deliveries() {
		return store.deliveries.filter(
			function(delivery) {
				return delivery.customerId === this.id
			}.bind(this)
		);
	}

	meals() {
		return this.deliveries().map(
			function(delivery) {
				return delivery.meal()
			});
	}

	totalSpent() {
		return this.meals().reduce(
			function(agg, el, i) {
				agg += el.price;

				return agg
			}, 0);
	}

}

class Meal {
	constructor(title, price) {
		this.title = title;
		this.price = price;
		this.id = mealId;
		mealId++;
		store.meals.push(this);
	}

	deliveries() {
		return store.deliveries.filter(
			function(delivery) {
				return delivery.mealId === this.id
			}.bind(this)
		);
	}

	customers() {
		return this.deliveries().map(
			function(delivery) {
				return delivery.customer()
			}
		);
	}

	static byPrice() {
		return store.meals.sort(
      		function(a, b) {
      			return b.price - a.price
      		}
		);
	}
}

class Delivery {
	constructor(mealId, neighborhoodId, customerId) {
		this.mealId = mealId;
		this.neighborhoodId = neighborhoodId;
		this.customerId = customerId;
		this.id = deliveryId;
		deliveryId++;
		store.deliveries.push(this)
	}

	customer() {
		return store.customers.find(
			function(customer) {
				return customer.id === this.customerId
			}.bind(this)
		);
	}

	meal() {
		return store.meals.find(
			function(meal) {
				return meal.id === this.mealId
			}.bind(this)
		);
	}

	neighborhood() {
		return store.neighborhoods.find(
			function(neighborhood) {
				return neighborhood.id === this.neighborhoodId
			}.bind(this)
		);	
	}
}