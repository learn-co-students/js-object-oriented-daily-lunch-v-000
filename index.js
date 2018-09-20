// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let mealId = 0;

class Meal {
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price

    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  };

  customers(){
    return this.deliveries().map(delivery => delivery.customer());
  };

  static byPrice() {
    const sorter = [...store.meals];
    // debugger
    return sorter.sort(function(meal1, meal2){ return meal2.price - meal1.price});
  }

  // static byPrice() {
  //   return store.meals.sort((a, b) => a.price < b.price);
  // }
}

let neighborhoodId = 0;
class Neighborhood {
  constructor(name){
  this.id = ++neighborhoodId;
  this.name = name;

  store.neighborhoods.push(this);
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.neighborhoodId = this.id);
  };
  customers(){
    // debugger
    return [...new Set(this.deliveries().map(delivery => delivery.customer()))];
  };

  meals(){
    return [...new Set(this.deliveries().map(delivery => delivery.meal()))];
  };
}

let customerId = 0;
class Customer {
  constructor(name, neighId){
  this.id = ++customerId;
  this.name = name;
  this.neighborhoodId = neighId;

  store.customers.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id);
  };

  meals(){
    return this.deliveries().map(delivery => delivery.meal());
  };
  totalSpent(){
    return this.meals().reduce(function(agg, meal){return agg + meal.price;}, 0);
  }

}

let deliveryId = 0;
class Delivery {
  constructor(mealId, neighId, custId){
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighId;
    this.customerId = custId;

    store.deliveries.push(this);
  }

  customer(){
    return store.customers.find(customer => customer.id === this.customerId);
  }

  meal(){
    return store.meals.find(meal => meal.id === this.mealId);
  }

  neighborhood(){
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
  }
}
