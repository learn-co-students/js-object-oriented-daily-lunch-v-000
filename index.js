let store ={meals:[], deliveries:[], customers:[], employers: []}
let mealId = 0
let deliveryId = 0
let customerId = 0
let neighborhoodId = 0
let employerId = 0

class Meal{
  constructor(title,price = 0){
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }
  
  static byPrice(){
    return store.meals.sort(function(a, b){
      return b.price > a.price})
  }
  
  deliveries(){
    return store.deliveries.filter(deliv => deliv.mealId === this.id )
  }
  
  customers(){
   return this.deliveries().map(deliv => deliv.customer() )
  }
}

class Delivery{
  constructor(meal = {}, customer = {}, neighborhood = {}){
    this.id = ++deliveryId
    this.mealId = meal.id
    this.customerId = customer.id
    this.neighborhoodId = neighborhood.id

    store.deliveries.push(this)
  }
  
  customer(){
   return store.customers.find(customer => 
     customer.id === this.customerId
    )
  }
  
  meal(){
   return store.meals.find(meal => 
     meal.id === this.mealId
    )
  }
}

class Employer{
  constructor(name){
    this.id = ++employerId
    this.name = name
    store.employers.push(this)
  }
  
  employees(){
    return store.customers.filter(cust =>
    cust.employerId === this.id)
  }
  
  deliveries(){
    let delivs = this.employees().map(empl => {
      return empl.deliveries()
    })

    let merge = []
    delivs.forEach(del => {
      del.forEach(d => 
        merge.push(d)
      )
    })

  
    return merge
  }
  
  meals(){
    var meals = this.deliveries().map(d => d.meal())
    return meals.filter((v, i, a) => a.indexOf(v) === i)
  }
  
  mealTotals(){
    let allMeals = this.deliveries().map(delivery =>  delivery.meal());
    let totals = {}
    allMeals.forEach((m) => {
      if (totals[m.id]){
        totals[m.id] += 1 
      }else{
        totals[m.id] = 1 
      }
    })
    return totals
  }
}

class Customer{
  constructor(name, employer = {}){
    this.id = ++customerId
    this.name = name
    this.employerId = employer.id
    store.customers.push(this)
  }
  
  deliveries(){
    return store.deliveries.filter(deliv => deliv.customerId === this.id )
  }
  
  meals(){
    return this.deliveries().map(deliv => 
      deliv.meal())
  }
  
  totalSpent(){
    return this.meals().reduce((total, meal) => {return total + meal.price}, 0) 
  }
}

