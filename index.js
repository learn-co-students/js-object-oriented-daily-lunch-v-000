// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood{
  constructor(name){
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this);
  }
  deliveries(){
    return store.deliveries.filter(
      function(d){
        return d.neighborhoodId === this.id;
      }.bind(this)
    );
  }
  customers(){
    return store.customers.filter(
      function(c){
        return c.neighborhoodId === this.id;
      }.bind(this)
    );
  }
  meals(){

  }
}

class Customer{
  constructor(name, neighborhoodId){
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerId;
    store.customers.push(this);
  }
  deliveries(){
    return store.deliveries.filter(
      function(d){
        return d.customerId === this.id;
      }
    )
  }
  meals(){

  }
  totalSpent(){

  }
}

class Meal{
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }
  deliveries(){

  }
  customers(){

  }
  byPrice(){

  }
}

class Delivery{
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }
  meal(){

  }
  customer(){

  }
  neighborhood(){

  }
}
