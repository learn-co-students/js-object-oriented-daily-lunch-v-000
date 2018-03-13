let store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0

class Customer {
  constructor(name){
    this.id = ++customerId
    this.name = name
    store.customers.push(this)
  }
  meals () {
    return store.meals.filter(meal => {
      return meal.customerId === this.id
    })
  }
  totalSpent () {
    return this.meals().reduce(function(sum, price) {
      return sum + meal.price
    }, 0)
  }
}

let mealId = 0

class Meal {
  constructor(title, price, customer){
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
    if (customer) {
      this.customerId = customer.id
    }
  }
  static byPrice() {
    return store.meals.sort(function(meal1, meal2) {
      return meal2.price - meal1.price
    })
  }
}

let deliveryId = 0

class Delivery {
  constructor(){
    this.id = ++deliveryId
    store.deliveries.push(this)
  }
}

let employerId = 0

class Employer {
  constructor(name){
    this.id = ++employerId
    this.name = name
    store.employers.push(this)
  }
}
