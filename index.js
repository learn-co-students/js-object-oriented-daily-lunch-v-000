let store = {drivers: [],
  deliveries: [],
  meals: [],
  employers: [],
  customers: []
}

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
    const thisId = this.mealId
    return store.meals.find(function(meal){
      return meal.id === thisId
    })
  }
  customer(){
    const thisId = this.customerId
    return store.customers.find(function(customer){
      return customer.id === thisId
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
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }
  customers(){
    return store.customers.filter(customer => {
      return store.deliveries.filter(delivery => {
        customer.id === this.id && delivery.customerId === customer.id})
    })
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
  employees(){
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    })
  }
  deliveries(){
    // return store.deliveries.filter(delivery => {
    //   return store.customers.filter(customer => {
    //     delivery.customerId === customer.id && customer.employerId === this.id})
    // })
    let filterArray = []
    for (let i = 0; i < store.deliveries.length; i++) {
      for (let j = 0; j < store.customers.length; j++) {
        if (store.deliveries[i].customerId === store.customers[j].id && store.customers[j].employerId === this.id) {
          filterArray.push(store.deliveries[i])
        }
      }
    }
    return filterArray
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
  meals(){
    return store.meals.filter(meal => {
      return store.deliveries.filter(delivery => {
        delivery.customer.id === this.id})
    })
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
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
