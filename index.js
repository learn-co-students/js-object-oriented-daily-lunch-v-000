// global datastore
let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

Array.prototype.unique = function() {
  return this.filter(function (value, index, self) { 
    return self.indexOf(value) === index;
  });
}

class Neighborhood {
	constructor(name){
		this.id = ++neighborhoodId;
		this.name = name;

		store.neighborhoods.push(this);
	}

	deliveries() {
		return store.deliveries.filter (
			function(delivery) {return delivery.neighborhoodId === this.id;}.bind(this)
		);
	}

	customers() {
		return store.customers.filter (
			function(customer) {return customer.neighborhoodId === this.id;}.bind(this)
		);
	}

	meals() {
		let mealArray = this.deliveries().map(function(delivery) {
			return delivery.meal();
		});
		return mealArray.unique();
	}
}

class Meal {
	constructor(title, price) {
		this.id = ++mealId;
		this.title = title;
		this.price = price;

		store.meals.push(this);
	}

	deliveries() {
		return store.deliveries.filter (
			function(delivery) {return delivery.mealId === this.id;}.bind(this)
		);
	}

	customers() {
		return this.deliveries().map(function(delivery) {
			return delivery.customer();
		})
	}

	static byPrice () {
		return store.meals.sort(function(a,b) {
			return b.price - a.price
		});
	}

}


class Customer {
	constructor(name, neighborhoodId) {
		this.id = ++customerId;
		this.neighborhoodId = neighborhoodId;
		this.name = name;

		store.customers.push(this);
	}

	deliveries() {
		return store.deliveries.filter (
			function(delivery) {return delivery.customerId === this.id;}.bind(this)
		);
	}

	meals() {
		return this.deliveries().map(function(delivery) {
			return delivery.meal();
		})
	}

	totalSpent () {
		let totalPrice = 0;
		this.meals().forEach(function(a) {
			totalPrice = totalPrice + a.price;
		});
		return totalPrice;
	}
}


class Delivery {
	constructor(mealId, neighborhoodId, customerId) {
		this.id = ++deliveryId;
		this.mealId = mealId;
		this.neighborhoodId = neighborhoodId;
		this.customerId = customerId;

		store.deliveries.push(this);
	}

	meal() {
		return store.meals.find(
            function(meal) {return meal.id === this.mealId;}.bind(this)
        );
	}

	customer() {
		return store.customers.find(
            function(customer) {return customer.id === this.customerId;}.bind(this)
        );
	}

	neighborhood() {
		return store.neighborhoods.find(
            function(neighborhood) {return neighborhood.id === this.neighborhoodId;}.bind(this)
        );
	}
}
