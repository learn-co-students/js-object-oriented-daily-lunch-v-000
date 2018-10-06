let store = {
  customers: [],
  employers: [],
  meals: [],
  deliveries: []
}

let customerId, employerId, mealId, deliveryId, neighborhoodId
customerId = employerId = mealId = deliveryId = neighborhoodId = 0

class Neighborhood {

  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId
  }

  deliveries() {

  }

  customers() {

  }

  meals() {

  }

}

class Customer {

  constructor(name, employer) {
    this.name = name
    this.id = ++customerId
    this.employer = employer
    store.customers.push(this)
  }

  meals() {
    //return store.meals.filter(meal => {
    //  return meal.deliveries().id === this.deliveries().id
    //})
    const mealArray = []
    //console.log(delivArray)
    this.deliveries().forEach(function(element) {
      mealArray.push(element.meal())
    });
    //console.log(mealArray);
    return mealArray;

  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      //console.log(this)
      return delivery.customer() === this
    })
  }

  totalSpent() {
    let totals = []
    this.meals().forEach(function(meal) {
      totals.push(meal.price)
    })
    //console.log(this.meals)
    return totals.reduce(function(accumulator, currentValue) {
      return accumulator + currentValue;
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
    //console.log(this.deliveries())
    return store.customers.filter(customer => {
      //console.log(customer.deliveries())
      return customer.deliveries().id === this.deliveries().id
    })
  }

  static byPrice() {
    function compare(a,b) {
      if (a.price > b.price)
      return -1;
    if (a.price < b.price)
      return 1;
    return 0;
  };


    return store.meals.sort(compare);
    //console.log(store.meals[0])
  };

}

class Employer {
  constructor(name) {
    this.name = name
    this.id = ++employerId

    store.employers.push(this)
  }

  employees() {
    //console.log(this)
    return store.customers.map(customer => customer.employer === this ? customer : false)

  }

  deliveries() {

    return this.employees().map(employee => employee ? employee.deliveries() : false ).flat()

  }

  meals() {
    const mealsDupes = this.deliveries().map(delivery => delivery ? delivery.meal() : false).flat().filter(Boolean)
    //console.log(mealsDupes)
    return Array.from(new Set(mealsDupes))
  }

  mealTotals() {
    let totalCounts = {}
    const allMeals = this.deliveries().map(delivery => delivery.mealId)
    console.log(allMeals)

    allMeals.forEach(function(meal) {
      if (totalCounts[meal]) {
        totalCounts[meal] = totalCounts[meal] + 1
      } else {
        totalCounts[meal] = 1
      }

    })

    return totalCounts
    //debugger
    //this.deliveries().forEach(function(delivery) {
    //  return delivery.mealId
    //})
    //mealTotals.prototype.mealCount = function(mealId) {
    //  this.deliveries()
    //}
  }

}

class Delivery {
  constructor(meal = 0, customer = 0) {
    this.mealId = meal.id
    //this.neighborhoodId = neighborhoodId

    if(customer) {
      this.customerId = customer.id
    }
    this.id = ++deliveryId

    store.deliveries.push(this)
  }

  customer() {
    let idStore = this.customerId;
    return store.customers.find(function(customer){
      return customer.id === idStore
    })
  }

  meal() {
    let idStore = this.mealId;
    return store.meals.find(function(meal) {
      return meal.id === idStore
    })
  }
}
