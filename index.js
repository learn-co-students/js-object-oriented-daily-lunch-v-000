// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodIdIterator = 0;
let mealIdIterator = 0;
let customerIdIterator = 0;
let deliverIdIterator = 0;

class Neighborhood {
	constructor(name) {
		this.name = name;
		this.id = ++neighborhoodIdIterator;

		store.neighborhoods.push(this);
	}
	deliveries() {return store.deliveries.filter(element => element.neighborhoodId === this.id)}
	customers() {return store.customers.filter(element => element.neighborhoodId === this.id)}
	meals() {
		let uniqueDeliveries = store.deliveries.filter(element => element.neighborhoodId === this.id)
		let arr = [];
		uniqueDeliveries.forEach(function(element) {
			arr.push(store.meals.find(meal => meal.id === element.mealId))
		})
		
		let test = [...new Set(arr.map(item => item))]
		return test;
		// var unique = [...new Set(array.map(item => item.age))];
	}
}

class Customer {
	constructor(name, neighborhood) {
		this.name = name;
		this.neighborhoodId = neighborhood;
		this.id = ++customerIdIterator;

		store.customers.push(this);
	}
	deliveries() {return store.deliveries.filter(element => element.customerId === this.id)}
	meals() {
		let uniqueDeliveries =  store.deliveries.filter(element => element.customerId === this.id)
		let arr = [];
		uniqueDeliveries.forEach(function(element) {
			arr.push(store.meals.find(meal => meal.id === element.mealId))
		})
		return arr;
		
	}
	totalSpent() {
		let money = this.meals()
		let arr = [];
		let hold = 0;
	
		money.forEach(function(element) {
			hold += element.price;
		})
		return hold;
	}
}

class Meal {
	constructor(title, price) {
		this.title = title;
		this.price = price;
		this.id = ++mealIdIterator;

		store.meals.push(this);
	}
	static byPrice() {return store.meals.sort(function(a, b) {return b.price - a.price})}
	deliveries() {return store.deliveries.filter(element => element.mealId === this.id)}
	customers() {
		let uniqueDeliveries =  store.deliveries.filter(element => element.mealId === this.id)
		let arr = [];
		uniqueDeliveries.forEach(function(element) {
			arr.push(store.customers.find(customer => customer.id === element.customerId))
		})
		return arr;
	}

}

class Delivery {
	constructor(meal, neighborhood, customer) {
		this.mealId = meal;
		this.neighborhoodId = neighborhood;
		this.customerId = customer;
		this.id = ++mealIdIterator;

		store.deliveries.push(this);
	}

	meal() {return store.meals.find(element => element.id === this.mealId)};
	customer() {return store.customers.find(element => element.id === this.customerId)};
	neighborhood() {return store.neighborhoods.find(element => element.id === this.neighborhoodId)};

}

