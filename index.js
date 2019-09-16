// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
class Neighborhood{
	constructor(name){
		this.name = name
		this.id = ++neighborhoodId
		store.neighborhoods.push(this)
	}

	deliveries(){
		return store.deliveries.filter(function(delivery){
			return delivery.neighborhoodId == this.id
		}.bind(this))
	}

	customers(){
		return store.customers.filter(function(customer){
			return customer.neighborhoodId == this.id
		}.bind(this))
	}

	meals(){
		let allMeals = []
		this.deliveries().forEach(function(delivery){
			let meal = delivery.meal()
			if(!allMeals.includes(meal)){
				allMeals.push(meal)
			}
		})
		return allMeals
	}

}

let customerId = 0
class Customer{
	constructor(name, neighborhoodId){
		this.name = name
		this.neighborhoodId = neighborhoodId
		this.id = ++customerId
		store.customers.push(this)
	}

	deliveries(){
		return store.deliveries.filter(function(delivery){
			return delivery.customerId === this.id
		}.bind(this))
	}

	meals(){
		let allMeals = []
		this.deliveries().forEach(function(delivery){
			allMeals.push(delivery.meal())
		})
		return allMeals
	}

	totalSpent(){
		let total = 0
		this.meals().forEach(function(meal){
			total += meal.price
		})
		return total
	}
}

let mealId = 0
class Meal{
	constructor(title, price){
		this.title = title
		this.price = price
		this.id = ++mealId
		store.meals.push(this)
	}

	deliveries(){
		return store.deliveries.filter(function(delivery){
			return delivery.mealId == this.id
		}.bind(this))
	}

	customers(){
		let allCustomers = []
		this.deliveries().forEach(function(delivery){
			allCustomers.push(delivery.customer())
		})
		return allCustomers
	}
}

Meal.byPrice = function(){
	return store.meals.sort(function(a, b){
		return b.price - a.price
	})
}

let deliveryId = 0
class Delivery{
	constructor(mealId, neighborhoodId, customerId){
		this.mealId = mealId
		this.neighborhoodId = neighborhoodId
		this.customerId = customerId
		this.id = ++deliveryId
		store.deliveries.push(this)
	}

	meal(){
		return store.meals.find(function(meal){
			return meal.id == this.mealId
		}.bind(this))
	}

	customer(){
		return store.customers.find(function(customer){
			return customer.id == this.customerId
		}.bind(this))
	}

	neighborhood(){
		return store.neighborhoods.find(function(neighborhood){
			return neighborhood.id == this.neighborhoodId
		}.bind(this))
	}
}



