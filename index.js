// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;

class Neighborhood {
	constructor (name) {
		this.name = name;

		this.id = ++neighborhoodId;
		store.neighborhoods.push(this);
		this.custId;
	}

	deliveries () {
		return store.deliveries.filter(function (delivery) {
				return delivery.neighborhoodId === this.id;
			}.bind(this)
		);
	}

	customers () {
		const del = this.deliveries();
		const cArr = store.customers.filter(function (customer) { return del.some(function (d) { return customer.id === d.customerId; }); });
		return cArr;
	}
}

let mealId = 0;

class Meal {
	constructor (title, price) {
		this.title = title;
		this.price = price;

		this.id = ++mealId;
		store.meals.push(this);
	}
}

let customerId = 0;

class Customer {
	constructor (name, neighborhoodId) {
		this.name = name;
		this.neighborhoodId = neighborhoodId;

		this.id = ++customerId;
		store.customers.push(this);
	}

	getId() { return this.id; }

	deliveries() {
		return store.deliveries.filter ( function (del) { return del.customerId === this.id; }.bind(this));
	}


	meals() {
		const del = this.deliveries();
		const mealSet = [];

		for (let d in del) {
			let dMealFn = d.dMealFn;

			let m = store.meals.find( dMealFn ); 				
			mealSet.push(m);
		}

		return mealSet;
	}
}

let deliveryId = 0;

class Delivery {
	constructor (mealId, neighborhoodId, customerId) {
		this.mealId = mealId;
		this.neighborhoodId = neighborhoodId;
		this.customerId = customerId;
		
		this.id = ++deliveryId;
		store.deliveries.push(this);
	}

	dMealFn () {
		return function (elem) { return elem.id === this.mealId; }.bind(this);
	}

//	const linkFunction = function (array, lookupId) {array.find( function (item) { return item.id === lookupId; }.bind(this)});
//	linkFunction (array, lookupId) {
//		return array.find(function (elem) { rerturn elem.id === this.id; }.bind({id: lookupId}) );
//	}

	meal () { 
		const meet = store.meals.find( function (meal) { return meal.id === this.mealId; }.bind(this) );
		return meet;
	}

	customer () { 
		const cust = store.customers.find( function (cust) { return cust.id === this.customerId; }.bind(this) );
		return cust;
	}
	
	neighborhood () { 
		const nei = store.neighborhoods.find( function (nei) { return nei.id === this.neighborhoodId; }.bind(this) );
		return nei;
	}
}
