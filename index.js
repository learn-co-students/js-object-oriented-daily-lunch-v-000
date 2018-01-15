let store = {deliveries: [], meals: [], employers: [], customers: []}
let deliveryId = 0;
let mealId = 0;
let employerId = 0;
let customerId = 0;

class Delivery {
  constructor(meal, customer){
    if (meal) {
    this.mealId = meal.id;}
    if (customer) {
    this.customerId = customer.id;}
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }
  customer(){
    return store.customers.find(customer => this.customerId === customer.id)
  }
  meal(){
    return store.meals.find(meal => this.mealId === meal.id)
  }


}
class Meal {
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }
  static byPrice(){
    return store.meals.sort(function(a, b){
      return a.price < b.price;
    })
  }
  deliveries(){
    return store.deliveries.filter(delivery => this === delivery.meal())
  }
  customers(){
    return this.deliveries().map(delivery => delivery.customer())
  }
}
class Employer {
  constructor(name){
    this.name = name;
    this.id = ++employerId
    store.employers.push(this);
  }
  employees(){
    return store.customers.filter(customer => this.id === customer.employerId)
  }
  deliveries(){
    return this.employees().reduce(function(totalDeliveries, employee) {
      return totalDeliveries.concat(employee.deliveries())
    }, [])
  }
  meals(){
    const allMeals = this.deliveries().reduce(function(totalMeals, delivery){
      return totalMeals.concat(delivery.meal())
    }, [])
    return allMeals.filter(function(item, pos){
      return allMeals.indexOf(item) === pos;
    })
  }
  mealTotals(){
    const allMeals = {};
    this.deliveries().forEach(function(delivery) {
      if (!allMeals[delivery.mealId]) {
        allMeals[delivery.mealId] = 1;
      }
      else {
        allMeals[delivery.mealId]++;
      }
    })
    return allMeals
  }
}
class Customer {
  constructor(name, employer) {
    this.name = name;
    this.id = ++customerId;
    store.customers.push(this);
    if (employer) {
      this.employerId = employer.id;
    }
  }
  totalSpent(){
    return this.meals().reduce(function(total, ele) {
      return total + ele.price;
    }, 0)
  }
  deliveries(){
    return store.deliveries.filter(delivery => this === delivery.customer())
  }
  meals(){
    return this.deliveries().map(delivery => delivery.meal())
  }

}
