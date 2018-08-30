// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0; 
let customerId = 0; 
let mealId = 0; 
let deliveryId = 0;  

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = neighborhoodId++;
    
    store.neighborhoods.push(this);
  }
  
  deliveries(){
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id); 
    }
  
  customers(){
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }
  
  meals() {
    let deliveryOfMeals = this.deliveries();
    
    let ans =  deliveryOfMeals.map(delivery => delivery.meal());
  
    return ans.filter((item,index,self) => self.indexOf(item) == index);
  }
}

class Customer {
  constructor(name, neighborhoodId){ 
    this.name = name; 
    this.neighborhoodId = neighborhoodId; 
    this.id = customerId++;
    
    store.customers.push(this);
  }
  
  deliveries() { 
    return store.deliveries.filter(delivery => delivery.customerId === this.id);
  }
  
  meals() { 
    return this.deliveries().map(delivery => delivery.meal());
  }
  
//maybe use reduce here   
  totalSpent() {
    return this.meals().reduce(((acc, meal) => acc + meal.price), 0);
  }
}

class Meal { 
  constructor(title, price){ 
    this.title = title; 
    this.price = price; 
    this.id = mealId++;
    
    store.meals.push(this);
  }
  
  deliveries(){ 
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  }
  
  customers(){
    return this.deliveries().map(delivery => delivery.customer());
  } 
  
  static byPrice(){ 
     return store.meals.sort((x, y) => x.price < y.price);
  }
} 

class Delivery { 
  constructor(mealId, neighborhoodId, customerId) { 
    this.mealId = mealId; 
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId; 
    this.id = deliveryId++; 
  
    store.deliveries.push(this);
  }
  
  meal() { 
    return store.meals.find(meal => meal.id === this.mealId);
  }
  
  customer() { 
    return store.customers.filter(customer => customer.id === this.customerId).shift();
  }
  
  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
  }
} 