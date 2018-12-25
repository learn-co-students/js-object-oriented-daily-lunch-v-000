// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
class Neighborhood {
	constructor(name) {
		this.name = name;
		this.id = ++neighborhoodId;
		store.neighborhoods.push(this);
	}

	deliveries() {
		return store.deliveries.filter(
			function(d) {
				return d.neighborhoodId === this.id
			}.bind(this)
		);
	};

	customers() {
		return store.customers.filter(
			function(c) {
				return c.neighborhoodId === this.id
			}.bind(this)
		);
	};

	meals() {
		return [...new Set(this.deliveries().map((d) => d.mealId))]
	};
}


let customerId = 0
class Customer {
	constructor(name, neighborhoodId) {
		this.name = name;
		this.neighborhoodId = neighborhoodId;
		this.id = ++ customerId;
		store.customers.push(this);
	}
	deliveries() {
		return store.deliveries.filter(
			function(d) {
				return d.customerId === this.id
			}.bind(this)
		);
	};
	meals() {
		return this.deliveries().map((d) => d.meal() );
	};
	
	totalSpent() {
		return this.meals().reduce((total, meal) => {
			return total += meal.price
		},0);
	};
};

let mealId = 0
class Meal {
	constructor(title, price) {
		this.title = title;
		this.price = price;
		this.id = ++mealId;
		store.meals.push(this);
	};

	deliveries() {
		return store.deliveries.filter(
			function(d) {
				return 	d.mealId === this.id 
			}.bind(this)
		);
	};

	customers() {
		return this.deliveries().map(d => {
			return d.customer()
		})
	};

	static byPrice() {
		return store.meals.sort(function(a, b) {return b.price - a.price} );
	};
};

let deliveryId = 0
class Delivery {
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
				return meal.id === this.mealId
			}.bind(this)
		);
	};
	customer() {
		return store.customers.find(
			function(c) {
				return c.id === this.customerId
			}.bind(this)
		);
	};
	neighborhood() {
		return store.neighborhoods.find(
			function(n) {
				return n.id === this.neighborhoodId
			}.bind(this)
		);
	};
}
