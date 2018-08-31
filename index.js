store = {
  meal: [has_many_customers],
  customers: [has_many deliveries, has_many meals through deliveries, belongs_to neighborhood],
  deliveries: [belongs_to meal, belongs_to customer, belongs_to neighborhood],
  neighborhoods: [has_many deliveries, has_many customers through deliveries, has_many meals through deliveries]
}

class Neighborhood{
  constructor(name){
    this.name = name
  }
  deliveries(){
    return store.deliveries.find(d => d.neighborhoodId === this.id);
  }
  customers(){
    this.deliveries().map(d => d.customerId === ?)
  }
  // meals(){
  //
  // }
}

let customerIdCounter = 0;
class customer{
  let total = 0;
  constructor(neighborhoodId, name){
    this.id = ++customerIdCounter;
    this.neighborhoodId = neighborhoodId;
    this.name = name;
  }

  deliveries(){
    return store.deliveries.map(d => d.id === ?)
  }
  meals(){
    return store.meals.map(m => m.id === ?)
  }
  totalSpent(){
    
  }
}

let mealIdCounter = 0;
class Meal{
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealIdCounter;
  }
  deliveries(){
    return store.deliveries.find(d => d.mealId === this.id);
  }
  customers(){
    this.deliveries().map(d => d.customerId === ?)
  }
  // static byPrice(){
  //   return
  // }
}

let deliveryIdCounter = 0;
class Delivery{
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryIdCounter;
  }
  meal(){
    return store.meals.find(m => m.id === this.mealId);
  }
  customer(){
    return store.customers.find(c => c.id === this.customerId);
  }
  neighborhood(){
    return store.neighborhoods.find(n => n.id === this.neighborhoodId);
  }
}
