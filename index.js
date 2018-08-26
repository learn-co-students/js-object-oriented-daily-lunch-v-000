// global datastore

let store = {
  neighborhoods: [],
  meals: [],
  customers: [],
  deliveries: []
};

let itemId = 0;

class Neighborhood {
  constructor(name) {
    this.id = itemId++
    this.name = name
    store.neighborhoods.push(this);
  }
  deliveries() {return store.deliveries} 
  customers() {return store.customers} 
  meals() {return store.meals}
  
  
}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = itemId++
    this.neighborhoodId = neighborhoodId
    this.name = name
    store.customers.push(this)
  }
  deliveries() {return store.deliveries.filter(d => {
    return d.customerId === this.id;
  })}
  meals() { 
    let dels = this.deliveries();
    let meals = dels.map(d => d.meal());
    return meals;
  }
  totalSpent() {
    let prices = this.meals().map(m => m.price);
    return prices.reduce((a, c) => {return a + c});
  }
}

class Meal {
  constructor(title, price) {
    this.id = itemId++
    this.title = title
    this.price = price
    store.meals.push(this)
  }
  deliveries() {return store.deliveries.filter(d => {
    return d.mealId === this.id;
  })}
  customers() {
    let dels = this.deliveries();
    let cust = dels.map(d => d.customer());
    return cust;
  }
  static byPrice() { 
   let meals = store.meals;
   console.log(meals.sort((a,b)=> {return b.price - a.price}))
   return meals.sort();
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = itemId++
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    store.deliveries.push(this)
  }
  meal() {return store.meals.find(m => {
    return m.id === this.mealId;
  })}
  customer() {return store.customers.find(c => {
    return c.id === this.customerId;
  })}
  neighborhood() {return store.neighborhoods.find(n => {
    return n.id === this.neighborhoodId;
  })}
}