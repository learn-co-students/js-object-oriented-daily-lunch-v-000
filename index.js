// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodID = 0
let customerID = 0
let mealID = 0
let deliveryID = 0

class Neighborhood {
	constructor(name) {
		this.id = ++neighborhoodID;
		this.name = name
		store.neighborhoods.push(this);
	}
	deliveries() {
		return store.deliveries.filter(delivery =>
			delivery.neighborhoodId === this.id);
	}
	
	customers() {
		return store.customers.filter(customer =>
			customer.neighborhoodId === this.id);
	}
	meals() {
		const distinctMeals = [...new Set(this.deliveries().map(delivery => delivery.meal()))]
		return distinctMeals;
	}
}

class Customer {
	constructor(name, neighborhoodId) {
		this.id = ++customerID;
		this.name = name;
		this.neighborhoodId = neighborhoodId;
		store.customers.push(this);
	}
	deliveries() {
		return store.deliveries.filter(delivery =>
			delivery.customerId === this.id);
	}
	meals() {
		return this.deliveries().map(delivery =>
			delivery.meal());
	}
	totalSpent(){
		return this.meals().reduce((total,meal) =>
			(total + meal.price), 0)
	}
}

class Meal {
	constructor(title, price) {
		this.id = ++mealID;
		this.title = title;
		this.price = price;
		store.meals.push(this);
	}
	deliveries() {
		return store.deliveries.filter(delivery =>
			delivery.mealId === this.id);
	}
	customers() {
		return this.deliveries().map(delivery =>
			delivery.customer());
	}
	static byPrice() {
		return store.meals.sort((a, b) =>
			b.price - a.price);
	}
}

class Delivery {
	constructor(mealId, neighborhoodId, customerId) {
		this.id = ++deliveryID;
		this.mealId = mealId;
		this.neighborhoodId = neighborhoodId;
		this.customerId = customerId;
		store.deliveries.push(this);
	}
	meal() {
		return store.meals.find(meal =>
			meal.id === this.mealId);
	}
	customer() {
		return store.customers.find(customer =>
			customer.id === this.customerId);
	}
	neighborhood() {
		return store.neighborhoods.find(neighborhood =>
			neighborhood.id === this.neighborhoodId);
	}
}