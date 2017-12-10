let store = {customers: [], meals: [], deliveries: [], employers: []};

let customerId = 0;

class Customer {

  constructor(name, employer){
    this.name = name;

    if (employer){
      this.employerId = employer.id;
    }

    this.id = ++customerId;
    store.customers.push(this);
  }

  meals(){
    return this.deliveries().map(delivery => {
      return delivery.meal();
    })
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    })
  }

  totalSpent(){
    return this.meals().reduce(function (agg, el, i, arr) {
      return agg + el.price;
    }, 0);
  }

}

let mealId = 0;

class Meal {

  constructor(title, price){
    if (title){
      this.title = title;
    }
    if (price){
      this.price = price;
    }
    this.id = ++mealId;
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
    return store.meals.sort(function (a, b) {
      return b.price - a.price;
    })
  }

}

let deliveryId = 0;

class Delivery {

  constructor(meal, customer){
    if (meal){
      this.mealId = meal.id;
    }
    if (customer){
      this.customerId = customer.id;
    }

    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find(function(meal){
      return meal.id === this.mealId;
    }.bind(this))
  }

  customer(){
    return store.customers.find(function(customer){
      return customer.id === this.customerId;
    }.bind(this))
  }

}

let employerId = 0;

class Employer {
  constructor(name){
    this.name = name;
    this.id = ++employerId;

    store.employers.push(this);
  }

  employees(){
    return store.customers.filter(customer => {
      return customer.employerId === this.id;
    })
  }

  deliveries(){
    let returnArray = this.employees().map(function(customer) {
      return customer.deliveries();
    });
    return returnArray = returnArray.concat.apply([],returnArray)
  }

  meals(){
    // get customer meals from deliveries
    let returnArray = this.employees().map(function(customer) {
      return customer.meals();
    })

    // concat array of customer meal objects and remove duplciates
    returnArray = returnArray.concat.apply([],returnArray)
    let uniqueReturnArray = [...new Set(returnArray)];

    // return unique
    return uniqueReturnArray;
  }

  mealTotals(){

    let returnObject = {};
    let deliveries = this.deliveries();

    for (const delivery of deliveries) {
      if (returnObject.hasOwnProperty(delivery.mealId)){
        returnObject[delivery.mealId] += 1;
      } else {
        returnObject[delivery.mealId] = 1;
      }
    }

    return returnObject;
  }
}
