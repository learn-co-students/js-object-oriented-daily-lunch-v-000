let store = {
  deliveries: [],
  meals: [],
  employers: [],
  customers: [],
};

let mealId = 0;
let deliveryId = 0;
let employerId = 0;
let customerId = 0;

class Meal{
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;

    store.meals.push(this);
  }

  static byPrice(){
    return store.meals.sort(function(a, b){
      return b.price - a.price;
    })
  }

  deliveries(){
    return store.deliveries.filter(function(delivery){
      return delivery.mealId === this.id;
    }.bind(this))
  }

  customers(){
    return this.deliveries().map(function(delivery){
      return delivery.customer();
    })
  }
}

class Delivery{
  constructor(meal, customer){
    if (meal){
      this.mealId = meal.id;
    }
    if (customer){
      this.customerId = customer.id;
    }
    this.id = ++deliveryId;

    store.deliveries.push(this);
  }

  customer(){
    return store.customers.find(function(customer){
      return customer.id === this.customerId;
    }.bind(this))
  }

  meal(){
    return store.meals.find(function(meal){
      return meal.id === this.mealId;
    }.bind(this))
  }
}

class Customer{
  constructor(name, employer){
    this.name = name;
    this.id = ++customerId;
    if (employer){
      this.employerId = employer.id;
    }

    store.customers.push(this);
  }

  deliveries(){
    return store.deliveries.filter(function(delivery){
      return delivery.customerId === this.id;
    }.bind(this));
  }

  meals(){
    return this.deliveries().map(function(delivery){
      return delivery.meal();
    })
  }

  totalSpent(){
    return this.meals().reduce(function(a, b){
      return a.price + b.price;
    })
  }
}

class Employer{
  constructor(name){
    this.name = name;
    this.id = ++employerId;

    store.employers.push(this);
  }

  employees(){
    return store.customers.filter(function(customer){
      return customer.employerId === this.id;
    }.bind(this));
  }

  deliveries(){
    let allDeliveries = this.employees().map(function(employee){
      return employee.deliveries();
    })
    return [].concat.apply([], allDeliveries);
  }

  meals(){
    let allMeals = this.deliveries().map(function(delivery){
      return delivery.meal();
    })
    return [...new Set(allMeals)]
  }

  mealTotals(){
    let orderedMeals = this.deliveries().map(function(delivery){
      return delivery.meal();
    })

    let mealCount = {};

    orderedMeals.forEach(function(meal){
      if (mealCount[meal.id]) {
        mealCount[meal.id] += 1;
      } else {
        mealCount[meal.id] = 1;
      }
    })

    return mealCount;
  }
}
