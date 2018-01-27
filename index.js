let store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0

class Customer {
  constructor(name, employer){
    this.id = ++customerId
    this.name = name
    if(employer){
    this.employerId = employer.id
  }


    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }

  totalSpent(){
   let mealPrices = this.meals().map(meal => {
     return meal.price
  })
   return mealPrices.reduce(function(total, price) {
    return total + price
  })
 }
}

let mealId = 0

class Meal {
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price


    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }

  static byPrice(){
   return store.meals.sort(function (meal1, meal2) {
     return meal2.price - meal1.price
   })
 }
}

let deliveryId = 0

class Delivery {
  constructor(meal, customer){
    this.id = ++deliveryId
    if(meal){
      this.mealId = meal.id
    }
    if(customer){
      this.customerId = customer.id
    }


    store.deliveries.push(this)
  }

  customer() {
  return store.customers.find(customer => {
    return customer.id === this.customerId
  })
}


  meal(){
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }
}

let employerId = 0

class Employer {
  constructor(name){
    this.id = ++employerId
    this.name = name


    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    })
  }

  deliveries() {
  return store.deliveries.filter(delivery => {
    return delivery.customer().employerId === this.id
   })
  }

  meals() {
 let meals = this.deliveries().map(delivery => {
    return delivery.meal()
  })
  let eachMeal = [...new Set(meals)]
  return eachMeal
 }

 mealTotals() {
  let count = {};
  this.deliveries().map(function (delivery) {
    count[delivery.meal().id] = (count[delivery.meal().id] || 0) + 1;
  })
  return count;
 }
}
