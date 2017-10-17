let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

let store = {customers: [], meals: [], employers: [], deliveries: []}

class Customer {
	constructor(name, employer) {
		this.id = ++customerId;
		if (employer) {this.employerId = employer.id;}
		this.name = name
		store.customers.push(this)
	}

	meals() {
		return this.deliveries().map(function(delivery) {
			return delivery.meal();
		})
	}

	deliveries() {
		return store.deliveries.filter((delivery) => {
			return delivery.customerId === this.id;})
	}

	totalSpent() {
		return this.meals().reduce(
			function(total, meal) {
				return total + meal.price
			}, 0)
	}
}

class Meal {
	constructor(title, price) {
		this.title = title;
		this.price = price;
		this.id = ++mealId;
		store.meals.push(this)
	}


	deliveries() {
		return store.deliveries.filter((delivery) => {
			return delivery.mealId === this.id;})
	}

	customers() {
		return this.deliveries().map(function(delivery) {
			return delivery.customer();
		})
	}

	static byPrice() {
		return store.meals.sort(function(meal1,meal2){
			return meal1.price < meal2.price
		})
	}
}

class Delivery {
	constructor(meal, customer) {
		if (meal) {this.mealId = meal.id;}
		if (customer) {this.customerId = customer.id;}
		this.id = ++deliveryId;
		store.deliveries.push(this)
	}

	meal() {
		return store.meals.find((meal) => {
			return meal.id === this.mealId} 
			)
	}

	customer() {
		return store.customers.find((customer) => {
			return customer.id === this.customerId} 
			)
	}
}

class Employer {
	constructor(name) {
		this.name = name
		this.id = ++employerId;
		store.employers.push(this)
	}

	employees() {
		return store.customers.filter((customer) => {
			return customer.employerId === this.id;})
	}

	deliveries() {
		let deliveries = this.employees().map((customer) => {
			return customer.deliveries()})
		return [].concat.apply([], deliveries);
	}

	meals() {
		let meals = this.deliveries().map((delivery) => {
			return delivery.meal()})
		return [...new Set(meals)]		
	}

	mealTotals(){
		let meals = this.deliveries().map(function(delivery) {
			return delivery.meal();
		})

		let mealsCount = {}

		meals.forEach(function(meal){
			if (mealsCount[meal.id]) {
				mealsCount[meal.id] ++
			} else {
				mealsCount[meal.id]= 1
			}
		})
		return mealsCount
	}
}

