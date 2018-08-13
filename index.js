// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;

class Neighborhood {
    constructor (name) {
      this.name = name;
      this.id = ++neighborhoodId;
      store.neighborhoods.push(this);
    }
     deliveries() {
      return store.deliveries.filter(delivery => {
        return delivery.neighborhoodId === this.id;
      })
    }
     customers() {
      return store.customers.filter(customer => {
        return customer.neighborhoodId === this.id;
      })
    }
     meals() {
      const mealsArr = this.deliveries().map(delivery => {
        return delivery.meal();
      });
      return [...(new Set(mealsArr.map(({id}) => id )))];
    }
  }

let mealId = 0;

class Meal {
  constructor (title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
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
   static byPrice () {
    return store.meals.sort(function (a, b) {
      return b.price - a.price;
    })
  }
}

let customerId = 0;

const reduceSpentOnMeals = function (sum, meal) {
  return sum += meal.price;
};

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.id = ++customerId;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }
   deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    })
  }
  
  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    })
  }
   totalSpent() {
    return this.meals().reduce(reduceSpentOnMeals, 0);
  }
}
 let deliveryId = 0;
class Delivery {
  constructor (mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }
   customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    })
  }
   meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    })
  }
   neighborhood() {
    return store.neighborhoods.find(n => {
      return n.id === this.neighborhoodId;
    })
  }
} 

