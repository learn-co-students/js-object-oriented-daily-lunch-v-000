let store = {customers: [], deliveries: [], meals: [], employers: []}

let deliveryId = 0
class Delivery {
  constructor(meal = {}, customer = {}) {
    this.id = ++deliveryId;
    this.mealId = meal.id;
    this.customerId = customer.id;

    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    })
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    })
  }
}

let employerId = 0
class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;

    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(customer =>{
      return customer.employerId === this.id;
    })
  }

  deliveries() {
    return store.deliveries.filter(delivery =>{
      return delivery.customer().employerId === this.id
    });
  }

  meals() {
    let allMeals = this.deliveries().map(delivery =>{
      return delivery.meal();
    });
    let uniqueMeals = [...new Set(allMeals)];
    return uniqueMeals;
  }

  //should return {mealId#: #ordered, mealId#: #ordered, etc}
  mealTotals() {
    //collect all the meals from each of this employer's deliveries
    let allMeals = this.deliveries().map(delivery =>{
      return delivery.meal();
    });

    let mealsTally = {}

    //if mealId matches existing meal in tally, increment, otherwise set as 1
    allMeals.forEach(meal =>{
      if (mealsTally[meal.id]) {
        mealsTally[meal.id] ++
      } else {
        mealsTally[meal.id] = 1
      };
    });
    return mealsTally
  }


}

let customerId = 0
class Customer {
  //tell constructor to expect employer as object
  constructor(name, employer = {}) {
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer.id;

    store.customers.push(this);
    console.log(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    })
  }

  meals() {
    return this.deliveries().map (delivery => {
      return delivery.meal();
    });

  }

  totalSpent() {
    return this.meals().reduce((total, meal) => {
      return total + meal.price;
    }, 0);
  }
}

let mealId = 0
class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    })
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    })
  }

  static byPrice() {
    return store.meals.sort(function(mealA, mealB) {
      return mealB.price - mealA.price;
    })
  }

}
