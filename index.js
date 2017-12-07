let store = {deliveries: [], customers: [], meals: [], employers: []}


let customerId = 0;
class Customer {
	constructor(name, employer) {
		this.id = ++customerId;
		this.name = name;
		this.employer = employer;

		store.customers.push(this);

	}

	deliveries() {
		return store.deliveries.filter(delivery => {
			return delivery.customerId === this.id;
		})	
	}

	totalSpent() {
		return this.deliveries().map(delivery => {
			return delivery.meal().price;
		}).reduce((a,b) => a + b, 0);
	}

	meals() {
		return this.deliveries().map(delivery => {
			return delivery.meal();
		})
	}
}

let deliveryId = 0;
class Delivery {
	constructor(meal = {}, customer = {}){
		this.id = ++deliveryId;
		this.mealId = meal.id;
		this.customerId = customer.id;

		store.deliveries.push(this);
	}

	customer() {
		return store.customers.find(customer => {
			return this.customerId === customer.id;
		})
	}

	meal() {
		return store.meals.find(meal => {
			return this.mealId === meal.id;
		})
	}

}

let employerId = 0;
class Employer {
	constructor(name) {
		this.id = ++employerId;
		this.name = name;

		store.employers.push(this);
	}

	employees() {
		return store.customers.filter(customer => {
			return customer.employer === this;
		})
	}

	deliveries() {
		let arr = this.employees().map(customer => {
			return customer.deliveries();
		})
		return [].concat.apply([],arr);
	}

	meals() {
		let mealUnique = [];
		let meals = this.deliveries().map(delivery => {
			return delivery.meal();
		})

		for(let meal of meals) {
			if (mealUnique.indexOf(meal) === -1){
				mealUnique.push(meal);
			}
		}
		return mealUnique;
	}

	mealTotals() {
		let mealSummary = {};
		let meals = this.deliveries().map(delivery => {
			return delivery.meal();
		})
		meals.forEach(function(meal){
			mealSummary[meal.id] = 0;
		})
		meals.forEach(function(meal){
			mealSummary[meal.id] += 1;
		})
		return mealSummary;
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
		return store.meals.sort((mealA, mealB) => {
			return mealB.price - mealA.price;
		})
	}

	deliveries() {
		return store.deliveries.filter(delivery => {
			return delivery.mealId === this.id;
		})
	}

	customers() {
		return this.deliveries().map(delivery => {
			return delivery.customer();
		})
	}
}