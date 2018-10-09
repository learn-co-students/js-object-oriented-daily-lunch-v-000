// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood{
  constructor(name){
    this.name = name
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this)
  }

  //Returns all deliveries in a specific neighborhood
  deliveries(){
    return store.deliveries.filter(delivery =>{
      return delivery.neighborhoodId == this.id;
    })
  }

  //Returns all customers in a specific area
  customers(){
    return store.customers.filter(customer =>{
      return customer.neighborhoodId == this.id;
    })
  }

  //returns all meals in a specific neighborhood
  meals(){

  }
}

class Customer{
  constructor(name, neighborhoodId){
    this.name = name
    this.id = ++customerId;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId == this.id;
    })
  }

  meals(){
    return store.meals.filter(meal => {
      return meal.customerId == this.id;
    })
  }
}

class Meal{
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this)
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

  meal(delivery){
    //Stoppping Point 
    })
  }
}
