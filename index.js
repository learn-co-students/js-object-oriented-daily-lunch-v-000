// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let mealId = 0;
let customerId = 0;
let deliveryId = 0;
let neighborhoodId = 0;

class Meal {
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter(function (delivery){
      return delivery.meal() === this;
    }.bind(this));
  }

  customers(){
    return this.deliveries().map(function (delivery){
      return delivery.customer();
    })
  }

  static byPrice(){
    return store.meals.sort(function (a, b){
      return b.price - a.price
    })
  }
}

class Customer {
  constructor(name, neighborhoodId){
    this.name = name;
    this.id = ++customerId;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }

  deliveries(){
    return store.deliveries.filter(function (delivery){
      return delivery.customer() === this;
    }.bind(this));
  }

  meals(){
    return this.deliveries().map(function (delivery) {return delivery.meal()}.bind(this));
  }

  totalSpent(){
    return this.meals().reduce(function (agg, el, i, arr) {
      return agg += el.price
    }, 0)
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.customerId = customerId;
    this.neighborhoodId = neighborhoodId;
    store.deliveries.push(this);
  }

  meal(){
    return store.meals.filter(function (meal){
      return this.mealId === meal.id;
    }.bind(this))[0];
  }

  customer(){
    return store.customers.filter(function (customer){
      return this.customerId === customer.id;
    }.bind(this))[0];
  }

  neighborhood(){
    return store.neighborhoods.filter(function (neighborhood){
      return this.neighborhoodId === neighborhood.id;
    }.bind(this))[0];
  }

}

class Neighborhood {
  constructor(name){
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(function (delivery){
      return delivery.neighborhoodId === this.id
    }.bind(this))
  }

  customers(){
    return store.customers.filter(function (customer) {
      return customer.neighborhoodId === this.id
    }.bind(this));
  }

  meals(){
    return store.deliveries.filter(function (deliver){
      return deliver.neighborhood() === this;
    }.bind(this)).map(function (delivery){
      return delivery.meal()
    }.bind(this)).filter(function (value, index, self){
      return self.indexOf(value) === index;
    }.bind(this))
  }
}
