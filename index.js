// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0

class Neighborhood {

	constructor(name) {
		this.name = name
		this.id = neighborhoodId++
		store.neighborhoods.push(this)
	}

	deliveries() {
		return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
	}

	customers() {
		return store.customers.filter(customer => customer.neighborhoodId === this.id)
	}

	meals() {
		const meals = this.deliveries().map(delivery => store.meals.find(meal => meal.id === delivery.mealId))
		let mealsUnique = [...new Set(meals)]
		return mealsUnique
	}
}

class Meal {

	constructor(title, price) {
		this.title = title
		this.price = price
		this.id = mealId++
		store.meals.push(this)
	}

	deliveries() {
		return store.deliveries.filter(delivery => delivery.mealId === this.id)
	}

	customers() {
		return this.deliveries().map(delivery => store.customers.find(customer => customer.id === delivery.customerId))
	};

	static byPrice() {
		return store.meals.slice().sort((a, b) => a.price < b.price)
	}

}

class Customer {

	constructor(name, neighborhoodId) {
		this.name = name
		this.neighborhoodId = neighborhoodId;
		this.id = customerId++;
		store.customers.push(this)
	}

	deliveries() {
		return store.deliveries.filter(delivery => delivery.customerId === this.id)
	}

	meals() {
		return this.deliveries().map(delivery => store.meals.find(meal => meal.id === delivery.mealId))
	}

	totalSpent() {
		let total = 0
		for (let meal of this.meals()) {
			total = meal.price + total
		}
		return total
	}
}

class Delivery {

	constructor(mealId, neighborhoodId, customerId) {
		this.mealId = mealId;
		this.customerId = customerId;
		this.neighborhoodId = neighborhoodId;
		this.id = deliveryId++;
		store.deliveries.push(this)
	}

	meal() {
		return store.meals.find(meal => meal.id === this.mealId)
	}

	customer() {
		return store.customers.find(customer => customer.id === this.customerId)
	}

	neighborhood() {
		return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
	}
}