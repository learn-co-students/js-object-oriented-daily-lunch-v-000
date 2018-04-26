let store = { deliveries: [], employers: [], customers: [], meals: [] };

let mealId = 0

class Meal {
    constructor(title, price){
      this.title = title
      this.price = price
      this.id = ++mealId
      store.meals.push(this)
    }

    deliveries() {
      return store.deliveries.filter(delivery => {
            return delivery.mealId == this.id
          })
    }

    customers(){
      return this.deliveries().map(delivery => {
        return delivery.customer()
      })
    }

    static byPrice() {
        return store.meals.sort( (meal1, meal2) => {
          return meal2.price - meal1.price
        })
    }

}

let customerId = 0
class Customer {
    constructor(name, employer = {}){
      this.id = ++customerId
      this.employerId = employer.id
      this.name = name
      store.customers.push(this)
    }

    meals() {
        return this.deliveries().map(delivery => {
          return delivery.meal()
        })
    }

    deliveries() {
      return store.deliveries.filter(delivery => {
            return delivery.customerId == this.id
      })
    }

    totalSpent() {
      return this.meals().reduce(function(sum, meal) {
      return sum + meal.price
      }, 0)
    }

}

let deliveryId = 0
class Delivery{
    constructor(meal = {} , customer = {} ){
        this.id = ++deliveryId
        this.mealId = meal.id
        this.customerId  = customer.id
        store.deliveries.push(this)
    }

    meal(){
      return store.meals.find(meal =>{
          return meal.id == this.mealId
        })
    }
    customer(){
      return store.customers.find(customer =>{
        return customer.id == this.customerId
      })
    }
  }

let employerId = 0
class Employer {
  constructor(name) {
    this.name = name;
    this.id = ++employerId;
    store.employers.push(this);
  }

  mealTotals() {
    let meals = []
    this.deliveries().map(delivery => {
      meals.push(delivery.meal())
    })
    let meallist = {}

    meals.forEach(function (meal) {
       meallist[meal.id] = 0
    });

    meals.forEach(function (meal) {
       meallist[meal.id] += 1
    });
    return meallist
  }


  employees() {
    return store.customers.filter(customer => {
      return customer.employerId == this.id;
    });
  }

  deliveries() {
    let customers = []
      this.employees().map(employee =>{
              customers.push(employee.id)
      })

      return  store.deliveries.filter(delivery=>{
        return customers.includes(delivery.customerId)
      })
      }

  meals() {
    let meals = []
    this.deliveries().map(delivery => {
      meals.push(delivery.meal())
    })
    return [...new Set(meals)];
  }

}
