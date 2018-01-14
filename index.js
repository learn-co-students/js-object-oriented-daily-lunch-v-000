const store = {deliveries: [], meals: [], employers: [], customers: []};

let deliveryId = 0,
		mealId     = 0,
		employerId = 0,
		customerId = 0;

//DELIVERY CLASS
class Delivery {
	constructor(meal, customer) {
		this.mealId = meal ? meal.id : undefined;
		this.customerId = customer ? customer.id  : undefined;

		this.id = ++deliveryId;

		store.deliveries.push(this);
	}

	customer() {
		return store.customers.filter(function(customer) {return customer.id === this.customerId}.bind(this))[0]
	}

	meal() {
		return store.meals.filter(function(meal) {return meal.id === this.mealId}.bind(this))[0]
	}
}

//MEAL CLASS
class Meal {
	constructor(title, price) {
		this.title = title;
		this.price = price;

		this.id = ++mealId;

		store.meals.push(this);
	}

	deliveries() {
		return store.deliveries.filter(function(delivery) {return delivery.mealId === this.id}.bind(this));
	}

	customers() {
		return this.deliveries().map(delivery => delivery.customer());
	}
}
Meal.byPrice = function() {
	return store.meals.sort(function(a, b) {return b.price - a.price});
}

//EMPLOYER CLASS
class Employer {
	constructor(name) {
		this.name = name;

		this.id = ++employerId;

		store.employers.push(this);
	}

	employees() {
		return store.customers.filter(function(customer) {return customer.employerId === this.id}.bind(this));
	}

	deliveries() {
		return this.employees().reduce(function(deliveriesArray, employee){
			return deliveriesArray.concat(employee.deliveries());
		}, []);
	}

	meals() {
		return this.deliveries().reduce(function(mealsArray, delivery){
			let meal = delivery.meal();
			if (mealsArray.filter(function(m){return m.id === meal.id}).length === 0) {
				mealsArray.push(meal)
			}
			return mealsArray
		}, []);
	}

	mealTotals() {
		const mealsObject = {};
		this.deliveries().forEach(function(delivery){
			if (!mealsObject[delivery.mealId]) {
				mealsObject[delivery.mealId] = 1;
			} else {
				mealsObject[delivery.mealId] += 1
			}
		});
		return mealsObject
	}
}

//CUSTOMER CLASS
class Customer {
	constructor(name, employer) {
		this.name = name;
		this.employerId = employer ? employer.id : undefined;

		this.id = ++customerId;

		store.customers.push(this);
	}

	totalSpent() {
		return store.deliveries.reduce(function(total, delivery) {
			if (delivery.customerId === this.id) {
				return total += delivery.meal().price
			} else {
				return total
			}
		}.bind(this), 0);
	}

	deliveries() {
		return store.deliveries.filter(function(delivery) {return delivery.customerId === this.id}.bind(this));
	}

	meals() {
		return this.deliveries().map(delivery => delivery.meal());
	}
}
