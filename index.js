let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };


let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood {
	constructor(name) {
		this.id = ++neighborhoodId;
		this.name = name;
		store.neighborhoods.push(this);
	}

	deliveries() {
		return store.deliveries.filter(
			function(delivery) {
				return delivery.neighborhoodId === this.id;
			}.bind(this)
		)
	}

	customers () {
		return store.customers.filter(
			function(customer) {
				return customer.neighborhoodId == this.id;
			}.bind(this)
		)
	   }

	meals(){
		let allMeals = this.deliveries().map(
		  function(delivery){
			return delivery.meal()
		  }.bind(this)
		)
		return [...new Set(allMeals)]
	  }
}


class Customer {
	constructor(name, neighborhoodId) {
		this.name = name; 
		this.id = ++customerId;
		this.neighborhoodId = neighborhoodId;
		store.customers.push(this);
	}

	//customer has many deliveries 
	deliveries() {
		return store.deliveries.filter(
			function(delivery) {
				return delivery.customerId === this.id;
			}.bind(this)
		)
	}
	// customer has many meals, through deliveries
	meals() {
		return this.deliveries().map(function(delivery) {
			return delivery.meal()
		});
	}

	//totalSpent - the price is included in the meal object.  
	totalSpent() {
        return this.meals().reduce(function (acc, meal) {
            return acc + meal.price
        }, 0);
    }
	

}


class Meal {
	constructor(title, price) {
	  this.id = ++mealId; 
	  this.title = title;
	  this.price = price; 
     store.meals.push(this);
	}
	// delivery belongs to meal 
	deliveries() {
		return store.deliveries.filter(
			function(delivery) {
				return delivery.mealId === this.id;
			}.bind(this)
		)
	}

	//meal has many customers 
	customers() {
		return this.deliveries().map(function(delivery) {
			return delivery.customer()
		});
	}
	
}
Meal.byPrice = function () {
    return store.meals.sort(function (a, b) {
        return b.price - a.price
    })
}

class Delivery {
	constructor(mealId, neighborhoodId, customerId) {
	  this.id = ++deliveryId;
	  this.mealId = mealId;
	  this.neighborhoodId = neighborhoodId;
	  this.customerId = customerId;
	  store.deliveries.push(this)}
	
	  meal() {
		return store.meals.find(meal => {
		  return meal.id === this.mealId;
		});
	  }
	  customer() {
		  return store.customers.find(customer => {
			  return customer.id === this.customerId;
		  });
	  }
      neighborhood() {
		  return store.neighborhoods.find(neighborhood => {
			  return neighborhoodId === this.neighborhoodId;
		  });
	  }


	}