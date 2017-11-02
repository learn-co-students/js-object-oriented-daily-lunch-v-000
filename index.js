let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0

let store = {customers: [], meals: [], deliveries: [], employers: []}

class Customer {
  constructor(name, employer) {
    this.name = name
    this.id = ++customerId
    if(employer) {
      this.employerId = employer.id
    }
    store.customers.push(this)
  }
  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    });
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  }
  totalSpent() {
    return this.meals().reduce(function (total, meal) {
      return total + meal.price;
    }, 0);
  }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId

    store.meals.push(this)
  }

  static byPrice() {
    return store.meals.sort((a,b)=> {
      return a.price < b.price;
    });
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    });
  }
  customers() {
    return store.customers.filter(customer => {
      return customer.meals();
    });
  }
}

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId
    if (meal) { this.mealId = meal.id; }
    if (customer) { this.customerId = customer.id; }

    store.deliveries.push(this)
  }
  meal() {
    return store.meals.find((meal) => { return meal.id === this.mealId})
  }
  customer() {
    return store.customers.find((customer) => { return customer.id === this.customerId})
  }
}

class Employer {
  constructor(name) {
    this.name = name
    this.id = ++employerId

    store.employers.push(this)
  }
  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id;
    });
  }
  meals() {
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    let uniqueMeals = [... new Set(allMeals)];
    return uniqueMeals;
  }
  deliveries() {
     let employerDeliveries = this.employees().map(customer => {
       return customer.deliveries();
     });
     const flatEmpDels = [].concat(...employerDeliveries);
    return flatEmpDels;
   }
   mealTotals() {
     let MealIds = this.deliveries().map(delivery => {
       return delivery.mealId;
     });

     let mealStats = {};
     MealIds.forEach(function(mealId) {
       mealStats[mealId] = 0;
     });

     MealIds.forEach(function(mealId) {
       mealStats[mealId] += 1;
     })
     return mealStats;
   }
}
