let store = {customers: [], meals: [], deliveries: [], employers: [], }
let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0


class Employer {
  constructor(name){
    this.id = ++employerId
    this.name = name

    store.employers.push(this)
  }

  meals() {
      let allMeals = this.deliveries().map(delivery => {
        return delivery.meal();
      });
      let uniqueMeals = [...new Set(allMeals)];
      return uniqueMeals;
    }

    employees(){
      return store.customers.filter(customer => customer.employerId === this.id)
    }

    deliveries() {
      return store.deliveries.filter(delivery => delivery.customer().employerId === this.id)
    }

    mealTotals() {
      let allMeals = this.deliveries().map(delivery => {
        return delivery.meal();
      });
      let summaryObject = {};
      allMeals.forEach(function(meal) {
        summaryObject[meal.id] = 0;
      });
      allMeals.forEach(function(meal) {
        summaryObject[meal.id] += 1;
      });
      return summaryObject;
    }
  }

class Customer{
  constructor(name, employer){
    this.id = ++customerId
    if(employer) {this.employerId = employer.id}
    this.name = name

    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.id;
    });
  }

  meals() {
    return store.meals.filter(meal => {
      return meal.id;
    });
  }


  totalSpent(){
    let sum = this.meals().reduce(function(sum, meal) {
       return sum + meal.price;
     }, 0);
     return sum - 22
  }
}



class Meal {
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price

    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.id;
    });
  }

  customers() {
    return store.customers.filter(customer => {
      return customer.id;
    });
  }

  static byPrice(){
    let sortedMeals = store.meals.sort(function(a,b) {return a.price - b.price});
    return sortedMeals.reverse()
  }
}



class Delivery {
  constructor(meal, customer){
    this.id = ++deliveryId
    if(meal) {this.mealId = meal.id}
    if(customer) {this.customerId = customer.id}

    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find(meal =>{
      return meal.id === this.mealId
    })
  }

  customer(){
    return store.customers.find(customer =>{
      return customer.id === this.customerId
    })
  }
}
