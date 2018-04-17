// `Customer` class:
//
// + `new Customer()` — initialized with both name, and an instance of an `employer`; returns a JavaScript object that has attributes of `id`, `employerId`, and `name`
// + `meals()` - returns all of the meals that a customer has had delivered
// + `deliveries()` — returns all of the deliveries that customer has received
// + `totalSpent()` - returns the total amount that the customer has spent, as a function of the cost of the meals he has had delivered
//

let store = {meals: [], deliveries: [], customers: []};
let mealId = 0;
let deliveryId = 0;
let customerId = 0;

class Customer{
  constructor(name, employer){
    this.id = ++customerId;
    this.name = name;
    this.employer = employer;
    store.customers.push(this);
  }
  meals(){
    return store.meals.filter(meal => {
      return meal.customerId === this.id
    })
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customersId === this.id
    })
  }
}

// Delivery` class:
//   + `new Delivery()` — initialized with `meal` and `customer`; returns an object that has attributes of `mealId`, `customerId`, and `id`
//   + `meal()` - returns the meal associated with the delivery
//   + `customer()` - returns the customer associated with the delivery

class Delivery{
  constructor(meal, customer){
    this.id = ++deliveryId;
    this.mealId = meal.id };
    this.customerId = customer.id };
    store.deliveries.push(this);
  }
  meal(){
    return store.meals.find(meal => {
      return meals.deliveryId === this.id
    })
  }
  customer(){
    return store.customers.find(customer => {
      return customers.deliveryId === this.id
    })
  }
}
