let store = {customers: [], meals: [], delieveries: [], employers: []}
let customerId = 0;
class Customer {
  constructor(name, employer){
    this.id = ++customerId
    this.name = name
    if (employer){
      this.employerId = employer.id
    }
    store.customers.push(this)
  }
  meals(){

  }
  deliveries(){

  }
  totalSpent(){

  }
}
let mealId = 0;
class Meal {
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }
  deliveries(){

  }
  customers(){

  }
  static byPrice(){

  }
}
let deliveryId = 0;
class Delivery{
  constructor(meal, customer){
    this.id = ++deliveryId
    if (meal) {
      this.mealId = meal.id
    }
    if (customer) {
      this.customerId = customer.id
    }
    store.deliveries.push(this)
  }
  meal(){

  }
  customer(){

  }
}
let employerId = 0;
class Employer {
  constructor(name){
    this.id = ++employerId
    this.name = name
    store.employers.push(this)
  }
  employees(){

  }
  deliveries(){

  }
  meals(){

  }
  mealTotals(){

  }
}
