// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;
class Neighborhood{
    constructor(name){
      this.name = name;
      this.id = ++neighborhoodId;
    }
    deliveries(){}
    customers(){}
    meals(){}
}
class Customer{
    constructor(name,neighborhoodId){
      this.name = name;
      this.neighborhoodId = neighborhoodId;
      this.id = ++customerId;
    }
    deliveries(){}
    meals(){}
    totalSpend(){}
}

class Meal{
  constructor(title,price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
  }
  deliveries(){}
  customers(){}
  byPrice(){}
}

class Delivery{
  constructor(mealId,neighborhoodId,customerId){
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryId;
  }
  meal(){}
  customer(){}
  neighborhood(){}
}
