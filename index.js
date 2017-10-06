let store = {deliveries: [], meals: [], employers: [], customers: []}

let deliveryId = 0

class Delivery {
  constructor(meal, customer){
    if (meal){
      this.mealId = meal.id
    }
    if (customer){
      this.customerId = customer.id
    }
    this.id = ++deliveryId

    store.deliveries.push(this)
  }
  meal(){
    return store.meals.find(meal => meal.id === this.mealId)
  }
  customer(){
    return store.customers.find(customer => customer.id === this.customerId)
  }
}

let mealId = 0

class Meal {
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = ++mealId

    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }
  customers(){
    return this.deliveries().map(delivery => delivery.customer())
  }
  
  static byPrice(){
    return store.meals.sort((a,b) => b.price - a.price)
  }
}

let employerId = 0

class Employer {
  constructor(name){
    this.name = name
    this.id = ++employerId

    store.employers.push(this)
  }
  employees(){
    return store.customers.filter(customer => customer.employerId === this.id)
  }
  deliveries(){
    const allDeliveries = this.employees().map(employee => employee.deliveries())
    const merged = [].concat.apply([], allDeliveries)
    return merged
  }
  meals(){
    const meals = this.deliveries().map(delivery => delivery.meal())
    const uniqueMeals =[...new Set(meals)] 
    return uniqueMeals
  }
  mealTotals(){
    let totals = {}
    const meals = this.deliveries().map(delivery => delivery.mealId)
    meals.forEach(meal => {totals[meal] = totals[meal] + 1 || 1})
    return totals
  }
}

let customerId = 0

class Customer {
  constructor(name, employer){
    this.name = name
    if (employer){
      this.employerId = employer.id
    }
    this.id = ++customerId

    store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }
  meals(){
    return this.deliveries().map(delivery => delivery.meal())
  }
  totalSpent(){
    return this.meals().reduce((sum, a, i, r) => sum += a.price, 0)
  }
}