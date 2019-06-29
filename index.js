let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let mealId = 0;
let customerId = 0;
let neighborhoodId = 0;
let deliveryId = 0;

class Meal {
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    
    // add the meal to the store
    store.meals.push(this);
  }
  
  customers() {
    return this.deliveries().map(delivery => delivery.customer()) 
  }

  deliveries() {
  	return store.deliveries.filter(delivery => delivery.mealId === this.id);
  }

  static byPrice() {
     return store.meals.sort(function(mealOne, mealTwo) {
            return mealOne.price - mealTwo.price;
     }).reverse();
  }
}

class Delivery {
  constructor(meal, customer, neighborhood){
    this.id = ++deliveryId;
    if (meal) {this.mealId = meal.id};
    if (customer) {this.custmerId = customer.id};
    if (neighborhood) {this.neighborhoodId = neighborhood.id};
    
    // add the delivery to the store
    store.deliveries.push(this);
  }
  
	meal() {
    return store.meals.find((meal) => meal.deliveryId === this.id);     
  }

  customer() {
    return store.customers.find((customer) => customer.deliveryId === this.id);     
  }

  neighborhood() {
  	return store.neighborhoods.find((delivery) => neighborhood.deliveryId === this.id);     
  }
}

class Customer {
  constructor(name, neighborhood){
    this.id = ++customerId;
    this.name = name;
    if (neighborhood) {this.neighborhoodId = neighborhood.id};
    
    store.customers.push(this);
  }
  
	meals() {
    return this.deliveries().map(delivery => delivery.meals());
  }

  deliveries() {
    return store.deliveries.filter((delivery) => delivery.customerId === this.id);     
  }

  totalSpent()  {
  	return this.meals().reduce(function(sum, item) {
        return sum + item.price;
    }, 0)
  }
}


class Neighborhood {
  constructor(name){
    this.id = ++neighborhoodId;
    this.name = name;
    
    // add this neighborhood to the store
    store.neighborhoods.push(this);
  }
  
	meals() {
    return [...new Set(this.deliveries().map(delivery => delivery.meal()))];
  }

  customers() {
    return store.customers.filter((customer) => customer.neighborhoodId === this.id);     
  }

  deliveries() {
  	return store.deliveries.filter((delivery) => delivery.neighborhoodId === this.id); 
  }
}

