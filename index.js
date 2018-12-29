// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let customerId = 0;
let neighborhoodId = 0;
let mealId = 0;
let deliveryId = 0;
class Neighborhood {
	constructor(name) {
		this.name = name;
		this.id = ++neighborhoodId;
debugger;
		store.neighborhoods.push(this);
	}
  deliveries(){
    // returns all unique deliveries associated with a particular neighborhood ‣
   return store.deliveries.filter (//by calling filter method on values of store deliveries collection
     function(delivery){//argument to filter method -> annoymous function of a delivery argument
       return delivery.neighborhoodId === this.id//associated with a particular neighborhood
       //by using returning values of strictly equiv. operators between 2 method calls (delivery.neighborhoodId, this.id)
     }.bind(this)//bind the delivery outcome to this Neighborhood
   );
  }
  customers(){
    return store.customers.filter(
      function(customer){
        return customer.neighborhoodId === this.id
        debugger;
      }.bind(this)
    )
  }
}
class Customer {
	constructor(name, neighborhoodId) {
		this.name = name;
		this.neighborhoodId = neighborhoodId;
		this.id = ++customerId;
debugger;
		store.customers.push(this);
	}
}
class Meal {
	constructor(title, price) {
		this.title = title;
		this.price = price;
		this.id = ++mealId;
debugger;
		store.meals.push(this);
	}
}
class Delivery {
	constructor(mealId, neighborhoodId, customerId) {
		this.mealId = mealId;
		this.neighborhoodId = neighborhoodId;
		this.customerId = customerId;
		this.id = ++deliveryId;

		store.deliveries.push(this);
	}
  meal() {
    return store.meals.find(//from find method call on store meals collection;"COMPLETE"
      function(meal){//from object of annoymous function with meal argument;"READ UP"
        return meal.id === this.mealId;//returns the meal instance associated with a particular delivery; delivery belongs to a meal;"READ UP"
      }.bind(this)//bind this meal object to this Delivery
    )
  }
  customer () {
    return store.customers.find(//from find method call on store customers collection;"COMPLETE"
    function(customer){//pass in fn object argment to find method call->object of annoymous function with customer argument;"READ UP"
      return customer.id === this.customerId;//returns the customer instance associated with a particular delivery; delivery belongs to a customer
    }.bind(this)
    )
  }
 neighborhood(){
   return store.neighborhoods.find(
     function(neighborhood){
     return neighborhood.id === this.neighborhoodId;//returns the neighborhood in which a delivery was placed
    }.bind(this)
  )
 }

}
