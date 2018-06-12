// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let costumerId = 0;
let deliveryId = 0;

class Neighborhood{

  constructor(name){
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id;
    });
  };

  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }

  meals(){
  const allMeals = this.customers().map(customer => customer.meals());
  const merged = [].concat.apply([], allMeals);
  return [...new Set(merged)];
  }
}

class Customer{

    constructor(name, neighborhoodId){
      this.id = ++costumerId;
      this.name = name;
      this.neighborhoodId = neighborhoodId;
      store.customers.push(this)
    }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  };

  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }

  totalSpent(){
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
  }

}

class Meal{

  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers() {
    const allCustomers = this.deliveries().map(delivery => delivery.customer());
    return [...new Set(allCustomers)];
  }

  static byPrice(){
    return store.meals.sort((a, b) => a.price < b.price);
  }

}

class Delivery{

  constructor(mealId, neighborhoodId, customerId){
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }

  customer(){
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
  }

  meal(){
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
  }

  neighborhood(){
    return store.neighborhoods.find(neighborhood => neighborhood.id = this.neighborhoodId)
  }

}
