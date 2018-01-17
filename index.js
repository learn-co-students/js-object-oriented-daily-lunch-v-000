store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0

class Customer {
	constructor (name, employer={}) {
		this.id = ++customerId
		this.name = name
		this.employerId = employer.id

		store.customers.push(this);
	}

	deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId == this.id;
    });
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    });
  }


  totalSpent() {
   	let mealTotals = this.meals().map(meal => {
    	return meal.price;
			});
   	return mealTotals.reduce((acc, current) => {
   		return acc +  current
   	})
		}

	}

class Meal {
	constructor (title, price) {
		this.id = ++mealId
		this.title = title
		this.price = price

		store.meals.push(this);
	}
	 deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId == this.id;
    });
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    });
  }

	static byPrice() {
    return store.meals.sort((mealOne, mealTwo) => {
    	return mealOne.price < mealTwo.price;
    })
  }
}


class Delivery {
	constructor (meal={}, customer={}) {
		this.id = ++deliveryId
		this.mealId = meal.id
		this.customerId = customer.id

		store.deliveries.push(this);
	}

	meal() {
    return store.meals.find(meal=> {
      return meal.id === this.mealId;
    })
	}

	customer() {
    return store.customers.find(customer=> {
      return customer.id === this.customerId;
    })
	}
}

class Employer {
	constructor (name) {
		this.id = ++employerId
		this.name = name

		store.employers.push(this);
	}

	employees() {
    return store.customers.filter(customer => {
      return customer.employerId == this.id;
    });
  }

 deliveries() {
    let allDeliveries = this.employees().map(employee => {
      return employee.deliveries();
    });
    let results = Array.prototype.concat.apply([], allDeliveries);
    return results;
  }

  meals() {
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    return allMeals.reduce((x, y) => x.includes(y) ? x : [...x, y], [])  
   }

   mealTotals() {
   	let allMeals = this.deliveries().map(delivery =>{
   		return delivery.meal();
   	});
   	let mealsTotalObj = {};
   	allMeals.forEach(function(meal) {
   		mealsTotalObj[meal.id] = 0;
   	});
   	allMeals.forEach(function(meal){
   		mealsTotalObj[meal.id] += 1;
   	})
   	return mealsTotalObj;
   }
}
