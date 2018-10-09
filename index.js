// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodIds = 1;
let mealIds = 1;
let customerIds = 1;
let deliveryIds = 1;

class Neighborhood {
constructor(name){
this.id = neighborhoodIds++;
this.name = name;
store.neighborhoods.push(this);} 

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
  
  meals(){
const allMeals = this.customers().map(customer => customer.meals());
      const merged = [].concat.apply([], allMeals);
      return [...new Set(merged)];
   
  }
  
}

class Meal{
constructor(title, price){
this.id = mealIds++;
this.title = title;
this.price = price;
store.meals.push(this);}

deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId == this.id;
    });
  }
customers() {
      const allCustomers = this.deliveries().map(delivery => delivery.customer());
      return [...new Set(allCustomers)];
    }
 static byPrice() {
      return store.meals.sort((a, b) => a.price < b.price);
    }
}

class Customer {
constructor(name, neighborhoodId){
this.id = customerIds++;
this.name = name;
this.neighborhoodId = neighborhoodId;
store.customers.push(this);}

deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId == this.id;
    });
  }

meals(){
   return this.deliveries().map(delivery => {
      return delivery.meal();
    });
  }
totalSpent(){
return this.meals().reduce((total, meal) =>
(total += meal.price), 0);
  }
}
  
class Delivery {
constructor(mealId, neighborhoodId, customerId)
{
this.id = deliveryIds++;
this.mealId = mealId;
this.neighborhoodId = neighborhoodId;
this.customerId = customerId;
store.deliveries.push(this);
}
customer(){
    return store.customers.find(customer => {
      return customer.id == this.customerId;
    });
  }

meal(){
    return store.meals.find(meal => {
      return meal.id == this.mealId;
    });
}
neighborhood(){
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id == this.neighborhoodId;
    });
  }
}