
let store = {
	deliveries: [], 
	meals: [], 
	customers: [], 
	employers: []
};

let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

class Employer {
	constructor(name) {
		this.name = name;
		this.id = ++employerId;
		store.employers.push(this);
	}

	employees() {
		return store.customers.filter(customer => {
			return customer.employerId === this.id;
		})
	}
	// - returns a list of customers employed by the employer
	deliveries() {
		  let allDeliveries = this.employees().map(employee => {
		      return employee.deliveries();
		});
		  let merged = [].concat.apply([], allDeliveries);
		    return merged;
		};
	// - returns a list of deliveries ordered by the employer's employees
	meals() {
		let allMeals = this.deliveries().map(delivery => {
	      return delivery.meal();
	    });

	    let uniqueMeals = [...new Set(allMeals)];
	    return uniqueMeals;
	}
	// - returns a list of meals ordered by the employer's employees. The method is to not return the same meal multiple times.
	mealTotals() {
		let allMeals = this.deliveries().map(delivery => {
	      return delivery.meal();
	    });
	    
	    let summaryObject = {};
	    
	    allMeals.forEach(function(meal) {
	    	summaryObject[meal.id] = 0;
	    });
	    
	    allMeals.forEach(function(meal) {
	    	summaryObject[meal.id] += 1;
	    });
   	
   	return summaryObject;
  	}
	// - returns a JavaScript object displaying each respective meal id ordered by the employer's employees. The keys of the 
	// JavaScript object are the meal ids and associated with each meal id is a value. For example, employerOne.mealTotals()
	// returning an object of {1: 4, 2: 3} would mean that the meal with id of 1 was ordered by employerOne's employees four
	// times, and the meal with id of 2 was ordered by employerOne's employees three times.
}

class Customer {
	constructor(name, employer) {
		if (name) {
			this.name = name;
		}

		if (employer) {
		this.employerId = employer.id;
		}

		this.id = ++customerId;
		store.customers.push(this);
	}

	deliveries() {
		return store.deliveries.filter(delivery => {
			return delivery.customerId === this.id;
		});
		// — returns all of the deliveries that customer has received
	}

	meals() {
		return this.deliveries().map(delivery => {
			// console.log(delivery.meal());
			return delivery.meal();
		})
	}
	// - returns all of the meals that a customer has had delivered
// 

	totalSpent() {
	//- returns the total amount that the customer has spent, as a function of the cost of the meals he has had delivered
		let total = 0;
		// console.log(this.meals());
		this.meals().forEach(meal => {
			// console.log(total);
			// console.log(meal);
			total += meal.price;
		});
		return total;
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
		return store.deliveries.filter(delivery => {
			return delivery.mealId === this.id;
		})
	}

	customers() {
		return this.deliveries().map(delivery => {
			return store.customers.find(customer => { 
				return delivery.customerId === customer.id 
			});
		});
	}

  // ???
  static byPrice() {
    return store.meals.sort((meal1, meal2) => {
      return meal1.price < meal2.price;
    });
  }

}

class Delivery {
	constructor(meal, customer) {
		// debugger;
		if (meal){
			this.mealId = meal.id;
		}
		if (customer) {
			this.customerId = customer.id;
		}
		this.id = ++deliveryId;
		store.deliveries.push(this);
	}

	customer() {
		return store.customers.find(customer => {
			return customer.id;
		});
	}

	meal() {
		let meal = store.meals.filter(meal => {
			// console.log(meal)
			return this.mealId === meal.id;
		});
		return meal[0];
	}
}
