let store = {customers: [], meals: [], deliveries: [], employers: []};
let customerId = 0;

class Customer {
	constructor(name, employer = {}) {
		this.id = ++customerId;
		this.name = name;
		this.employerId = employer.id;
		store.customers.push(this);
	}
	meals() {
		return this.deliveries().map(delivery => {
			return delivery.meal();
		});
	}
	deliveries() {
		return store.deliveries.filter(delivery => {
			if (delivery.customerId === this.id) {
				return delivery;
			}
		});
	}
	totalSpent() {
		return this.meals().reduce((accum, meal) => {
			return accum + meal.price;
		}, 0);
	}
}

let mealId = 0;

class Meal {
	constructor(title, price) {
		this.id = ++mealId;
		this.title = title;
		this.price = price;
		store.meals.push(this);
	}
	static byPrice() {
		return store.meals.sort(function(a, b) {
			return b.price - a.price;
		});
	}
	deliveries() {
		return store.deliveries.filter(delivery => {
			if (delivery.mealId === this.id) {
				return delivery;
			}
		});
	}
	customers() {
		return this.deliveries().map(delivery => {
	//		if (delivery.mealId === this.id) {
	//			return delivery.customer();
			return delivery.customer();
		});		
	}
}

let deliveryId = 0;

class Delivery {
	constructor(meal = {}, customer = {}) {
		this.id = ++deliveryId;

		this.mealId = meal.id;
		this.customerId = customer.id;
		store.deliveries.push(this);
	}
	customer() {
		return store.customers.find(customer => {
			return customer.id === this.customerId;
		});
	}
	meal() {
		return store.meals.find(meal => {
			return meal.id === this.mealId;
		});
	}
}
let empId = 0;

class Employer {
	constructor(name) {
		this.id = ++empId;
		this.name = name;
		store.employers.push(this);
	}
	employees() {
		return store.customers.filter(customer => {
			return customer.employerId === this.id
		})
	}
	deliveries() {
		let arrays = this.employees().map(function(employee) {
			return employee.deliveries();
		});
		return [].concat.apply([], arrays);
	}
	meals() {
		return this.deliveries().map(function(delivery) {
			return delivery.meal();
		}).filter(function(value, index, self) {
			return self.indexOf(value) === index;
		});
	}
	mealTotals() {
		let allMeals = this.deliveries().map(delivery => {
			return delivery.meal();
		});
		let obj = {};
		allMeals.forEach(meal => {
			obj[meal.id] = 0;		
		});
		allMeals.forEach(meal => {
			obj[meal.id] += 1;
		});
		return obj;
	}
}





