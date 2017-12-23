let store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0
class Customer {
  constructor (name, employer){
    this.id = ++customerId
    this.name = name
    if (employer){
      this.employerId = employer.id
    }
    store.customers.push(this)
  }
  setEmployer(employer){
    this.employerId = employer.id
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }
  meals(){
    return this.deliveries().map(function (delivery){
      return delivery.meal()
    })
  }
  totalSpent(){
    return this.meals().map(function (meal){
      return meal.price
    }).reduce(function (a,b){
      return a+b
    }, 0);
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
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }
  customers(){
    return this.deliveries().map(function (delivery){
      return delivery.customer()
    })
  }
  static byPrice(){
    return store.meals.sort(function (meal1, meal2){
      return meal2.price - meal1.price;
    })
  }
}

let deliveryId = 0
class Delivery {
  constructor (meal, customer){
    this.id = ++deliveryId
    if(meal){
      this.mealId = meal.id
    }
    if(customer) {
      this.customerId = customer.id
    }

    store.deliveries.push(this)
  }
  setMeal(meal){
    this.mealId = meal.id
  }
  setCustomer(customer){
    this.customerId = customer.id
  }
  meal(){
    return store.meals.find(meal =>{
      return meal.id === this.mealId
    })
  }
  customer(){
    return store.customers.find(customer =>{
      return customer.id === this.customerId
    })
  }
}

let employerId = 0
class Employer {
  constructor (name){
    this.id = ++employerId
    this.name = name
    store.employers.push(this)
  }
  employees(){
    return store.customers.filter(customer =>{
      return customer.employerId === this.id
    })
  }

  deliveries(){ // [[employee.deliveries()]. []. ]
    let deliveryArrays = this.employees().map(function (employee){
      return employee.deliveries()
    });
    return [].concat.apply([], deliveryArrays)
  }

  meals(){
    let seen = {}
    return this.deliveries().map(function (delivery){
      return delivery.meal()
    }).filter(function(meal){
      let k = meal.id
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
  }

  allMeals(){
    return this.deliveries().map(function (delivery){
      return delivery.meal()
    })
  }

  mealTotals(){

    let meals = {}
    this.allMeals().forEach(function (meal){
      if (meals[meal.id] === undefined){
        meals[meal.id] = 1
      }
      else if (meals[meal.id]){
        meals[meal.id] += 1
      }
    })
    console.log (meals)
    return meals
  }

}
