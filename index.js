// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name){
    this.name = name
    this.id = ++neighborhoodId;

    store.neighborhoods.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    })
  };

  customers(){
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    })
  }
  meals(){
    let arr  =  this.deliveries().map( delivery => {
      return delivery.meal();
    })
    let unique_array = Array.from(new Set(arr))
    return unique_array;


  }
}

class Meal {
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;

    store.meals.push(this)
  }
  deliveries(){

    return store.deliveries.filter( delivery => {
      return delivery.mealId === this.id;

    })
  }
  customers(){
    return this.deliveries().map(delivery => {
      return delivery.customer();

    })

  }

  static byPrice(){
    return store.meals.sort(function(a, b){
      return b.price - a.price;
    });
  }

}
class Customer {
  constructor(name, neighborhoodId){
    this.name = name
    this.id = ++customerId;
    if (neighborhoodId){
      this.neighborhoodId = neighborhoodId;

    }

    store.customers.push(this)
  }

  setNeighborhood(neighborhood){
    this.neighborhoodId = neighborhood.id;
  }
  deliveries(){
    return store.deliveries.filter(delivery =>{return delivery.customerId === this.id})


  }
  meals(){
    return this.deliveries().map((delivery) => { return delivery.meal();})

  }

  totalSpent(){
    return this.meals().reduce(function(sum, meal) {
      return sum + meal.price;
    }, 0)
  }


}

class Delivery {
  constructor(mealId, neighborhoodId, customerId){

    this.id = ++deliveryId;
    if (mealId){
      this.mealId = mealId;

    }
    if (customerId){
      this.customerId = customerId;

    }
    if (neighborhoodId){
      this.neighborhoodId = neighborhoodId;

    }

    store.deliveries.push(this)
  }
  setMeal(meal){
    this.mealId = meal.id
  }
  setCustomer(customer){
    this.customerId = customer.id
  }
  setNeighborhood(neighborhood){
    this.neighborhoodId = neighborhood.id
  }

  meal(){
    return store.meals.find(meal => {
     return meal.id === this.mealId
   })
  }
  customer(){
   return store.customers.find( customer => customer.id === this.customerId)
  }
  neighborhood(){
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId
    })
  }
}
