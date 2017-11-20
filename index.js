let store = {deliveries: [], customers: [], employers: [], meals: []}


let customerId = 0
class Customer {
  constructor (name, employer){
    this.name = name
    if (employer) {
      this.employerId = employer.id
    }
    this.id = ++customerId

    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(function(delivery){
      return delivery.customerId === this.id
    }.bind(this))
  }

  totalSpent(){
    return this.deliveries().reduce(function(agg, el, i, arr){
      return agg + el.meal().price
    }, 0)
  }

  meals(){
    // looks at all the deliveries in the store that belong to the user
    const userDeliveries = this.deliveries()

    let userMeals = userDeliveries.map(delivery => {
      return delivery.meal()
    })
    return userMeals
  }
}

let mealId = 0
class Meal {
  constructor (title, price){
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  deliveries(){
    const theMealId = this.id
    return store.deliveries.filter(delivery => {
      return delivery.mealId === theMealId
    })
  }

  customers(){
    let theDeliveries = this.deliveries()
    return theDeliveries.map(delivery => {
      // debugger
      return delivery.customer()
    })
  }

  static byPrice(){
    return store.meals.sort(function(meal1, meal2){
      return meal2.price - meal1.price
    })
  }
}

let deliveryId = 0
class Delivery {
  constructor (meal, customer) {
    this.id = ++deliveryId
    if(meal){
      this.mealId = meal.id
    }
    if(customer){
      this.customerId = customer.id
    }
    store.deliveries.push(this)
  }

  meal(){
    let theMealId = this.mealId
    return store.meals.find(function(meal){
      return theMealId === meal.id
    })
  }

  customer(){
    console.log('delivery.customer() is invoked')
    let theCustomerId = this.customerId
    return store.customers.find(function(customer){
      console.log(`inside customer find callback, this = ${this}`)
      return customer.id === theCustomerId
    })
  }
}

let employerId = 0
class Employer {
  constructor (name) {
    this.id = ++employerId
    this.name = name
    store.employers.push(this)
  }

  employees(){
    const self = this
    return store.customers.filter(customer => {
      return customer.employerId === self.id
    })
  }

  deliveries(){
    return this.employees().reduce(function(agg, el, i, arr){
      return [...agg, ...el.deliveries()]
    }, [])
  }

  meals(){
    let mealsArr =  this.employees().reduce(function(agg, el, i, arr){
      return [...agg, ...el.meals()]
    }, [])

    mealsArr = Array.from(new Set(mealsArr));
    return mealsArr
  }

  mealTotals(){
    let mealsArr =  this.employees().reduce(function(agg, el, i, arr){
      return [...agg, ...el.meals()]
    }, [])

    return mealsArr.reduce(function(agg, el, i, arr){
      // debugger
      if(Object.keys(agg).includes(el.id.toString())){
        // debugger
        agg[el.id]++
      } else {
        agg[el.id] = 1
      }
      // debugger
      return agg
    }, {})
  }
}
