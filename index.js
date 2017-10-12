let mealId = 0; 
let employerId = 0;
let deliveryId = 0;
let customerId = 0;
let driverId = 0;
let passengerId = 0;
let tripId = 0;
let store = {deliveries: [], meals: [], employers:[], customers:[], drivers:[], passengers: [], trips: []};

class Customer {
	constructor(name, employer) {
		if (employer) {this.employerId = employer.id;}
		this.name = name;
		this.id = ++customerId;

		store.customers.push(this);
	}

	meals(){
		return this.deliveries().map((delivery) => delivery.meal());
	}

	deliveries(){
		return store.deliveries.filter((delivery) => this.id === delivery.customerId);
	}

	totalSpent(){
		return this.meals().reduce((sum, meal) => sum += meal.price,0);
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
		return store.deliveries.filter((delivery) => delivery.meal() === this);
	}
	customers() {
		return this.deliveries().map((delivery) => delivery.customer());;
	}

	static byPrice() {
		return store.meals.sort((a,b) => b.price - a.price);
	}
}


class Delivery {
	constructor(meal, customer) {
		if (meal) {this.mealId = meal.id;}
		if (customer) {this.customerId = customer.id;}
		this.id = ++deliveryId;

		store.deliveries.push(this);
	}

	customer() {
		return store.customers.find((customer) => customer.id === this.customerId);
	}

	meal() {
		return store.meals.find((meal) => meal.id === this.mealId);
	}
}


class Employer {
	constructor(name) {
		this.name = name;
		this.id = ++employerId;

		store.employers.push(this);
	}

	employees(){
		return store.customers.filter((employee) => employee.employerId === this.id);
	}

	deliveries(){
		return store.deliveries.filter((delivery) => delivery.customer().employerId === this.id);
	}

	meals(){
		return [ ... new Set(this.deliveries().map((delivery) => delivery.meal()))];
	}

	mealTotals() {
		return this.deliveries().reduce((col, delivery) => {
			if (col[delivery.meal().id]){
				col[delivery.meal().id] += 1;
			} else {
				col[delivery.meal().id] = 1; 
			}
			return col;
		},{});

	}
}

class Driver {
	constructor(name) {
		this.name = name;
		this.id = ++driverId;
		store.drivers.push(this);
	}

	trips () {
		return store.trips.filter((trip) => trip.driverId === this.id);
	}

	passengers (){
		return this.trips().map((trip) => trip.passenger());
	}
}

class Passenger {
	constructor(name) {
		this.name = name;
		this.id = ++passengerId;
		store.passengers.push(this);
	}

	trips () {
		return store.trips.filter((trip) => trip.passengerId === this.id);
	}

	drivers (){
		return this.trips().map((trip) => trip.driver());
	}
}


class Trip {
	constructor(driver, passenger) {
		this.driverId = driver.id;
		this.passengerId = passenger.id;
		this.id = ++tripId;
		store.trips.push(this);
	}

	passenger () {
		return store.passengers.find((passenger) => passenger.id === this.passengerId);
	}

	driver () {
		return store.drivers.find((driver) => driver.id === this.driverId);
	}
}