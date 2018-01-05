let store = {deliveries: [], meals: [], employers: [], customers: []};
let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

class Customer{
  constructor(name, employer){
    this.id = ++customerId;
    this.name = name;
    if(employer){
      this.employerId = employer.id;
    }

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
  totalSpent() {
      return this.meals().reduce(function(total, meal) {
        return total + meal.price;
      }, 0)
    }
  }

class Meal{
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this)
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
    return store.meals.sort(function (a, b){
      return b.price - a.price;
    });
  }
}

class Delivery{
  constructor(meal, customer){
    this.id = ++deliveryId;
    if(meal){
      this.mealId = meal.id;
    }
    if(customer){
      this.customerId = customer.id;
    }
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
}

class Employer {
  constructor(name) {
    this.id = employerId++
    this.name = name
    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id;
    })
  }

  deliveries() {
  let allD = this.employees().map(employee => {
    return employee.deliveries();
  })

  let merged = [].concat.apply([], allD);
  return merged;
}

meals() {
  let allM =  this.deliveries().map(delivery => {
    return delivery.meal();
  });
  let uniqM = [...new Set(allM)];
  return uniqM;
}

mealTotals() {
  let all = this.deliveries().map(delivery => {
    return delivery.meal();
  });

  let ordered = {};
  all.forEach(function(meal) {
    ordered[meal.id] = 0;
  });
  all.forEach(function(meal) {
    ordered[meal.id] += 1;
  });
  return ordered;
  }
}
