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
    let array = this.deliveries().map(x => x.mealId);
    let meal_ids = [...new Set(array)];
    let new_array = [];
    let i;
        for(i=0;i<meal_ids.length;i++) {
          let x = store.meals.find(a => a.id === meal_ids[i]);
          new_array.push(x);
        }
    return new_array;
  }

}

class Customer{
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
    let array = this.deliveries();
    let meal_ids = array.map(x => x.mealId);
    let new_array = [];
    let i;
        for(i=0;i<meal_ids.length;i++) {
          let x = store.meals.find(a => a.id === meal_ids[i]);
          new_array.push(x);
        }
    return new_array;
  }

  totalSpent(){
    let array = this.meals();
    return array.reduce(function(acc,cv,ci,arr){
            return acc + cv.price;
            }, 0);
  }




}

class Meal{
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
  let array = this.deliveries().map(x => x.customerId);
  let cust_ids = [...new Set(array)];
  let new_array = [];
  let i;
      for(i=0;i<cust_ids.length;i++) {
        let x = store.customers.find(a => a.id === cust_ids[i]);
        new_array.push(x);
      }
  return new_array;

  }

  static byPrice(){
    let array = store.meals.sort(function(a,b){
      return b.price - a.price;
      });
    return array;
  }

}

class Delivery{
  constructor(mealId, neighborhoodId, customerId){
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find(
      function(meal){
        return meal.id === this.mealId;
      }.bind(this)
    );
  }

  customer(){
    return store.customers.find(
      function(customer){
        return customer.id === this.customerId;
      }.bind(this)
    );
  }

  neighborhood(){
    return store.neighborhoods.find(
      function(neighborhood){
        return neighborhood.id === this.neighborhoodId;
      }.bind(this)
    );
  }

}
