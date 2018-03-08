let store = {deliveries:[], meals:[], employers: [], customers: []}
let idDelivery = 0
let idMeal = 0
let idEmployee = 0
let idCustomer = 0

class Delivery {
  constructor(meal,customer) {
  this.id = idDelivery++
  if (meal) {
    this.mealId = meal.id
  }
  if (customer) {
    this.customerId = customer.id
  }
  store.deliveries.push(this)
  }

  customer() {
    const customerId = this.customerId
    return store.customers.find(function(customer) {
      return customer.id === customerId
    })
  }

  meal () {
    const mealId = this.mealId
    return store.meals.find(function(meal) {
      return meal.id === mealId
    })
  }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = idMeal++
    store.meals.push(this)
  }

  static byPrice() {
    return store.meals.sort(function (a, b) {return b.price - a.price});
  }

  deliveries() {
    const mealid = this.id
    return store.deliveries.filter(function (delivery) {
      return delivery.mealId === mealid })
  }


  customers() {
    return store.customers.filter(function(customer) {
      return this.indexOf(customer) < 0
    }, this.deliveries().map(function(element) {
    return element.customerId }))
  }

}

class Employer {
  constructor(name) {
    this.name = name
    this.id = idEmployee++
    store.employers.push(this)
  }

  employees() {
    const employeeId = this.id
    const pop = store.customers.filter(function (customer) {
      return customer.employerId === employeeId
    })
    //console.log('this is employees', pop);
    return pop
  }

  deliveries () {
    let newDeliveries = []
     this.employees().forEach(employee =>{
       employee.deliveries().forEach(delivery =>{
         newDeliveries.push(delivery)
       })
     })
     return newDeliveries
  }

  meals () {
    const meals = this.deliveries().map(function (delivery) {
      return delivery.meal()
    })
    return Array.from(new Set(meals))
  }

  mealTotals () {
    const meals = this.deliveries().map(function (delivery) {
      return delivery.meal()
    })
    let counts = {}
    meals.forEach(function(meal) { counts[meal.id] = (counts[meal.id] || 0)+1; })
    return counts
  }

}

class Customer {
  constructor(name, employer) {
    this.name = name
    this.id = idCustomer++
    if (employer) {
      this.employerId = employer.id
    }
    store.customers.push(this)
  }

  totalSpent () {
    const customerId = this.id
    const deliveries = store.deliveries.filter(function(delivery) {
      return delivery.customerId === customerId
    })

  const meals = deliveries.map(delivery => {
    return delivery.meal()
  })

    function getSum(total, num) {
      return total + num;
    }

    return meals.map(meal => meal.price).reduce(getSum)
  }

  deliveries() {
    const customerId = this.id
    return store.deliveries.filter(function(delivery) {
      return delivery.customerId === customerId
    })
  }

  meals() {
    return this.deliveries().map(function(delivery) {
      return delivery.meal()
    })
  }
}
