// global datastore
class Store{
  static find(table, id){
    return store[table].find(
      function(row){return row.id === id}
    )
  }

  static Select_where(table, column, value){
    return store[table].filter(
      function(row){return row[column] === value}
    )
  }
}

let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodCounter = customerCounter = mealCounter = deliveryCounter = 0;

class Neighborhood{
  constructor(name){
    this.name = name;
    this.id = ++neighborhoodCounter;

    store.neighborhoods.push(this);
    return this;
  }

  deliveries(){ return Store.Select_where('deliveries', 'neighborhoodId', this.id) }
  customers(){  return Store.Select_where('customers',  'neighborhoodId', this.id) }
  meals(){
    return [...new Set(this.deliveries().map(delivery => delivery.meal()))]
  }
}

class Customer{
  constructor(name, neighborhoodId){
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerCounter;

    store.customers.push(this);
    return this;
  }

  deliveries(){
    return Store.Select_where('deliveries', 'customerId', this.id)
  }

  meals(){
    return this.deliveries().map(delivery => delivery.meal())
  }

  totalSpent(){
    return this.meals().reduce((a, b) => a + b.price, 0)
  }
}

class Meal{
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealCounter;

    store.meals.push(this);
    return this;
  }

  deliveries(){
    return Store.Select_where('deliveries', 'mealId', this.id);
  }

  customers(){
    return this.deliveries().map(delivery => delivery.customer());
  }

  static byPrice(){
    return store.meals.sort((a, b) => a.price - b.price).reverse();
  }
}

class Delivery{
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryCounter;

    store.deliveries.push(this);
    return this;
  }
  
  meal(){         return Store.find('meals',         this.mealId) }
  customer(){     return Store.find('customers',     this.customerId) }
  neighborhood(){ return Store.find('neighborhoods', this.neighborhoodId) }

}
