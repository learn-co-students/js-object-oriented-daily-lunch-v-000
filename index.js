let store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0

function removeDuplicates(arr, key){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array
}

class Customer {
  constructor(name, employer){
    this.id = ++customerId
    this.name = name
    if (employer) {
      this.employerId = employer.id
    }
    store.customers.push(this)
  }

  meals() {
    return this.deliveries().map(delivery => {return delivery.meal()})
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  totalSpent() {
    let prices_arr = this.meals().map(meal => {return meal.price})
    return prices_arr.reduce(function(acc, current) {return acc + current})
  }

}


class Meal {
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }

  customers() {
    return this.deliveries().map(delivery => {return delivery.customer()})
  }

  static byPrice() {
    function compareNumbers(a, b) {
      return b.price - a.price;
    }
    return store.meals.map(meal => {return meal}).sort(compareNumbers)
  }
}

class Delivery {
  constructor(meal, customer){
    this.id = ++deliveryId
    if (meal) {
      this.mealId = meal.id
    }
    if (customer) {
      this.customerId = customer.id
    }

    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
  }
}

class Employer {
  constructor(name){
    this.id = ++employerId
    this.name = name
    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    })
  }

  deliveries() {
    let arr_deliveries = []
    this.employees().map(employee => {
      employee.deliveries().forEach(function(delivery) {
        arr_deliveries.push(delivery)
      })
    })
    return arr_deliveries
  }

  meals() {
    let meals_arr = this.deliveries().map(delivery => {return delivery.meal()})
    return removeDuplicates(meals_arr, 'title')
  }

  mealTotals() {
    let result = {}
    this.employees().map(employee => {
      employee.meals().forEach(function(meal) {
        if (result[meal.id]) {
          result[meal.id] += 1
        } else {
          result[meal.id] = 1
        }
      })
    })
    return result
  }
}
