// global datastore
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
		return store.deliveries.filter(d => { 
			return d.neighborhoodId === this.id 
		}) 
	}
	customers() { 
		return store.customers.filter(c => { 
			return c.neighborhoodId === this.id 
		}) 
	}
	meals() {
    	function uniqueMeals(value, index, self) {
      		return self.indexOf(value) === index
    	}
    return this.deliveries().map(delivery => 
    	delivery.meal()).filter(uniqueMeals)
  	}
} 
 
class Customer {
 	constructor(name, neighborhood) {
    	this.id = ++customerId;
    	this.name = name;
    	this.neighborhoodId = neighborhood;

    	store.customers.push(this);
  	}
  	 deliveries() { 
  	 	return store.deliveries.filter(d => { 
  	 		return d.customerId === this.id 
  	 	}) 
  	}
	meals() { 
		return this.deliveries().map(d => { 
			return d.meal() 
		}) 
	}
  	totalSpent() { 
  		return this.meals().reduce((a,b) => { 
  			return a += b.price 
  			}, 
  		0) 
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
  		return store.deliveries.filter(d => { 
  			return d.mealId === this.id 
  		}) 
  	}
  	customers() { 
  		return this.deliveries().map(d => { 
  			return d.customer() 
  		}) 
  	}
  	static byPrice() {
    	return store.meals.sort((a,b) => { 
    		return b.price - a.price 
    	})
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
  		return store.meals.find(m => { 
  			return m.id === this.mealId 
  		}) 
  	}
  	customer() { 
  		return store.customers.find(c => { 
  			return c.id === this.customerId 
  		}) 
  	}
  	neighborhood() { 
  		return store.neighborhoods.find(n => { 
  			return n.id === this.neighborhoodId 
  		}) 
  	}
} 


