let customerId = 0;
let deliveryId = 0;
let mealId = 0;
let employerId = 0;
let store = {customers: [], meals: [], employers: [], deliveries: []}

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId;
    if (meal) {
      this.mealId = meal.id;
    }
    if (customer) {
      this.customerId = customer.id;
    }

    store.deliveries.push(this);
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId)
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title
    this.price = price

    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {return delivery.mealId === this.id})
  }

  customers() {
    return this.deliveries().map(delivery => delivery.customer());
  }

  // static byPrice(){
  //   return store.meals.sort(function (meal1, meal2) {
  //     return meal1.price - meal2.price;
  //   });
  // }

}

class Customer {
  constructor(name, employer) {
    this.id = ++customerId;
    this.name = name;
    if (employer) {
      this.employerId = employer.id;
    }
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {return delivery.customer().id === this.id});
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }
}

class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;

    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(customer => {return customer.employerId === this.id});
  }

  deliveries() {
    // This method is returning nested array, dont think they like that...
    // return this.employees().filter(customer => customer.deliveries());
  }
}
