let store = {customers:[], employers:[], meals:[], deliveries:[]};

let customer_id = 0;
let meal_id = 0;
let delivery_id = 0;
let employer_id = 0;

class Customer {
  constructor (name, employer){
    this.id = ++customer_id;
    this.name = name;
    if (employer) {
      this.employerId = employer.id;
    }
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(function (delivery) {
      return delivery.customerId === this.id;
    }.bind(this))
  }

  meals() {
    return this.deliveries().map(function (delivery) {
      return store.meals.find(function (meal) {
        return delivery.mealId === meal.id;
      })
    })
  }

  totalSpent() {
    return this.meals().reduce(function (agg, el) {
      return agg + el.price
    }, 0)
  }

}

class Meal {
  constructor (title, price){
    this.id = ++meal_id;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter(function (delivery) {
      return delivery.mealId === this.id;
    }.bind(this))
  }

  customers(){
    return this.deliveries().map(function (delivery) {
      return store.customers.find(function (customer) {
        return customer.id === delivery.customerId
      })
    })
  }

  static byPrice(){
    return store.meals.sort(function (meal1, meal2) {
      return meal2.price - meal1.price
    })
  }
}

class Delivery {
  constructor (meal, customer){
    this.id = ++delivery_id;
    if (meal) {
      this.mealId = meal.id;
    }
    if (customer){
      this.customerId = customer.id;
    }
    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find(function (meal) {
      return meal.id === this.mealId;
    }.bind(this))
  }

  customer(){
    return store.customers.find(function (customer) {
      return customer.id === this.customerId;
    }.bind(this))
  }
}

class Employer {
  constructor (name){
    this.id = ++employer_id;
    this.name = name;
    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(function (customer) {
      return customer.employerId === this.id;
    }.bind(this))
  }

  deliveries() {
    let del = [];
    this.employees().map(function (employee) {
      for(const delivery of store.deliveries) {
        if (delivery.customerId === employee.id) {
          del.push(delivery)
        }
      }
    })
    return del
  }

  meals() {
    let allMeals = this.deliveries().map(function (delivery) {
      return store.meals.find(function (meal) {
        return delivery.mealId === meal.id;
      })
    })
    return [...new Set(allMeals)]
  }

  mealTotals() {
    let count = {};
    this.deliveries().map(function (delivery) {
      count[delivery.meal().id] = (count[delivery.meal().id] || 0) + 1;
    })
    return count;
  }
}
