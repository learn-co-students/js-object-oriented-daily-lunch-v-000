let store = {drivers: [],
  deliveries: [],
  meals: [],
  employers: [],
  customers: []}

  let deliveryId = 0
  class Delivery {
    constructor(mealId, customerId){
    this.id = ++deliveryId
    if(mealId){
      this.mealId = mealId.id
    }
    if(customerId){
      this.customerId = customerId.id
    }
    // insert the delivery to the store
    store.deliveries.push(this)
  }
  meal(){
    console.log(this.mealId)
    console.log(store.meals)
    console.log(store.meals[0].id)
    return store.meals.find(function(meal){
      return meal.id === this.mealId
    })
  }
  customer(){
    console.log(this.customerId)
    console.log(store.customers)
    console.log(store.customers[0].id)
    return store.customers.find(function(customer){
      return customer.id === this.customerId
    })
  }
}

let mealId = 0
class Meal {
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price
    // insert the meal to the store
    store.meals.push(this)
  }
  static byPrice(){
    return store.meals.sort(function(a, b){
      return b.price - a.price
    })
  }
}

let employerId = 0
class Employer {
  constructor(name){
    this.id = ++employerId
    this.name = name
    // insert the employer to the store
    store.employers.push(this)
  }
}

let customerId = 0
class Customer {
  constructor(name, employer){
    this.id = ++customerId
    this.name = name
    if(employer){
      this.employerId = employer.id
    }
    // insert the customer to the store
    store.customers.push(this)
  }
  setEmployer(employer){
    this.employerId = employer.id
  }
  totalSpent(){
    let meals = store.meals.filter(meal => {
      return store.deliveries.filter(delivery => {
        delivery.customer.id === this.id})
    })
    let total = 0
    for (let i = 0; i < meals.length; i++) {
          total += parseInt(meals[i].price, 10);
    }
    return Math.round(total)
  }
}
