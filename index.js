// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

class Neighborhood {
  constructor(name){
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this);
  }
  deliveries(){
    return store.deliveries.filter(
      function(delivery){
        return delivery.neighborhoodId === this.id;
      }.bind(this)
    );
  }
  customers(){
    return store.customers.filter(
      function(customer){
        return customer.neighborhoodId === this.id;
      }.bind(this)
    );
  }
  meals(){
    let allMeals = this.deliveries().map(delivery => delivery.meal());
    let uniqueMeals = [...new Set(allMeals)];
    return uniqueMeals
  }
}

class Customer {
  constructor(name, neighborhoodId){
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }
  deliveries(){
    return store.deliveries.filter(
      function(delivery){
        return delivery.customerId === this.id;
      }.bind(this)
    );
  }
  meals(){
    return this.deliveries().map(delivery => delivery.meal())
  }
  totalSpent(){
    let total = 0
    for(let m of this.meals()){
      total += m.price
    }
    return total
  }
}

class Meal {
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }
  deliveries(){
    return store.deliveries.filter(
      function(delivery){
        return delivery.mealId === this.id;
      }.bind(this)
    );
  }
  customers(){
    return this.deliveries().map(delivery => delivery.customer())
  }

  static byPrice(){
    return store.meals.sort(function(a, b) {return b.price - a.price})
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.id = ++deliveryId
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }
  meal(){
    return store.meals.find(meal => meal.id === this.mealId)
  }
  customer(){
    return store.customers.find(customer => customer.id === this.customerId)
  }
  neighborhood(){
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }
}
