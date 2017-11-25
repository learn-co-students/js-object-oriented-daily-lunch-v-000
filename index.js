let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

const store = {customers: [], meals: [], deliveries: [], employers: []}

class Customer {
  constructor(name, employer){
    this.id = ++customerId;
    this.name = name;
    if(employer){
      this.employerId = employer.id;
    }

    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {return delivery.customerId === this.id})
  }

  meals(){
    return this.deliveries().map(delivery => delivery.meal())
  }

  totalSpent(){
    return this.meals().reduce( function(accum, meal){return accum + meal.price}, 0 )
  }
}

class Delivery {
  constructor(meal, customer){
    this.id = ++deliveryId;

    if(meal){
      this.mealId = meal.id;
    }

    if(customer){
      this.customerId = customer.id;
    }

    store.deliveries.push(this)
  }

  customer(){
    return store.customers.find(customer => {return customer.id === this.customerId})
  }

  meal(){
    return store.meals.find(meal => {return meal.id === this.mealId})
  }

}

class Meal {
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {return delivery.mealId === this.id})
  }

  customers(){
    return this.deliveries().map(delivery => delivery.customer())
  }

  static byPrice() {
    return store.meals.sort(function(a, b){return b.price - a.price})
  }
}

class Employer {
  constructor(name){
    this.name = name;
    this.id = ++employerId;

    store.employers.push(this)
  }

  employees(){
    return store.customers.filter(customer => {return customer.employerId === this.id})
  }

  deliveries(){
    return store.deliveries.filter(delivery => {return delivery.customer().employerId === this.id})
  }

  all_meals(){
    return this.deliveries().map(delivery => {return delivery.meal()})
  }

  meals(){
    return this.all_meals().filter(function(item, i, ar){return ar.indexOf(item) === i;});
  }

  mealTotals(){
    const mealCount = {}
    const meals = this.all_meals()

    meals.forEach(function(meal){
      if(mealCount[meal.id]){
          mealCount[meal.id]++;
        } else {
          mealCount[meal.id] = 1;
        }}
    )

    return mealCount;
  }
}
