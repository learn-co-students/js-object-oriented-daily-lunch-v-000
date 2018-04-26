const store = {meals: [], deliveries: [], employers: [], customers: []}
let mealId = 0
let customerId = 0
let deliveryId = 0
let employerId = 0

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId
    store.deliveries.push(this)
    if(meal) {
      this.mealId = meal.id
    }
    if (customer) {
      this.customerId = customer.id
    }

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

class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  static byPrice() {
    return store.meals.sort(function(a, b){
        if(a.price > b.price) return -1;
        if(a.price < b.price) return 1;
        return 0;
    })
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId == this.id
    })
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }
}

class Customer {
  constructor(name, employer) {
    this.id = ++customerId
    this.name = name
    if (employer) {
      this.employerId = employer.id
    }
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }

  totalSpent() {
    return this.meals().reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.price;
    }, 0);
  }
}

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
    return store.deliveries.filter(delivery => {
      return delivery.customer().employerId === this.id
    })
  }

  meals() {
    let a = this.deliveries().map(delivery => {
      return delivery.meal()
    })

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    return a.filter( onlyUnique )
  }

  mealTotals() {
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });

    let totalsObject = {};

    allMeals.forEach(function(meal) {
      totalsObject[meal.id] = 0;
    });
    allMeals.forEach(function(meal) {
      totalsObject[meal.id] += 1;
    });

    return totalsObject;
  }
}
