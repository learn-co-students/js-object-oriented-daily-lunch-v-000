// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

// iterators
let neighborhoodCounter = 0;
let customerCounter = 0;
let mealCounter = 0;
let deliveryCounter = 0;


class Neighborhood {
	constructor(name){
		this.name = name;
		this.id = ++neighborhoodCounter;

		// adds to the store
		store.neighborhoods.push(this);
	}

	deliveries(){
		return store.deliveries.filter(function(delivery){
			return delivery.neighborhoodId === this.id;
		}.bind(this))
	}

	customers(){
		return store.customers.filter(function(customer){
			return customer.neighborhoodId === this.id
		}.bind(this))
	}

	meals(){
		let arr = [];
		 this.deliveries().forEach(function(delivery){
		 	store.meals.forEach(function(meal){
		 		if (meal.id === delivery.mealId){
		 			if (!arr.includes(meal)){
		 				arr.push(meal);
		 			}
		 		}
		 	})
		 }.bind(this));
		 return arr;

	}

}

class Customer {
	constructor(name, neighborhoodId){
		this.name = name;
		this.neighborhoodId = neighborhoodId;
		this.id = ++customerCounter;

		// adds to the store
		store.customers.push(this);
	}

	deliveries(){
		return store.deliveries.filter(function(delivery){
			return delivery.customerId === this.id;
		}.bind(this))
	}

	meals(){
		let allMeals = []
		store.deliveries.forEach(function(delivery){
			 if (delivery.customerId === this.id){
			 	store.meals.forEach(function(m){
			 		if (m.id === delivery.mealId) {
			 			allMeals.push(m);
			 		};
			 	});
			 }
		}.bind(this))
		
		return allMeals;
	}

	totalSpent(){
		let total = 0;
		this.meals().forEach(function(meal){
			total += meal.price;
		});

		return total;
	}


}

class Meal {
	constructor(title, price){
		this.title = title;
		this.price = price;
		this.id = ++mealCounter;

		// adds to the store
		store.meals.push(this);
	}

	deliveries(){
		return store.deliveries.filter(function(delivery){
			return delivery.mealId === this.id;
		}.bind(this))
	}

	customers(){
		let arr = [];
		store.deliveries.forEach(function(delivery){
			if (delivery.mealId === this.id){
				store.customers.forEach(function(customer){
					if (!arr.includes(customer)){
						arr.push(customer);
					}
				});
			}
		}.bind(this));
		return arr;
	}

	static byPrice(){
		return store.meals.sort(function(a,b){
			return b.price - a.price;
		});
	}
}

class Delivery {
	constructor(mealId, neighborhoodId, customerId){
		this.mealId = mealId;
		this.neighborhoodId = neighborhoodId;
		this.customerId = customerId;
		this.id = ++deliveryCounter;

		// adds to the store
		store.deliveries.push(this);
	}

	meal(){
		return store.meals.find(function(meal){
			return meal.id === this.mealId;
		}.bind(this));
	}

	customer(){
		return store.customers.find(function(customer){
			return customer.id === this.customerId;
		}.bind(this));
	}

	neighborhood(){
		return store.neighborhoods.find(function(neighborhood){
			return neighborhood.id === this.neighborhoodId;
		}.bind(this));
	}

}







