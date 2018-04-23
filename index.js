// customer
//   - belongs to an employer => employerId
//   - has many deliveries
//   - has many meals, through deliveries
//
// employer
//   - has many customers/employees
//   - has many deliveries, through employees
//   - has many meals, through employees
//
// meal
//   - has many deliveries
//    - belongs to many customers, through deliveries
//
// delivery
//   - belongs to a customer => customerId
//   - belongs to a meal => mealId
//


let store = {
  customers: [],
  meals: [],
  deliveries: [],
  employers :[]
}

let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

class Customer {
  constructor(name, employer){
    this.name = name;
    this.id = ++customerId;
    if (employer) {
      this.employerId = employer.id;
    }
    store.customers.push(this);
  }

  meals(){
    return this.deliveries().map(function(delivery){
      return delivery.meal();
    }.bind(this));

  }
  deliveries(){
    return store.deliveries.filter(function(delivery){
      return delivery.customerId === this.id;
    }.bind(this));

  }
  totalSpent(){
    return this.meals().reduce( function(sum, curr){
      return sum + curr.price;
    }, 0);
  }
}


class Employer {
  constructor(name){
    this.name = name;
    this.id = ++employerId;
    store.employers.push(this);
  }

  employees(){
    return store.customers.filter( function(customer){
      return customer.employerId === this.id;
    }.bind(this));

  }

  deliveries(){
    let deliveries = [];
    this.employees().forEach(function(employee){
      deliveries.push(...employee.deliveries());
    });

    console.log(deliveries);
    return deliveries;
  }

  // employer
  //   - has many customers/employees
  //   - has many deliveries, through employees
  //   - has many meals, through employees
  meals(){
    let meals = [];
    this.employees().forEach(function(employee){
      employee.meals().forEach( function(meal){
        if (!meals.includes(meal)){
          meals.push(meal);
        }
      });
    });
    return meals;
  }
  mealTotals(){
    let count = {};
    this.deliveries().forEach( function(delivery){
      let mealId = delivery.meal().id;

      if (Object.keys(count).includes(mealId.toString())){ // if meal already exists
        count[mealId] += 1;
      } else {
        count[mealId] = 1;
      }
    });
    return count;
  }
}

class Meal {
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }
  deliveries(){
    return store.deliveries.filter (function(delivery){
      return delivery.mealId === this.id;
    }.bind(this));
  }

  customers(){
    return this.deliveries().map( function(delivery){
      return delivery.customer();
    });
  }
  static byPrice(){
    return store.meals.sort( function(a,b){
      return b.price - a.price;
    });
  }
}

class Delivery{
  constructor(meal, customer){
    this.id = ++deliveryId;
    if (meal){
      this.mealId = meal.id;
    }
    if(customer){
      this.customerId = customer.id;
    }
    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find( function(meal){
      return meal.id === this.mealId;
    }.bind(this));

  }
  customer(){
    return store.customers.find (function(customer){
      return customer.id === this.customerId;
    }.bind(this));
  }
}
