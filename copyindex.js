let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;


class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this); 
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => {
        return delivery.neighborhoodId === this.id;
    });
  }
  
  customers() {
    return store.customers.filter(customer => {
        return customer.neighborhoodId === this.id;
     });
  }
  
  meals() {
    let orderedMeals = this.deliveries().filter(delivery => {
        return delivery.meal();
      });
        return [...(new Set(orderedMeals.map(({ mealId }) => mealId)))];
    }
  }

class Customer {
  constructor(name, neighborhoodId){
    this.name = name;
    this.id = ++customerId;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => {
        return delivery.customerId === this.id;
    });
  }
  
  meals() {
    return this.deliveries().map(delivery => {
        return delivery.meal();
    });
  }
  
  totalSpent() {
    return this.meals().reduce(function(total, meal) {
      return meal.price + total;
    }, 0);
  }
}

class Meal {
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => {
        return delivery.mealId === this.id;
    });
  }
  
  customers() {
    return this.deliveries().map(
      function(delivery){
        return delivery.customer();
    });
  }
  
static byPrice() {
    return store.meals.sort(
      function(mealOne, mealTwo) {
      return mealTwo.price - mealOne.price;
    });
  }
}


class Delivery {
  constructor(neighborhoodId, customerId, mealId) {
  this.id = ++deliveryId;
  this.neighborhoodId = neighborhoodId;
  this.customerId = customerId;
  this.mealId = mealId;
  store.deliveries.push(this);
  }
  
  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
        return neighborhood.id === this.neighborhoodId;
    });
  }
  
  customer() {
    return store.customers.find(customer => {
        return customer.id === this.customerId;
    });
  }
  
  meal() {
    return store.meals.find(meal => {
        return meal.id === this.mealId;
    });
  }
}

///I have no idea why my solution won't work, given that it's exactly the same as someone else's solution that has no errors!!!!!!!!!!!