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

	meals () {
		const del = this.deliveries();
		let rtn = [];

		for (const d of del) {
			const m = store.meals.find(function (meal) {return meal.id === this.mealId; }.bind(d));			
			rtn.push(m);
		}

		rtn = rtn.filter(function (item, pos, arr) { return arr.indexOf(item) === pos; });

		return rtn;
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
	
	static byPrice () {
		const newArr = store.meals.slice();
		newArr.sort(function (a, b) { return b.price - a.price; })
		return newArr;
	}

	deliveries() {
		return store.deliveries.filter ( function (del) { return del.mealId === this.id; }.bind(this));
	}
	
	customers () {
		const del = this.deliveries();
		const cArr = store.customers.filter(function (customer) { return del.some(function (d) { return customer.id === d.customerId; }); });
		return cArr;
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

	deliveries() {
		return store.deliveries.filter ( function (del) { return del.customerId === this.id; }.bind(this));
	}


	meals() {
		const del = this.deliveries();
		const mArr = [];

		for (let d of del) {
			const mFn = (function (meal) { return meal.id === this.mealId; }.bind(d));
			const m = store.meals.find(mFn);			
			mArr.push(m);
		}
		return mArr;
	}

	totalSpent () {
		const mls = this.meals();
		let spend = 0;

		for (const m of mls) {
			spend += m.price 
		}
		
		return spend;	
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
