let store = {deliveries: [], meals: [], employers: [], customers: []};

let deliveryId = 0;

class Delivery {
  constructor (meal, customer) {
    this.id = ++deliveryId

    if(customer) {
      this.customerId = customer.id
    }

    if(meal) {
      this.mealId = meal.id
    }

    store.deliveries.push(this)
  } 
  setCustome(customer){
    this.customerId = customer.id
  }

  setMeal(meal){
    this.mealId = meal.id
  }

  customer(){
    return store.customers.filter(customer => {
      return customer.id === this.customerId
    })[0]
  }

  customer(){
    return store.customers.filter(customer => {
      return customer.id === this.customerId
    })[0]
  }

  meal(){
    return store.meals.filter(meal => {
      return meal.id === this.mealId
    })[0]
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

  static byPrice() {
    const allMeals = store.meals

    allMeals.sort(function(a, b) {
      return b.price - a.price;
    })

    return allMeals
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    });
  }

  customers() {
    const allDeliveries = this.deliveries();

    let customerIds = []

    allDeliveries.forEach(function (delivery) {
      customerIds.push(delivery.customerId)
    })

    return store.customers.filter(customer => {
      return customerIds.includes(customer.id)
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

  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    })
  }

  deliveries() {
    let employeeIds = []
    this.employees().forEach(function (employee) {
      employeeIds.push(employee.id)
    })
    return store.deliveries.filter(delivery => {
      return employeeIds.includes(delivery.customerId)
    })
  }

  meals() {
    let mealIds = []

    this.deliveries().forEach(function (delivery) {
      mealIds.push(delivery.mealId)
    })

    return store.meals.filter(meal => {
      return mealIds.includes(meal.id)
    })

  }

  mealTotals() {
    let stat = {}
    let num = 1
    let keys = []
    this.deliveries().forEach(function (delivery) {

      if (!keys.includes(delivery.mealId)) {
        stat[delivery.mealId] = num
        keys.push(delivery.mealId)
      } else {
        stat[delivery.mealId] += num
      }
    })
    return stat
  }

}

let customerId = 0

class Customer {
  constructor(name, employer) {
    this.id = ++customerId
    this.name = name

    if(employer) {
      this.employerId = employer.id
    }

    store.customers.push(this)
  }

  totalSpent() {
    const mealsDelivered = store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    });

    let mealPrice = 0
    mealsDelivered.forEach( function (delivery){
      const id = delivery.mealId

      const theMeal = store.meals.find(function (meal) {
        return meal.id === id
      })
      mealPrice += theMeal.price
    });
    return mealPrice
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    });
  }

  meals() {
    const deliveries = this.deliveries();
    let mealIds = [];

    deliveries.forEach(function (delivery) {
      mealIds.push(delivery.mealId)
    })

    return store.meals.filter(meal => {
      return mealIds.includes(meal.id)
    })

  }

} //Customer
