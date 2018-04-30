// example 
// store = {
// 	customers: [
// 				{id: 1, name: "customer1", employer: {id: 1, name: "codex"} }, 
// 				{id: 2, name: "customer2", employer: {id: 1, name: "Kodac"} }, 
// 				{id: 3, name: "customer3", employer: {id: 1, name: "Linux"} }
// 				],
// 	meals: [
// 				{id: 1, title: "vegan lasagna", price: 13},
// 				{id: 2, title: "vegan salad", price: 7},
// 				{id: 3, title: "vegan polenta", price: 6},
// 			], 

// 	deliveries: [
// 				{id: 1, mealId: 1, customerId: 1},
// 				{id: 2, mealId: 2, customerId: 1},
// 				{id: 3, mealId: 1, customerId: 2},
// 				{id: 4, mealId: 2, customerId: 2},

// 			], 

// 	employers: [
// 				{id: 1, name: "codex"},
// 				{id: 2, name: "Kodac"},
// 				{id: 3, name: "Linux"}
// 			]
// 	}


let store = {customers: [], meals: [], deliveries: [], employers: []}
let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0

class Customer {



	constructor(name, employer = {}){
		this.id = ++customerId
		this.name = name
		this.employerId = employer.id

		store.customers.push(this)
	}

// meals() - returns all of the meals that a customer has had delivered
	meals(){
		
		return this.deliveries().map(delivery => delivery.meal())
		// mealIds.forEach(function(mealId, index, mealIds) {meals.push(store.meals.index)})
		// return meals
	}

	deliveries(){
		return store.deliveries.filter(delivery => delivery.customerId === this.id)
	}

	// totalSpent(){
	// 	return this.meals().reduce(function(total, meal) {return total + meal.price}, 0) 
	// }

	totalSpent() {
    return this.meals().reduce(function(sum, meal) {
      return sum + meal.price;
    }, 0);
  }

}





class Meal {

	constructor(title, price){
		this.id = ++mealId
		this.title = title
		this.price = price
		store.meals.push(this)
	}

	static byPrice(){
		return store.meals.sort(function(a, b){return b.price - a.price})
	}
// returns all of the deliveries that delivered the particular meal.
// look for this.id === mealId in all deliveries and filter them
	deliveries(){
		return store.deliveries.filter(delivery => delivery.mealId = this.id)
	}

	customers(){
		return this.deliveries().map(delivery => delivery.customer())
		// deliveriesOfMeal.map(function customer {return delivery => delivery.customer() })
	}


}




class Delivery {


	constructor(meal, customer) {
		this.id = ++deliveryId
		// this.meal = meal 
		if(meal){this.mealId = meal.id}
		// this.customer = customer
		if(customer){this.customerId = customer.id}
		store.deliveries.push(this)
	}

 	meal(){
 		let meal = store.meals.find(meal => meal.id === this.mealId)
 		return meal
 	}

	customer(){
		return store.customers.find(customer => customer.id === this.customerId)
	}



}



class Employer {

	constructor(name){
		this.id = ++employerId
		this.name = name
		store.employers.push(this)
	}

// list of customers employed by employer
	// employees(){
	// 	return store.customers.filter(customer => { return customer.employerId == this.id})
	// }

	employees() {
    return store.customers.filter(customer => {
      return customer.employerId == this.id;
    });
  }


	// deliveries(){
	// 	return this.employees().map(customer => { return customer.deliveries()})
	// }

	deliveries() {
    let allDeliveries = this.employees().map(employee => {
      return employee.deliveries();
    });
    let merged = [].concat.apply([], allDeliveries);
    return merged;
  }

	meals() {
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    let uniqueMeals = [...new Set(allMeals)];
    return uniqueMeals;
  }

// we want to return an object {indexOfMeal: numbOfMealsOrdered}    {1: 4, 2: 3}
	
	mealTotals() {
    let allMeals = this.deliveries().map(delivery => {return delivery.meal();});
    let summaryObject = {};
    allMeals.forEach(function(meal) {summaryObject[meal.id] = 0; });
    allMeals.forEach(function(meal) {summaryObject[meal.id] += 1;});
    return summaryObject;
  }
}
	
	




















