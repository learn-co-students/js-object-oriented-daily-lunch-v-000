// store = {
//   meal: [has_many_customers],
//   customers: [has_many deliveries, has_many meals through deliveries, belongs_to neighborhood],
//   deliveries: [belongs_to meal, belongs_to customer, belongs_to neighborhood],
//   neighborhoods: [has_many deliveries, has_many customers through deliveries, has_many meals through deliveries]
// }
let store = {meals: [], customers:[], deliveries: [], neighborhoods: []};

let neighborhoodIdCounter = 0;
class Neighborhood{
  constructor(name){
    this.name = name;
    store.customers.push(this);
  }
  deliveries(){
    return store.deliveries.find(d => d.neighborhoodId === this.id);
  }
  customers(){
    return this.deliveries().map(delivery => delivery.customer());
  }
  // meals(){
  //
  // }
}

let customerIdCounter = 0;
class Customer{
  constructor(name){
    this.id = ++customerIdCounter;
    // this.neighborhoodId = neighborhoodId;
    this.name = name;
    store.customers.push(this);
  }

  deliveries(){
    // return store.deliveries.map(d => d.id === ?)
  }
  meals(){
    return this.deliveries().map( delivery => delivery.meal());
  }
  totalSpent(){

  }
}

let mealIdCounter = 0;
class Meal{
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealIdCounter;
    store.meals.push(this);
  }
  deliveries(){
    return store.deliveries.find(d => d.mealId === this.id);
  }
  customers(){
    return this.deliveries().map(d => d.customer());
  }
  // static byPrice(){
  //   return
  // }
}

let deliveryIdCounter = 0;
class Delivery{
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryIdCounter;
    store.deliveries.push(this);
  }
  meal(){
    return store.meals.find(m => m.id === this.mealId);
  }
  customer(){
    return store.customers.find(c => c.id === this.customerId);
  }
  neighborhood(){
    return store.neighborhoods.find(n => n.id === this.neighborhoodId);
  }
}
