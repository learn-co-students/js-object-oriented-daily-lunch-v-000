// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodCounter = 0;
class Neighborhood {
  constructor(name){
    this.id = ++neighborhoodCounter;
    this.name = name;
    store.neighborhoods.push(this);
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.neighborhoodId == this.id)
  }
  customers(){
    return store.customers.filter(customer => customer.neighborhoodId == this.id);
  }
  meals(){
    let meals = this.deliveries().map(delivery => delivery.meal());
    return [...new Set(meals)];
  }
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;
let customerCounter = 0;
class Customer {
  constructor(name, neighborhoodId){
    this.id = ++customerCounter;
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId == this.id)
  }

  meals(){
    return this.deliveries().map(delivery => delivery.meal());
  }

  totalSpent(){
    return this.meals().map(meal=> meal.price).reduce(reducer);
  }
}

let mealCounter = 0;
class Meal {

  static byPrice(){
    return store.meals.sort((a, b) => a.price < b.price);
  }

  constructor(title, price){
    this.id = ++mealCounter;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId == this.id)
  }
  customers(){
    return this.deliveries().map(delivery => delivery.customer());
  }

}

let deliveryId = 0;
class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find(meal => meal.id == this.mealId);
  }
  neighborhood(){
    return store.neighborhoods.find(neighborhood => neighborhood.id == this.neighborhoodId);
  }
  customer(){
    return store.customers.find(customer => customer.id == this.customerId);
  }
}
