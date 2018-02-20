let store = {customers: [], meals: [], deliveries: [], employers: []}

let customers = 0
class Customer{
	constructor(name, employer){
		this.id = ++customers
		this.name = name
		this.employer = employer
		store.customers.push(this)
	}

	meals(){
		let myMeals = []
		this.deliveries().forEach(delivery => {
			myMeals.push(delivery.meal())
		})
		return myMeals
	}

	deliveries(){
		return store.deliveries.filter(delivery => {
			return delivery.customerId === this.id
		})
	}

	totalSpent(){
		return this.meals().reduce(function(agg, meal) {
			return agg + meal.price
		}, 0)
	}
}

let meals = 0
class Meal{
	constructor(title, price){
		this.id = ++meals
		this.title = title
		this.price = price
		store.meals.push(this)
	}

	deliveries(){
		return store.deliveries.filter(delivery => {
			return delivery.mealId === this.id
		})
	}

	customers(){
		let myCustomers = []
		this.deliveries().forEach(delivery => {
			myCustomers.push(delivery.customer())
		})
		return myCustomers
	}

	static byPrice(){
		return [...store.meals].sort(function(a, b){
			return b.price - a.price
		})
	}
}

let deliveries = 0
class Delivery{
	constructor(meal, customer){
		this.id = ++deliveries
		this.mealId = meal ? meal.id : {}
		this.customerId = customer ? customer.id : {}
		store.deliveries.push(this)
	}

	meal(){
		return store.meals.find(meal => {
			return meal.id === this.mealId
		})
	}

	customer(){
		return store.customers.find(customer => {
			return customer.id === this.customerId
		})
	}
}

let employers = 0
class Employer{
	constructor(name){
		this.id = ++employers
		this.name = name
		store.employers.push(this)
	}

	employees(){
		return store.customers.filter(customer => {
			return customer.employer === this
		})
	}

	deliveries(){
		let myDeliveries = []
		this.employees().forEach(employee => {
			employee.deliveries().forEach(delivery => {
				myDeliveries.push(delivery)
			})
		})
		return myDeliveries
	}

	meals(){
		let myMeals = []
		this.deliveries().forEach(delivery => {
			if (!myMeals.includes(delivery.meal())) {
				myMeals.push(delivery.meal())
			}
		})
		return myMeals
	}

	mealTotals(){
		return this.deliveries().reduce(function(agg, delivery) {
			const mealId = delivery.meal().id
			if (Object.keys(agg).indexOf(`${mealId}`) > -1) {
				agg[mealId] += 1
				return agg
			} else {
				agg[mealId] = 1
				return agg
			}
		}, {})
	}
}