
let store = {deliveries: [], meals: [], employers: [], customers: []}
let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0



class Customer{
  constructor(name, employer){
    this.id = ++customerId
    this.name = name
    if(employer){
      this.employer = store.employers.find(function(element){
      return element.id === employer.id
      })
    }
    store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter(function(delivery){
      return this.id === delivery.customerId
    }.bind(this))
  }
  meals(){
    return this.deliveries().map(function(delivery){
      return delivery.meal()
    })
  }
  totalSpent(){
    return this.meals().reduce(function(agg, elem){
      return agg.price + elem.price
    })
  }
}

class Meal{
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price

    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(function(delivery){
      return this.id === delivery.mealId
    }.bind(this))
  }
  customers(){
    return this.deliveries().map(function(delivery){
      return delivery.customer()
    })
  }
  static byPrice(){
    return store.meals.sort(function(a, b){
      return b.price - a.price
    })
  }
}

class Delivery{
  constructor(meal, customer){
    this.id = ++deliveryId
    if (meal){
      this.mealId = meal.id
    }
    if (customer) {
      this.customerId = customer.id 
    }
    store.deliveries.push(this)
  }
  meal(){
    // debugger
    return store.meals.find(function(element){
      return this.mealId === element.id 
    }.bind(this))
  }
  customer(){
    return store.customers.find(function(element){
      return this.customerId === element.id 
    }.bind(this))
  }
}

class Employer{
  constructor(name){
    this.name = name
    this.id = ++employerId
    store.employers.push(this)
  }
  employees(){
    return store.customers.filter(function(customer){
      return this === customer.employer
    }.bind(this))
  }
  deliveries(){
    return store.deliveries.filter(function(delivery){
      return delivery.customer().employer === this
    }.bind(this))
  }
  meals(){
    return this.deliveries().map(function(delivery){
      return delivery.meal()
    }).filter(function(meal, index, array){
      return array.indexOf(meal) === index
    })
  }
  mealTotals(){
    let mealObj = {}
    this.meals().map(function(meal){
      mealObj[meal.id] = meal.deliveries().length
    })
    return mealObj
  }
}