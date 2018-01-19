let deliveryId = 0
let employerId = 0
let mealId = 0
let customerId = 0

let store = {employers: [], customers: [], meals: [], deliveries: []}

class Employer {
  constructor(name) {
    this.name = name
    this.id = ++employerId
    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(function(customer) {
      return customer.employerId === this.id
    }.bind(this))
  }

  deliveries() {
    const employeeCustomers = this.employees()
    let employerDeliveries = [].concat.apply([], employeeCustomers.map(function(customer) {
      return customer.deliveries()
    }))
    return employerDeliveries
  }

  meals() {
    //has many meals through deliveries
    const deliveryMeals = this.deliveries()
    let uniqueMeals = new Set()
    let employerMeals = [].concat.apply([], deliveryMeals.map(function(delivery) {
      return uniqueMeals.add(delivery.meal())
    }))
    return Array.from(uniqueMeals)
  }

  mealTotals() {
    let ids = []
    let mealCount = {}
    let employerDeliveries = this.deliveries()
    let employerMeals = [].concat.apply([], employerDeliveries.map(function(delivery) {
      return delivery.meal()
    })) //complete
    employerMeals.forEach(function(meal) {
      return ids.push(meal.id)
    })
    ids.forEach(function(v, i = 1){
      if (!mealCount[v]) {
        mealCount[v] = [i]
      }else{
        mealCount[v].push(i)
      }
    })
    for(const key in mealCount) {
      mealCount[key] = mealCount[key].length
    }
    return mealCount
  }//end of method

}


class Customer {
  constructor(name, employer ={}) {
    this.name = name
    this.id = ++customerId
    this.employerId = employer.id
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.customerId === this.id
    }.bind(this))
  }

  meals() {
    let meals = []
    const customerDeliveries = this.deliveries()
    customerDeliveries.forEach(function(delivery) {
      	meals.push(delivery.meal())
      })
    return meals
  }

  totalSpent() {
    let prices = []
    const customerMeals = this.meals()
    customerMeals.forEach(function(meal) {
      return prices.push((meal.price))
    })
    return prices.reduce(function(total = 0, price) {
      return total + price})
  }//method end
}//class end


class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.mealId === this.id
    }.bind(this))
  }

  customers() {
    return store.customers.filter(function(customer) {
      const mealDeliveries = this.deliveries()
      return mealDeliveries.filter(function(delivery) {
        return delivery.customerId === customer.id
      })
    }.bind(this))
  }

  static byPrice() {
    const mealPrices = store.meals.slice()
    mealPrices.sort(function(meal1, meal2) {
      return meal2.price - meal1.price
    })
    return mealPrices
  }
}//class end


class Delivery {
  constructor(meal = {}, customer = {}) {
    this.customerId = customer.id
    this.mealId = meal.id
    this.id = ++deliveryId
    store.deliveries.push(this)
  }

  customer() {
    return store.customers.find(function(customer) {
      return customer.id === this.customerId
    }.bind(this))
  }

  meal() {
    return store.meals.find(function(meal) {
      return meal.id === this.mealId
    }.bind(this))
  }

}
