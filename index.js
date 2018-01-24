let store = {customers: [], meals: [], employers: [], deliveries: []}
// remember: deliveries consist of the customer and the meal being delivered

let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0

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
    return delivery.customer() === this
    })
  }

  meals(){
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

  static byPrice() {
    function compare(a, b){
      const priceA = a.price
      const priceB = b.price

      let comparison = 0;
      if (priceA > priceB) {
        comparison = 1;
      } else if (priceA < priceB) {
        comparison = -1;
      }
      return comparison * -1
    }

    return store.meals.sort(compare)
  }
}

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

    meal() {
      return store.meals.find(meal => {
        return meal.id === this.mealId
      })
    }

    customer() {
      return store.customers.find(customer => {
        return customer.id === this.customerId
      })
    }
}

class Employer{
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
    let allMeals = []
     allMeals =  this.deliveries().map(delivery => {
      return delivery.meal()
    })
    return [...new Set(allMeals)]
  }

  mealTotals() {
    let allMeals = []
     allMeals =  this.deliveries().map(delivery => {
      return delivery.meal()
    })

    let finishedList = {}
    allMeals.forEach(meal => {
      finishedList[meal.id] = 0
    })

    allMeals.forEach(function(meal) {
    finishedList[meal.id] += 1
    })

    return finishedList

    return mealPrices.reduce(function(total, price) {
      return total + price
    })
  }
}
