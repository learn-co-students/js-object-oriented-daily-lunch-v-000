let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

let store = { deliveries: [], employers: [], customers: [], meals: [] };

class Customer {
  constructor (name, employer = {}) {
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer.id;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId == this.id;
    });
   }

   meals() {
     return this.deliveries().map(delivery => {
       return delivery.meal();
     });
   }

   totalSpent() {
     return this.meals().reduce(function(sum, meal) {
       return sum + meal.price;
     }, 0);
   }
}

class Meal {
  constructor (title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }

  deliveries () {
    return store.deliveries.filter(delivery => {
      return delivery.mealId = this.id
    });
  }

  customers () {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    });
  }

  static byPrice () {
    return store.meals.sort((meal1, meal2) => {
      return meal1.price < meal2.price;
    });
  }
}

class Delivery {
  constructor(meal = {}, customer = {}) {
    this.mealId = meal.id;
    this.customerId = customer.id;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }
  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
  }
  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
  }
}


class Employer {
  constructor(name) {
    this.name = name;
    this.id = ++employerId;

    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    });
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customer().employerId === this.id
    });
  }

  meals() {
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });

    let uniqueMeals = Array.from(new Set(allMeals));
    return uniqueMeals;
  }

  mealTotals() {
    let meals = this.deliveries().map(delivery => {
      return delivery.meal();
    });

    let numberOfMeals;
    let mealTotals = {};

    for (const meal of meals) {
      numberOfMeals = mealTotals[meal.id];

      if (!numberOfMeals) {
        mealTotals[meal.id] = 1;
      }
      else {
        mealTotals[meal.id]++;
      }
    }

    return mealTotals;
  }
}
