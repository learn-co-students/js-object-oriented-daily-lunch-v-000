let store = {customers:[], employers:[], meals: [], deliveries:[]}
let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0

class Customer {
  constructor(name, employer){
      customerId += 1
      this.name = name
      this.id = customerId
      this.employerId = employer && employer.id
      store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => this.id === delivery.customerId)
  }
  meals(){
    return this.deliveries().map(delivery => {return delivery.meal()})
  }
  totalSpent(){
    return this.meals().reduce(function (sum, meal){
      return sum + meal.price;
    }, 0);
  }
}

class Meal {
  constructor(title, price){
    mealId += 1
    this.title = title
    if (price){
      this.price = price
    }
    this.id = mealId
    store.meals.push(this)
  }
  static byPrice(){
    return store.meals.sort((meal1, meal2) => {return meal1.price < meal2.price})
  }
  deliveries(){
    return store.deliveries.filter(delivery => this.id === delivery.mealId)
  }
  customers(){
    return store.deliveries.map(delivery => delivery.customer())
  }
}

class Delivery {
  constructor (meal, customer){
    this.mealId = meal && meal.id
    this.customerId = customer && customer.id
    deliveryId += 1
    this.id = deliveryId
    store.deliveries.push(this)
  }
  customer(){
    return store.customers.find(customer => customer.id === this.customerId)
  }
  meal(){
    return store.meals.find(meal => meal.id === this.mealId)
  }
}

class Employer {
  constructor (name){
    employerId += 1
    this.name = name
    this.id = employerId
    store.employers.push(this)
  }
  employees(){
    return store.customers.filter(customer => customer.employerId === this.id)
  }
  deliveries(){
  let res = []
   this.employees().forEach(e => {
     e.deliveries().forEach(d => res.push(d))
   })
   return res
  }
  meals(){
    let res = this.deliveries().map(delivery => delivery.meal())
    let sorted = res.sort(function(a, b) {
      if(a.id > b.id) {
        return 1
      } else if(a.id < b.id) {
        return -1
      } else {
        return 0
      }
    })

    return sorted.filter(function(el, index) {
      if(index === sorted.length - 1) {
        return true
      } else {
        return el.id !== sorted[index + 1].id
      }
    })
  }

  mealTotals() {
    let arr = this.deliveries().map(delivery => delivery.meal())

    return arr.reduce((acc, meal) => {
      if(!acc[meal.id]) {
        acc[meal.id] = 1
      } else {
        acc[meal.id]++
      }
      return acc
    }, {})
  }
}
