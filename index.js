let store = {customers: [], meals: [], deliveries: [], employers: []};


let cId = 0;

class Customer{
  constructor(name, employer){
    this.name = name;
    if (employer){
      this.employerId = employer.id;
    }

    this.id = ++cId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    })
  }

  meals(){
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }

  totalSpent(){

    return this.meals().reduce(function (total, meal) {
      return total + meal.price;
    },0)

  }
}

let dId = 0;

class Delivery{
  constructor(meal, customer){
    if (meal){
      this.mealId = meal.id;
    }
    if (customer){
      this.customerId = customer.id;
    }

    this.id = ++dId;
    store.deliveries.push(this);
  }

  customer(){
    return store.customers.find(function (customer) {
      return customer.id === this.customerId
    }.bind(this))
  }
  meal(){
    return store.meals.find(function (meal) {
      return meal.id === this.mealId
    }.bind(this))
  }
}

let mId = 0;

class Meal{
  constructor(title, price){
    this.title = title;
    this.price = price;

    this.id = ++mId;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    })
  }

  customers(){
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }

  static byPrice(){
    return store.meals.sort(function (meal1, meal2) {
      return meal2.price - meal1.price;
    })
  }
}

let eId = 0;

class Employer{
  constructor(name){
    this.name = name;
    this.id = ++eId;

    store.employers.push(this);
  }

  employees(){
    return store.customers.filter(customer => {
      return customer.employerId === this.id;
    })
  }

  deliveries(){
    let del =  this.employees().map((employee) => {
      return employee.deliveries()
    });

    return [].concat.apply([], del);
  }
  meals(){
    return this.employees().reduce((employee) => {
      return employee.meals()
    });

  }

  mealTotals(){

    let meals = this.employees().map((employee) => {
      return employee.meals();
    });

    let mealsMerged = [].concat.apply([], meals);

    return mealsMerged.reduce(function(result, item) {
      result[item.id] = (result[item.id] || 0 ) + 1;
      return result;
    }, {});

  }

}
