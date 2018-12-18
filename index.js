// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let mealId = 0
let deliveryId = 0
let neighborhoodId = 0
let customerId = 0

// class Neighborhood {
// 	constructor(name) {
// 		let this.name = name;
// 		let this.id = ++neighborhoodId;
// 	}
// }

// class Meal {
// 	constructor(name, price) {
// 		let this.name = name;
// 		let this.price = price;
// 		let this.mealId = ++mealId;
// 	}

// 	deliveries () {

// 	}

// 	customers () {

// 	}

// 	byPrice () {

// 	}
// }

class Delivery {
	constructor(mealId, neighborhoodId, customerId) {
		let this.mealId = mealId;
		let this.neighborhoodId = neighborhoodId;
		let this.customerId = customerId;
		let this.deliveryId = ++deliveryId;
	}
}

