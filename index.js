let store = {deliveries: [], employers: [], customers: [], meals: []}

let mealId = 0

class Meal {
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter((delivery)=> {
      return delivery.mealId == this.id
    })
  }
  customers(){
    return this.deliveries().map((delivery)=> {
      return delivery.customer()
    })
  }
  static byPrice(){
    return store.meals.sort(function (meal1, meal2) {
      return meal2.price - meal1.price;
    })
  }
}

let customerId = 0
class Customer {
  constructor(name, employer = {} ){
    this.name = name;
    this.employerId = employer.id;
    this.id = ++customerId
    store.customers.push(this)
  }

  totalSpent(){
    return this.meals().reduce(function(sum, meal) {
      return sum + meal.price
    }, 0)
  }

  deliveries(){
    return store.deliveries.filter((delivery)=> {
      return delivery.customerId == this.id
    })
  }
  meals(){
    return this.deliveries().map((delivery)=> {
      return delivery.meal()
    })
  }
}


let deliveryId = 0
class Delivery {
  constructor(meal = {}, customer = {}){
    this.mealId = meal.id;
    this.customerId = customer.id;
    this.id = ++deliveryId
    store.deliveries.push(this)
  }
  meal(){
    return store.meals.find((meal) => { return meal.id === this.mealId })
  }
  customer(){
    return store.customers.find((customer) => { return customer.id === this.customerId })
  }
}

let employerId = 0
class Employer {
  constructor(name) {
    this.name = name;
    this.id = ++employerId;

    store.employers.push(this);
  }
  employees() {
      return store.customers.filter(customer => customer.employerId === this.id)
    }
    deliveries() {
      const allDeliveries = this.employees().map(employee => employee.deliveries())
      const merged = [].concat.apply([], allDeliveries)
      return merged
    }
    meals() {
      const meals = this.deliveries().map(delivery => delivery.meal())
      const uniqueMeals = [...new Set(meals)]
      return uniqueMeals
    }
    mealTotals() {
      let total = {}
      const meals = this.deliveries().map(delivery => delivery.mealId)
      meals.forEach(meal => {total[meal] = total[meal] + 1 || 1})
      return total
    }
  }