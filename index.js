// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let mid = 0;
let nid = 0;
let did = 0;
let cid = 0;

//A neighborhood has many deliveries
//has many customers => deliveries
//has many meals => deliveries
class Neighborhood{
  constructor(name){
    this.id = nid++;
    this.name = name;
    store.neighborhoods.push(this)
  }

  customers(){
   return store.customers.filter(customer => {
     return customer.neighborhoodId === this.id;
   })
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id;
    })
   }

  allMeals(){
    return this.deliveries().map(delivery => {
      return delivery.meal();
    })
  }

   meals(){
    return [...new Set(this.allMeals())];
   }
 }
//A meal has many customers
class Meal{
  constructor(title, price){
    this.id = mid++;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    })
  }

  customers(){
    return this.deliveries().map(delivery => {
      return delivery.customer();
    })
  }

  static byPrice(){
    return store.meals.sort(function(a,b){
      return b.price - a.price;
    })
  }
 }

// A customer has many deliveries, meals => deliveries
// belongs_to neighborhood
class Customer{
  constructor(name, neighborhood){
    this.id = cid++;
    this.name = name;
    this.neighborhoodId = neighborhood;
    store.customers.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    })
  }

  meals(){
    return this.deliveries().map(delivery => {
      return delivery.meal();
    })
  }

  totalSpent(){
    return this.meals().reduce((sum, meal) =>{
      return sum + meal.price
    }, 0);
  }
}

//A delivery belongs to a meal, belongs to a customer, and belongs to a neighborhood
class Delivery{
  constructor(meal, neighborhood, customer){
    this.id = did++;
    this.mealId = meal;
    this.neighborhoodId = neighborhood;
    this.customerId = customer;
    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    })
  }

  customer(){
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    })
  }

  neighborhood(){
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId;
    })
  }
}
