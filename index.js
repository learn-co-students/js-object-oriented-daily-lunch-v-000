// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 1;
let customerId = 1;
let mealId = 1;
let deliveryId = 1;

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
    let dinn = this.deliveries().map(function(delivery){
      return delivery.meal();
    });
      return dinn.filter(function(din, i, ar){ return ar.indexOf(din) === i});

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
    return this.deliveries().map(delivery => delivery.meal());
  };


  totalSpent(){
     return this.meals().reduce((total, meal) => (total += meal.price), 0);
  };
}


class Meal{
  constructor(title, price){
    this.id = mealId++;
    this.title = title;
    this.price = price;
    store.meals.push(this)
  };
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    });
  }

  customers(){
    return this.deliveries().map(delivery => delivery.customer());
  };

  static byPrice(){
    return store.meals.sort((a, b) => b.price - a.price);
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
    return store.meals.find(meal =>  meal.id === this.mealId);
  };

  customer(){
    return store.customers.find(customer => customer.id === this.customerId );
  }

  neighborhood(){
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
  }
}
