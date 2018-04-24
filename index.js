let store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0;
class Customer {
  constructor(name, employer) {
    this.name = name;
    this.id = ++customerId;
    if (employer) {
      this.employerId = employer.id
    }
    store.customers.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => {return delivery.customerId === this.id})
  }
  meals() {
    let customerMealIds = [];
    this.deliveries().forEach(delivery => {customerMealIds.push(delivery.mealId)});
    return store.meals.filter(meal => {return customerMealIds.includes(meal.id)})
  }

  totalSpent() {
    return this.meals().reduce((a,b) => {  return a.price + b.price  })
  }
}

let mealId = 0;
class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => {return delivery.mealId === this.id})
  }
  customers() {
    let customerIds = [];
    this.deliveries().forEach(delivery => {customerIds.push(delivery.customerId)});
    return store.customers.filter(customer => {return customerIds.includes(customer.id)})
  }
  static byPrice() {
    return store.meals.sort(function(a,b) {return b.price - a.price})
  }
}

let deliveryId = 0;
class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId;
    if (meal) {
      this.mealId = meal.id;
    }
    if (customer) {
      this.customerId = customer.id;
    }
    store.deliveries.push(this)
  }
  customer() {
    return store.customers.find(customer => {return customer.id === this.customerId})
  }
  meal() {
    return store.meals.find(meal => {return meal.id === this.mealId})
  }
}

let employerId = 0;
class Employer {
  constructor(name) {
    this.name = name;
    this.id = ++ employerId;
    store.employers.push(this)
  }
  employees() {
    return store.customers.filter(customer => {return customer.employerId === this.id})
  }
  deliveries() {
    let employeeDeliveryIds = []
    this.employees().forEach(employee => {employeeDeliveryIds.push(employee.id)});
    return(store.deliveries.filter(delivery => {return employeeDeliveryIds.includes(delivery.customerId)}))
  }
  meals() {
    let employeeMealIds = [];
    //this.deliveries().forEach(delivery => {if (!employeeMealIds.includes(delivery.mealId)) {employeeMealIds.push(delivery.mealId)}});
    this.deliveries().forEach(delivery => {employeeMealIds.push(delivery.mealId)});
    //console.log(employeeMealIds);
    return store.meals.filter(meal => {return employeeMealIds.includes(meal.id)})
  }
  mealTotals() {
    let employeeMealIds = [];
    this.deliveries().forEach(delivery => {employeeMealIds.push(delivery.mealId)});
    let mealCount = {}
    for (let id of employeeMealIds) {
      if (!Object.keys(mealCount).includes(id.toString())) {
        mealCount[id] = 1
      } else {
        ++mealCount[id]
      }
    }
    return mealCount;
  }
}
