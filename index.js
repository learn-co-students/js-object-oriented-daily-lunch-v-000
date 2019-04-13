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
    store.neighborhoods.push(this)
  };

  customers(){
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    });
  };

  meals(){

  };

  deliveries(){
    return store.deliveries.filter(delivery => {
     return delivery.neighborhoodId === this.id
   });
  };


}

class Customer{
  constructor(name, neighborhoodId){
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this)

  };

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    });
  }

  meals(){
    return store.meals.filter(meal => {
      return meal.customerId ===this.id
    });
  };

  totalSpent(){
 // use reduce
  };
}

class Meal{
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this)
  };
  deliveries(){
    return store.delivery.filter(delivery => {
      return delivery.mealId === this.id
    });
  }

  customers(){
    return store.customers.filter(customer => {
      return customer.mealId === this.id
    });
  }
  byPrice(){

  }
}

class Delivery{
  constructor(mealId, neighborhoodId, customerId){
    this.id = ++deliveryId;
    this.customerId = customerId;
    this.neighborhoodId = neighborhoodId;
    this.mealId = mealId
    store.deliveries.push(this)
  };

  meal(){
    return store.meals.filter(meal => {
      return meal.deliveryId === this.id
    });
  };

  customer(){
    return store.customers.filter(customer => {
      return customer.deliveryId === this.id
    });
  }

  neighborhood(){
    return store.neighborhood.filter(neighborhood => {
      return neighborhood.deliveryId === this.id
    });
  }
}
