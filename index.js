let store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

class Customer {
	constructor(name, employer) {
		this.id = ++customerId
		this.name = name
		if (employer) {
			this.employerId = employer.id
		}
		
		store.customers.push(this)
	}
	meals() {
    return store.meals.filter(meal => {
      return meal.deliveries().filter(delivery => { return delivery.customerId === this.id } )
   	 })
  	}
	deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
   	 })
  	}
	totalSpent() {
		let total = 0;
		this.deliveries().forEach(function(delivery) {
			total += delivery.meal().price;
		});
		return total;
	}
}

class Meal {
	constructor(title, price) {
		this.id = ++mealId
		this.title = title
		this.price = price

		store.meals.push(this)
	}
	static byPrice() {
		return store.meals.sort(function(a, b) { 
    		return b.price - a.price;
		})		
	}
	deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
   	 })
   	}
	customers() {
    return store.customers.filter(customer => {
      return customer.meals().filter(meal => { return meal.id === this.id })
   	 })
   	}
   	customersForEmployer(employer) {
   		return this.customers().filter(customer => { return customer.employerId === employer.id});
   	}
}

class Delivery {
	constructor(meal, customer) {
		this.id = ++deliveryId
		if (meal) {
			this.mealId = meal.id
		}
		if (customer) {
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

class Employer {
	constructor(name) {
		this.id = ++employerId
		this.name = name

		store.employers.push(this)
	}
	employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id
   	 })
  	}
  	deliveries() {
     return store.deliveries.filter(delivery => {
      return delivery.customer().employerId === this.id
   	 })
  	}
  	allMeals() {
  		return store.meals.filter(meal => {
  			return meal.deliveries().filter(delivery => { delivery.customer().employerId === this.id })
  		});
  	}
  	meals() {
  		return this.removeDuplicates(this.allMeals());
  	}

	removeDuplicates(myArr, prop) {
	    return myArr.filter((obj, pos, arr) => {
	        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
	    });
	}
	mealTotals() {
		let thisEmployer = this;
		let newObj = {};
		this.allMeals().forEach(function(meal) {
			newObj[meal.id] = thisEmployer.deliveries().filter(delivery => {return delivery.mealId === meal.id}).length;
		})
		return newObj;
	}

}