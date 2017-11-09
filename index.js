let store = {
	customers: [],
	meals: [],
	deliveries: [],
	employers: []
}
let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0

class Customer {
	constructor(name,employer) {
		this.id = ++customerId
		this.name = name
		if(employer) {
			this.employerId = employer.id
		}

		store.customers.push(this)
	}
	deliveries() {
		return store.deliveries.filter(function(delivery) {
			return delivery.customerId === this.id
		}.bind(this))
	}
	meals() {
		return this.deliveries().map(function(delivery) {
			return delivery.meal()
		})
	}
	totalSpent() {
		let mealPrice = this.meals().map(function(meal) {
			return meal.price
		})
		return mealPrice.reduce(function(a,b) {
			return a + b
		})
	}
}


class Employer {
	constructor(name) {
		this.id = ++employerId
		this.name = name

		store.employers.push(this)
	}
	employees() {
		return store.customers.filter(function(customer) {
			return customer.employerId === this.id
		}.bind(this))
	}
	deliveries() {
		let allDeliveries = this.employees().map(function(employee) {
			return employee.deliveries()
		})
		let merged = [].concat.apply([], allDeliveries)
		return merged
	}
	meals() {
		let allMeals = this.deliveries().map(function(delivery) {
			return delivery.meal()
		})
		let uniqueMeals = [...new Set(allMeals)]
		return uniqueMeals
	}
	mealTotals() {
		let allMeals = this.deliveries().map(function(delivery) {
			return delivery.meal()
		})
		let totalsObject = {}
		allMeals.forEach(function(meal) {
			totalsObject[meal.id] = 0
		})
		allMeals.forEach(function(meal) {
			totalsObject[meal.id] += 1
		})
		return totalsObject
	}
}


class Meal {
	constructor(title,price) {
		this.id = ++mealId
		this.title = title
		this.price = price

		store.meals.push(this)
	}
	deliveries() {
		return store.deliveries.filter(function(delivery) {
			return delivery.mealId === this.id
		}.bind(this))
	}
	customers() {
		return this.deliveries().map(function(delivery) {
			return delivery.customer()
		})
	}
	static byPrice() {
		return store.meals.sort(function(a,b) {
			return b.price - a.price
		})
	}
}


class Delivery {
	constructor(meal,customer) {
		this.id = ++deliveryId
		if(meal) {
			this.mealId = meal.id
		}
		if(customer) {
			this.customerId = customer.id
		}

		store.deliveries.push(this)
	}
	meal() {
		return store.meals.find(function(meal) {
			return meal.id === this.mealId
		}.bind(this))
	}
	customer() {
		return store.customers.find(function(customer) {
			return customer.id === this.customerId
		}.bind(this))
	}
}