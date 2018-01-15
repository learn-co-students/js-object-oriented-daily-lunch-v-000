let employerId = 0;
let mealId = 0;
let deliveryId = 0;
let customerId = 0;
store = {employers: [], customers: [], meals: [], deliveries: []}

class Customer {
	constructor(name, employer) {
		this.name = name;
		this.id = ++customerId;

		if (employer) {
			this.employerId = employer.id;
		}

		store.customers.push(this);
	}

	setEmployer(employer) {
		this.employerId = employer.id;
	}

	deliveries() {
		return store.deliveries.filter(function(delivery) {
			return delivery.customerId === this.id;
		}.bind(this))
	}

	meals() {
		return store.meals.filter(function(meal) {
			for (let i = 0; i < this.deliveries().length; i++) {
				if (meal.id === this.deliveries()[i].mealId) {
					return meal;
				}
			}
		}.bind(this))
	}

	totalSpent() {
		return this.meals().reduce(function(agg, el, i, arr) {
			return agg + el.price;
		}, 0)
	};

}

class Meal {
	constructor(title, price) {
		this.title = title;
		this.price = price;
		this.id = ++mealId;

		store.meals.push(this);
	}

	deliveries() {
		return store.deliveries.filter(function(delivery) {
			return delivery.mealId === this.id;
		}.bind(this))
	}

	customers() {
		return store.customers.filter(function(customer){
			for (let i = 0; i < this.deliveries().length; i++) {
				if (customer.id === this.deliveries()[i].customerId) {
					return customer;
				}
			}
		}.bind(this))
	}

	static byPrice() {
		return store.meals.sort(function(a,b) {
			return b.price - a.price;
		})
	}
}

class Delivery {
	constructor(meal, customer) {
		this.id = ++deliveryId;

		if (meal) {
			this.mealId = meal.id;
		}

		if (customer) {
			this.customerId = customer.id;
		}

		store.deliveries.push(this);
	}

	setMeal(meal) {
		this.mealId = meal.id;
	}

	setCustomer(customer) {
		this.customerId = customer.id;
	}

	meal() {
		return store.meals.find(function(meal) {
			return meal.id === this.mealId
		}.bind(this))
	}

	customer() {
		return store.customers.find(function(customer) {
			return customer.id === this.customerId;
		}.bind(this))
	}
}

class Employer {
	constructor(name) {
		this.id = ++employerId;
		this.name = name;

		store.employers.push(this);
	}

	employees() {
		return store.customers.filter(function(customer) {
			return customer.employerId === this.id;
		}.bind(this))
	}

	deliveries() {
		return store.deliveries.filter(function(delivery) {
			for (let i = 0; i < this.employees().length; i++) {
				if (delivery.customerId === this.employees()[i].id) {
					return delivery;
				}
			}
		}.bind(this))
	}

	meals() {
		return store.meals.filter(function(meal) {
			for (let i = 0; i < this.deliveries().length; i++) {
				if (meal.id === this.deliveries()[i].mealId) {
					return meal;
				}
			}
		}.bind(this))
	}

	mealTotals() {
		let mealTotals = {}

		for(const delivery of this.deliveries()) {
			mealTotals[delivery.mealId] = 0;
		}

		for(const delivery of this.deliveries()) {
			const reduceMeal = function(agg, el, i, arr) {
  				return mealTotals[delivery.mealId] + 1;
			};
			mealTotals[delivery.mealId] = this.deliveries().reduce(reduceMeal);
		}
		return mealTotals;
	}
}
