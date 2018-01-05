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
  meals(){
    let filterArray = []
    this.mealsArray(filterArray)
    let uniqueArray = Array.from(new Set(filterArray))
    return uniqueArray
  }
  mealTotals(){
    console.log(store.meals)
    console.log(store.deliveries)
    console.log(store.customers)

    let filterArray = []
    this.mealsArray(filterArray)
    let mealsOrdered = {}
    let idMeal = filterArray[0].id
    let mealCount = 1
    for (let i = 1; i < filterArray.length; i++) {
        if (filterArray[i].id !== idMeal) {
          mealsOrdered[idMeal] = mealCount
          idMeal = filterArray[i].id
          mealCount = 1
          if (i === (filterArray.length - 1)) {
            mealsOrdered[idMeal] = mealCount
          }
        } else {
          mealCount += 1
        }
    }
    return mealsOrdered
  }
  mealsArray(filterArray){
    for (let i = 0; i < store.meals.length; i++) {
      for (let j = 0; j < store.deliveries.length; j++) {
        for (let k = 0; k < store.customers.length; k++) {
          if (store.deliveries[j].mealId === store.meals[i].id &&
              store.deliveries[j].customerId === store.customers[k].id &&
              store.customers[k].employerId === this.id) {
                filterArray.push(store.meals[i])
          }
        }
      }
    }
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
