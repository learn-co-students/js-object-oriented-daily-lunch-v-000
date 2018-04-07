let store = {deliveries: [], meals: [], employers:[], customers: []}

let deliveryId = 0
class Delivery {
  constructor(meal, customer) {
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
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }

  customer(){
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
  }
}

let mealId = 0
class Meal {
  constructor(title, price) {
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
    return this.deliveries().map(function(delivery) {
      return delivery.customer()
    })
  }

  static byPrice() {
    return store.meals.slice().sort(function(a, b){
      return b.price - a.price
    })
  }
}

let employerId = 0
class Employer {
  constructor(name) {
    this.id = ++employerId
    this.name = name

    store.employers.push(this)
  }

  employees(){
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    })
  }

  deliveries() {
		let allDeliveries = this.employees().map((employee) => {
			return employee.deliveries()
		})

		let merged = [].concat.apply([], allDeliveries)
		return merged
	}

  meals(){
    let allMeals = this.employees().map((employee) => {
      return employee.meals()
    })

    let merged = [].concat.apply([], allMeals)
    return merged.filter(function(value, index, self) {
       return self.indexOf(value) === index
    })
  }

  mealTotals(){
    //create a store for allMeals where each key is a mealId
    let mealStore = {}
   // get all meals, repeats included
   let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    })

   //update the store with info from each employees meals
   for(const meal of allMeals) {
     let mealId = meal.id.toString()

     // if mealStore[mealId] exists, update value
     if (mealStore[mealId]) {
       mealStore = Object.assign({}, mealStore, mealStore[mealId]++)
     } else {
    // else, add mealStore[mealId] and value starts at 1
       mealStore = Object.assign({}, mealStore, mealStore[mealId] = 1)
     }
   }
   return mealStore
  }
}

let customerId = 0
class Customer {
  constructor(name, employer) {
    this.id = ++customerId
    this.name = name

    if (employer) {
      this.employerId = employer.id
    }

    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  meals(){
    return this.deliveries().map(function(delivery) {
      return delivery.meal()
    })
  }

  totalSpent(){
    return this.meals().reduce(function(total, meal) {
      return total + meal.price
    }, 0)
  }
}
