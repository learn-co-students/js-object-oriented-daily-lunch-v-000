// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood {
	constructor(name) {
		this.name = name;
		this.id = ++neighborhoodId;
		store.neighborhoods.push(this);
	}

	deliveries() {
		return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
	};

	customers() {
		return store.customers.filter(customer => customer.neighborhoodId === this.id);
	};

	meals() {
		let meals = this.deliveries().map(delivery => delivery.meal());
              return [...new Set(meals)];
	};


}

class Customer {
	constructor(name, neighborhoodId) {
		this.name = name;
		this.id = ++customerId;
		this.neighborhoodId = neighborhoodId;
		store.customers.push(this);
	}

	deliveries() {
		return store.deliveries.filter(delivery => delivery.customerId === this.id);
	};

	meals() {
		return this.deliveries().map(delivery => delivery.meal());
	};

	totalSpent() {
		let total = 0;
		let mealPrice = this.meals().map(meal => total = total + meal.price);
		return total;
	}
}

class Meal {
	constructor(title, price) {
		this.title = title;
		this.price = price;
		this.id = ++mealId;
		store.meals.push(this);
	}

	deliveries() {
		return store.deliveries.filter(delivery => delivery.mealId === this.id);
	};

	customers() {
	 let cust = this.deliveries().map(delivery => delivery.customer());
              return [...new Set(cust)];
	};

	
	static byPrice() {
		return store.meals.sort(function(a, b) {return b.price - a.price});
	}

}

class Delivery {
	constructor(mealId, neighborhoodId, customerId) {
		this.mealId = mealId;
		this.neighborhoodId = neighborhoodId;
		this.customerId = customerId;
		this.id = ++deliveryId;
		store.deliveries.push(this);
	}

	meal() {
		return store.meals.find(meal => meal.id === this.mealId);
	};

	customer() {
		return store.customers.find(customer => customer.id === this.customerId);
	};

	neighborhood() {
		return store.neighborhoods.find(neighborhood => neighborhoodId === this.neighborhoodId);
	};
}