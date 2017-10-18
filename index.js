let store = {deliveries: [], meals: [], employers: [], customers: []}
let deliveryId = 0
let mealId = 0
let employerId = 0
let customerId = 0

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId
    

    if (meal) {
      this.mealId = meal.id
    }

    if (customer) {
      this.customerId = customer.id
    }

    store.deliveries.push(this)
  }
     customer() {
       return store.customers.find(function(customer) {return customer.id === this.customerId}.bind(this))
      }
    
      meal() {
      return store.meals.find(function(meal){return meal.id === this.mealId}.bind(this))
      }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId

    store.meals.push(this)
  }
   
   deliveries() {
    return store.deliveries.filter(function(delivery) {return delivery.mealId === this.id}.bind(this))
   }

   customers() {
    return store.deliveries.map(function(delivery) {return delivery.customer()})
   }
  
  static byPrice() {
    return store.meals.sort(function(a,b) {return b.price - a.price})
  }
}


class Employer {
  constructor(name) {
    this.id = ++employerId
    this.name = name

    store.employers.push(this)
  }

  employees(){
   return store.customers.filter(function(customer) {return this.id === customer.employerId}.bind(this))
  }

  deliveries() {
    let allDeliveries = this.employees().map(function(customer) {return customer.deliveries()})
    let combinedDeliveries = [].concat.apply([], allDeliveries)
    return combinedDeliveries
  }

  meals() {
   return this.deliveries().map(function(delivery){
   return delivery.meal()}).filter(function(item, pos, arr) {return arr.indexOf(item) == pos})  
  }
  
  mealTotals() {
   let meals = this.deliveries().map(function(delivery) {return delivery.meal()})
   let allOrderedMeals = {}
    meals.forEach(function(meal) {
      if (allOrderedMeals[meal.id]) {
        allOrderedMeals[meal.id] ++
      } else {
        allOrderedMeals[meal.id] = 1
      }
    })
    return allOrderedMeals
  }
}

class Customer {
  constructor(name, employer = {}) {
    this.name = name
    this.employerId = employer.id
    this.id = ++customerId

    store.customers.push(this)
  }

  meals() {
    return this.deliveries().map(function(delivery) {return delivery.meal()})
  }

  deliveries() {
   return store.deliveries.filter(function(delivery) {return delivery.customerId === this.id}.bind(this))
  }

  totalSpent() {
    return this.meals().reduce(function(agg, meal) {return agg + meal.price}, 0)
  }
}