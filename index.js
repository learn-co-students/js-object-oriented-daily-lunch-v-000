let store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0

class Customer {
    constructor(name, employer = []) {
        this.id = ++customerId
        this.employerId = employer.id
        this.name = name
        store.customers.push(this)
    }

    meals() {
      return this.deliveries().map (delivery => {
        return delivery.meal()
    })
}

    deliveries() {
      return store.deliveries.filter(delivery => {
         return delivery.customerId === this.id
      })
}
    totalSpent() {
     return this.meals().reduce(function(sum, meal){
        return meal.price + sum
     }, 0)
    }

}

class Meal {
    constructor(title, price) {
        this.title = title
        this.price = price
        this.id = ++mealId
        store.meals.push(this)
    }

    deliveries() {
        return store.deliveries.filter(delivery => {
            return delivery.mealId === this.id
        })
    }

    customers() {
        return this.deliveries().map(delivery => {
            return delivery.customer()
        })
    }
   static byPrice() {
       return store.meals.sort((meal1, meal2) => {
       return meal1.price < meal2.price
    })
}
}

class Delivery {
    constructor(meal = {}, customer = {}) {
        this.id = ++deliveryId
        this.mealId = meal.id
        this.customerId = customer.id
        store.deliveries.push(this)
    }
    customer () {
        return store.customers.find(customer => {
            return customer.id === this.customerId
        })
    }

     meal () {
        return store.meals.find(meal => {
            return meal.id === this.mealId
        })
    }
}

class Employer {
    constructor(name) {
        this.name = name
        this.id = ++employerId
        store.employers.push(this)
    }
    employees() {
        return store.customers.filter(customer =>{
            return customer.employerId === this.id
        })
    }
    deliveries() {
        return store.deliveries.filter(delivery => {
            return delivery.customer().employerId === this.id
        });
    }
    meals(){
		  let myMeals = []
		  this.deliveries().forEach(delivery => {
			  if (!myMeals.includes(delivery.meal())) {
				myMeals.push(delivery.meal())
			}
		})
		return myMeals
	}

    mealTotals() {
        let allMeals= this.deliveries().map(delivery => {
            return delivery.meal()
        })
       let  mealTotal = {}
        allMeals.forEach(function(meal){
            mealTotal[meal.id] = 0
        } )
        allMeals.forEach(function(meal){
            mealTotal[meal.id] += 1
        } )
        return mealTotal
    }
}
