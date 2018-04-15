store = {deliveries: [], meals: [], employers: [], customers: []};

let deliveryId = 0;
class Delivery {
  constructor(meal = {}, customer = {}){
    this.mealId = meal.id;
    this.customerId = customer.id;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }
  meal(){
    return store.meals.find(meal =>{
      return meal.id === this.mealId;
    })
  }
  customer(){
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
  }
}

let mealId = 0;
class Meal {
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }
  static byPrice(){
    return store.meals.sort((meal1, meal2)=>{
      return meal1.price < meal2.price;
    });
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    });
  }
  customers(){
    return this.deliveries().map(delivery => {
      return delivery.customer();
    })
  }
}

let employerId = [];
class Employer {
  constructor(name){
    this.name = name;
    this.id = ++employerId;
    store.employers.push(this);
  }
}

let customerId = [];
class Customer {
  constructor(name, employer){
    this.name = name;
    this.id = ++customerId;
    store.customers.push(this);
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  }
  meals(){
    return this.deliveries().map(delivery =>{
      return delivery.meal();
    })
  }
  totalSpent(){
    return this.meals().reduce(function(sum, meal){
      return sum + meal.price;
    }, 0);
  }
}
