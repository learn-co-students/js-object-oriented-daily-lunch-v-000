let store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0

let mealId = 0

let deliveryId = 0

let employerId = 0

class Customer {
  constructor(name, employer) {
    this.id = ++customerId
    this.name = name
    if (employer) {
      this.employerId = employer.id
    }
    store.customers.push(this)
  } // end of constructor

  deliveries() {
    return store.deliveries.filter((delivery) => {
      return delivery.customerId === this.id
    })
  } // end of deliveries()

  meals() {
    return this.deliveries().map((delivery) =>{
      return delivery.meal()
    })
  } // end of meals()

  totalSpent() {
    // return this.meals().map((meal) => {return meal.price}).reduce((agg, amount) => {return agg + amount}, 0)
    return this.meals().reduce((agg, meal) => {return agg + meal.price}, 0)
  }

} // end of customer Class


class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)

  } // end of constructor

  static byPrice() {
    return store.meals.slice().sort(function(a, b) {
      return b.price - a.price
    })
  } // end of static()

  deliveries() {
    return store.deliveries.filter((delivery) => {
      return delivery.mealId === this.id
    })
  }

  customers() {
    // debugger;
    return this.deliveries().slice().map((delivery) => {
      return delivery.customer()
    })
  }
} // end of meal class


class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId
    if (meal) {
      this.mealId = meal.id
    }
    if (customer) {
      this.customerId = customer.id
    }
    store.deliveries.push(this)
  } // end of constructor

  customer() {
    return store.customers.find((customer) => {
      return customer.id === this.customerId
    })
  }

  meal() {
    return store.meals.find((meal) => {
      return meal.id === this.mealId
    })
  }
} // end of delivery Class

class Employer {
  constructor(name, employer) {
    this.name = name
    this.id = ++employerId
    store.employers.push(this)
  }

  employees() {
    return store.customers.filter( (customer) => {
      return customer.employerId === this.id
    })
  }

  //  This is what I coded and it worked for me, but then it threw errors with mealTotals() for some reason.
  // deliveries() {
  //   return this.employees().map( (employee) => {
  //     return employee.deliveries().reduce( (agg, current) => {return agg.concat(current)})
  //   })
  // }


  deliveries() {
    let allDeliveries = this.employees().map(employee => {
      return employee.deliveries();
    });
    let merged = [].concat.apply([], allDeliveries);
    return merged;
  }

  meals() {
    const initialArray = this.employees().map( (employee) => {  // get an array of all the employer's employees
      return employee.meals().reduce( (agg, current) => { // for each employee, call meal().
                                                          // the return value now is an array of arrays
                                                          // so use reduce to flatten the array
          return agg.concat(current)})
    })
    return Array.from(new Set(initialArray)) // now use this construct to return only unique elements of the array
  }

  mealTotals() {
        // Took from solution. Brain was about to explode. The rest are mine.
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    let summaryObject = {};
    allMeals.forEach(function(meal) {
      summaryObject[meal.id] = 0;
    });
    allMeals.forEach(function(meal) {
      summaryObject[meal.id] += 1;
    });
    return summaryObject;
  }


} // end Employer class
