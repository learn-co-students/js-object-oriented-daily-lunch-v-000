// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
class Neighborhood {
  constructor(name){
    this.name = name
    this.id = ++neighborhoodId

    store.neighborhoods.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    })
  }

  customers(){
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    })
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal())
  }

  meals() {
    let neighborhoodMeals = this.deliveries()
    let mealsArray = neighborhoodMeals.map(function (delivery) {
      return delivery.meal();
    });
    return [...new Set(mealsArray)];
};
}

let customerId = 0
class Customer{
  constructor(name, neighborhoodId){
  this.name = name
  this.id = ++customerId
  this.neighborhoodId = neighborhoodId
  store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal())
  }

  totalSpent() {
    let customerMeals = this.meals();
    return customerMeals.reduce(function (acc, meal) {
      return acc + meal.price;
    }, 0);
};

}

let mealId = 0

class Meal{
  constructor(title, price, customerId){
    this.title = title
    this.price = price
    this.id = ++mealId
    this.customerId = customerId
    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }
  
  customers() {
    let mealDeliveries = this.deliveries();
    return mealDeliveries.map(function (delivery) {
      return delivery.customer();
    });
};
  
static byPrice() {
  return store.meals.sort(function (a, b) {
    return b.price - a.price;
  });
};

}

let deliveryId = 0
class Delivery{
  constructor(mealId, neighborhoodId, customerId, id){
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId

    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find(function(meal){
      return meal.id === this.mealId
    }.bind(this))
  }

  customer() {
    return store.customers.find(function(customer){
      return customer.id === this.customerId
    }.bind(this))
  }

  neighborhood() {
    return store.neighborhoods.find(function(neighborhood){
      return neighborhood.id === this.neighborhoodId
    }.bind(this))
  }
} 