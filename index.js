let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0

class Neighborhood {
    constructor(name){
      this.name = name;
      this.id = ++neighborhoodId;
      store.neighborhoods.push(this);
    }
    deliveries(){
        return store.deliveries.filter(delivery => {
          return delivery.neighborhoodId == this.id;
        });
      }
    customers(){
        return store.customers.filter(customer => {
          return customer.neighborhoodId == this.id;
        });
      }
}

class Meal {
    constructor(title, price = 0){
      this.title = title;
      this.price = price;
      this.id = ++mealId;
      store.meals.push(this);
    }

    deliveries(){
        return store.deliveries.filter(
          function(delivery){
            return delivery.mealId === this.id;
          }.bind(this)
        );
      }
    
}

class Customer {
  constructor(name, neighborhoodId){
    this.name = name;
    this.id = ++customerId;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.mealId = mealId;
    this.id = ++deliveryId;
    store.deliveries.push(this);
    }

    customer(){
        return store.customers.find(
          function(customer) {
            return this.customerId === customer.id;
          }.bind(this)
        );
    }

    neighborhood(){
        return store.neighborhoods.find(
          function(neighborhood) {
            return this.neighborhoodId === neighborhood.id;
          }.bind(this)
        );
      }

    meal(){
        return store.meals.find(
          function(meal) {
            return this.mealId === meal.id;
          }.bind(this)
        );
      }
}
    