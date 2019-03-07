// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 1
let customerId = 1
let mealId = 1
let deliveryId = 1

class Neighborhood {
  constructor(name, neighborhood) {
	this.name = name;
	this.id = neighborhoodId++
	store.neighborhoods.push(this)
  }

  deliveries() { 
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
  }

  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id)
  }

  meals() {
    const meal = this.deliveries().map(function(delivery){
      return delivery.meal()
	});
	return [...new Set(meal)];
  }
}

class Customer {
  constructor(name, neighborhood) {
    this.name = name;
	this.neighborhoodId = neighborhood;
	this.id = customerId++;
	store.customers.push(this)
  }

  deliveries() { 
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal())
  }

  totalSpent(){
	   let total = 0
    this.meals().map(function(meal){
  	total = total + meal.price
    });
    return total
  }
}
	
class Meal {
  constructor(title, price) {
	this.title = title;
	this.price = price;
	this.id = mealId++;
	store.meals.push(this);
  }

  deliveries() {
  	return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }
	
  customers() {
	return this.deliveries().map(function(delivery){
	  return delivery.customer()});
  }  
  static byPrice() {
    return store.meals.sort(function(a, b){ 
	  return b.price - a.price});
  }
}

class Delivery {
  constructor(meal, neighborhood, customer){
    this.mealId = meal;
    this.customerId = customer;
    this.neighborhoodId = neighborhood;
    this.id = deliveryId++;
    store.deliveries.push(this);
  }

  meal() {
	return store.meals.find(meal => meal.id === this.mealId)
  }
  
  customer() {
    return store.customers.find(customer => customer.id === this.customerId);
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }
}




