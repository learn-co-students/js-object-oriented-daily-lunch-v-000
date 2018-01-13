let store = {deliveries: [], meals: [], employers: [], customers: []};

let deliveryId = 0;

class Delivery{
  constructor(meal = {}, customer = {}){
    this.id = ++deliveryId;
    //broke when i added these properties, still not sure why. Same with Cust
    this.mealId = meal.id;
    this.customerId = customer.id;

    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find(meal => {
      return this.mealId === meal.id;
    })
  }

  customer(){
    return store.customers.find(customer => {
      return this.customerId === customer.id;
    })
  }
}

let mealId = 0;

class Meal{
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;

    store.meals.push(this);
  }

  static byPrice(){
    return store.meals.sort(function(item1, item2) {
      return item2.price - item1.price;
    })
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    })
  }

  customers() {
    return store.deliveries.map(delivery => {
      if (delivery.mealId === this.id){
        return delivery.customer();
      }
    })
  }
}

let employerId = 0;

class Employer{
  constructor(name){
    this.name = name;
    this.id = ++employerId;

    store.employers.push(this);
  }

  employees(){
    return store.customers.filter(customer =>{
      return customer.employerId === this.id;
    })
  }

  deliveries(){
    let delivs = this.employees().map(employee => {
      return employee.deliveries();
    })

    return delivs.reduce(function (allDeliveries, delivery) {
      return allDeliveries.concat(delivery);
    })
  }

  meals() {
    let mealArray = this.deliveries().map(delivery => {
      return delivery.meal();
    })
    return mealArray.filter(function(meal, index, self) {
      return self.indexOf(meal) === index;
    })
  }

  mealTotals() {
    let totals = {};
    let mealsOrdered = this.deliveries().map(delivery => {
      return delivery.meal();
    })

    mealsOrdered.forEach(meal => {
      totals[meal.id] = 0;
    })

    mealsOrdered.forEach(meal => {
      totals[meal.id] += 1;
    })

    return totals;
  }

}

let customerId = 0;

class Customer{
  constructor(name, employer = {}){
    this.name = name;
    this.id = ++customerId;
    this.employerId = employer.id;

    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    })
  }

  meals() {
    return this.deliveries().map(delivery => {
        return delivery.meal();
    })
  }

  totalSpent(){
      return this.meals().reduce(function(sum, meal) {
          return sum + meal.price;
      }, 0);
  }
}
