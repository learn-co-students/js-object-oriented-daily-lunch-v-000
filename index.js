let store = {customers: [], meals: [], deliveries: [], employers: []}
let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

class Customer {
  constructor(name, employer) {
    this.name = name;
    this.employer = employer;
    this.id = ++customerId;
    store.customers.push(this)
  }

  meals() {
    let arr = this.deliveries().map(delivery => delivery.mealId)
    return(arr.map(custMeal => store.meals.find(meal => meal.id === custMeal)))
  }

  deliveries() {
    return(store.deliveries.filter(delivery => delivery.customerId === this.id))
  }

  totalSpent() {
    return(this.meals().reduce(function(sum, value) {
      return (sum + value.price)
    }, 0))
  }
}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId
    store.meals.push(this)
  }

  deliveries() {
    return(store.deliveries.filter(delivery => delivery.mealId === this.id))
  }

  customers() {
    let arr = this.deliveries().map(delivery => delivery.customerId)
    return(arr.map(cust => store.customers.find(customer => customer.id === cust)))
  }

  static byPrice() {
    return(store.meals.sort((a, b) => b.price - a.price))
  }
}

class Delivery {
  constructor(meal, customer) {
    !!meal ? this.mealId = meal.id : null;
    !!customer ? this.customerId = customer.id : null;
    this.id = ++deliveryId;
    store.deliveries.push(this)
  }

  customer() {
    return(store.customers.find(customer => customer.id === this.customerId))
  }

  meal() {
    return(store.meals.find(meal => meal.id === this.mealId))
  }
}

class Employer {
  constructor(name) {
    this.name = name;
    this.id = ++employerId
    store.employers.push(this)
  }

  employees() {
    return(store.customers.filter(customer => customer.employer.id === this.id))
  }

   deliveries() {
    let arr = [];
    this.employees().map(employee => arr.push(employee.deliveries()))
    return(arr.reduce((a, b) => a.concat(b), []))
   }

   meals() {
     let arr = this.deliveries().map(delivery => delivery.meal());
     return([...new Set(arr)])
   }

   mealTotals() {
     let arr = this.deliveries().map(delivery => delivery.meal());
     let mealCount = {};
     arr.forEach(function(meal) {
       mealCount[meal.id] = (mealCount[meal.id]||0) + 1;
     });
    return(mealCount);
    }
}
