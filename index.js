let store = {customers: [], deliveries: [], meals: [], employers: []}
let customerId = 0
let deliveryId = 0
let mealId = 0
let employerId = 0

class Customer {
  constructor (name, employer) {
    this.id = ++customerId;
    this.name = name;
    store.customers.push(this);
    if (employer) {
      this.employerId = employer.id
    }
  };

  deliveries () {
    return store.deliveries.filter(function(element){
      return element.customerId === this.id
    }.bind(this))
  }

  meals() {
    return this.deliveries().map(function(element) {
      return element.meal()
    })
  }

  totalSpent() {
    return this.meals().reduce(function(sum, element) {
      return sum + element.price
    }, 0)
  }
};

class Delivery {
  constructor (meal, customer) {
    this.id = ++deliveryId;
    store.deliveries.push(this);
    if (meal) {
      this.mealId = meal.id
    }
    if (customer) {
      this.customerId = customer.id
    }
  }

  customer() {
    return store.customers.find(function(element){
      return element.id === this.customerId
    }.bind(this))
  }

  meal () {
    return store.meals.find(function(element){
      return element.id === this.mealId
    }.bind(this))
  }
}

class Meal {
  constructor (title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  static byPrice() {
    return store.meals.sort(function(a,b){
      return b.price - a.price
    })
  }

  deliveries () {
    return store.deliveries.filter(function(element){
      return element.mealId === this.id
    }.bind(this))
  }

  customers() {
    return this.deliveries().map(function(element) {
      return element.customer()
    })
  }
}

class Employer {
  constructor (name) {
    this.name = name;
    this.id = ++employerId;
    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(function(element){
      return element.employerId === this.id
    }.bind(this))
  }

  deliveries() {
    return this.employees().reduce(function(all, element) {
      return all.concat(element.deliveries())
    }, [])
  }

  meals() {

    let empMeals = this.employees().reduce(function(all, element) {
      return all.concat(element.meals())
    }, [])

    return Array.from(new Set(empMeals));
  }

  mealTotals() {
    let empMeals = this.employees().reduce(function(all, element) {
      return all.concat(element.meals())
    }, [])

    let totals = {};

    empMeals.forEach(function(element) {
      if (totals[element.id] === undefined) {
        totals[element.id] = 1;
      } else {
        totals[element.id] += 1
      }
    });
    return totals;
  }
}
