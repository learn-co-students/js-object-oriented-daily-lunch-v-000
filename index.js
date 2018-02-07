let store = {customers: [], meals: [], deliveries: [], employers: []};

let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

class Customer{
  constructor(name, employer = {}){
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer.id;

    store.customers.push(this);
  }

  meals(){
    return this.deliveries().map(delivery =>{
      return delivery.meal();
    });
  }

  deliveries(){
    return store.deliveries.filter(delivery =>{
      return delivery.customerId === this.id;
    })
  }

  totalSpent(){
    return this.meals().reduce(function(total, meal){
      return total + meal.price;
    }, 0);// total of all prices of all meals ordered
  }
}

class Meal{
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery =>{
      return delivery.mealId == this.id;
    })
  }

  customers(){
    return this.deliveries().map(delivery =>{
      return delivery.customer();
    })
  }

  static byPrice(){
    // class method, orders meals by price
    return store.meals.sort(function(a, b){
      return a.price < b.price;
    })
  }
}

class Delivery{
  constructor(meal = {}, customer = {}){
    this.id = ++deliveryId;
    this.customerId = customer.id;
    this.mealId = meal.id;

    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find(meal =>{
      return meal.id === this.mealId;
    })
  }

  customer(){
    return store.customers.find(customer =>{
      return customer.id === this.customerId;
    })
  }
}

class Employer{
  constructor(name){
    this.id = ++employerId;
    this.name = name;

    store.employers.push(this);
  }

  employees(){
    return store.customers.filter(customer =>{
      return customer.employerId === this.id;
    })
  }

  deliveries(){
    let all = this.employees().map(employee =>{
      return employee.deliveries();
    })

    return [].concat.apply([], all)
  }

  meals(){
    let all = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    
    return [...new Set(all)];
  }

  mealTotals(){
    let allMeals = {};
    let all = this.deliveries().map(delivery => {
      return delivery.meal();
    });

    //
    all.forEach(function(meal){
      allMeals[meal.id] = 0;
    });

    all.forEach(function(meal){
      allMeals[meal.id] += 1;
    });

    return allMeals;
  }
}
