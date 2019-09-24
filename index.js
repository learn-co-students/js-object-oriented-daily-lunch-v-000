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
		return store.deliveries.filter(
			function (delivery) {
				return delivery.neighborhoodId === this.id;
			}.bind(this)
		);
	}

    customers() {
      return store.customers.filter(customer => customer.neighborhoodId === this.id);
    }

    meals() {
    	const allMeals = this.customers().map(customer => customer.meals());
	    const merged = [].concat.apply([], allMeals);
	    
	    return [...new Set(merged)];
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
		return store.deliveries.filter(
			function (delivery) {
				return delivery.mealId === this.id;
			}.bind(this)
		);
	}

	customers() {
		return this.deliveries().map(delivery => {
			return delivery.customer();
		});
	}

	static byPrice() {
		return store.meals.sort(function(a, b){
			return b.price - a.price;
		});
	}
}

class Customer {
	constructor(name, neighborhoodId) {
		this.id = ++customerId;
		this.name = name;
		this.neighborhoodId = neighborhoodId;

		store.customers.push(this);
	}

	deliveries() {
		return store.deliveries.filter(
			function (delivery) {
				return delivery.customerId === this.id;
			}.bind(this)
		);
	}

	meals() {
		return this.deliveries().map(delivery => {
			return delivery.meal();
		});
	}

	totalSpent() {
		let initialValue = 0;

		const sum = this.meals().reduce(function(accumulator, currentValue) {
			return accumulator + currentValue.price;
		}, initialValue)

		return sum;
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

	neighborhood() {
		return store.neighborhoods.find(
			function(neighborhood) {
				return neighborhood.id === this.neighborhoodId;
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

	meal() {
		return store.meals.find(
			function(meal) {
				return meal.id === this.mealId;
			}.bind(this)
		);
	}

}