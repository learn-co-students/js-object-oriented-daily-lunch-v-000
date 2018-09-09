// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

// Neighborhood class:
// new Neighborhood() - initialized with name. It returns an object that has attributes of id and name
// deliveries() - returns a list of all deliveries placed in a neighborhood
// customers() - returns all of the customers that live in a particular neighborhood
// meals() - returns a unique list of meals that have been ordered in a particular neighborhood (you might want to do this one last)

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    })
  }
   customers(){
     return store.customers.filter(customer => {
       return customer.neighborhoodId === this.id
     })
   }

//A value in the set may only occur once; it is unique in the set’s collection.
//const uniqueValues = [...new Set(sampleValues)]; 

  meals(){
    const allMeals = this.deliveries().map(delivery=>delivery.meal());
    return [...new Set(allMeals)];
   }
  }

  class Customer{
    constructor(name, neighborhood){
      this.id = ++customerId
      this.name = name
      this.neighborhoodId = neighborhood
      store.customers.push(this)
    }

    deliveries(){
      return store.deliveries.filter(delivery=>{
        return delivery.customerId === this.id
      })
    }

    meals(){
      return this.deliveries().map(delivery=>{
        return delivery.meal();
      })
    }
    //total amount customer has spent on food
    totalSpent(){
      return this.meals().reduce((a,b)=>(a += b.price), 0);
    }

  }

  class Meal{
    constructor(title, price){
      this.id = ++mealId
      this.title = title
      this.price = price
      //add meal to store
      store.meals.push(this)
    }
    //all deliveries certain meal
    deliveries(){
      return store.deliveries.filter(delivery=>{
        return delivery.mealId === this.id
      })
    }
    //all customers with meal delivers, each customer should appear only once
    customers(){
      const allCustomers = this.deliveries().map(delivery=>delivery.customer());
      return [...new Set(allCustomers)];
    }
    //class method -orders all meal instances by price (refer to ReadMe for help)
    static byPrice(){
      return store.meals.sort(function(a,b){
        return b.price-a.price
      });
    }
  }

  class Delivery{
  constructor(meal, neighborhood, customer){
    this.id = ++deliveryId
    this.mealId = meal
    this.neighborhoodId = neighborhood
    this.customerId = customer
    //add deliveries to store
    store.deliveries.push(this)
  }
  //returns meal associated with a deliver
  meal(){
    return store.meals.find(meal=>{
      return meal.id === this.mealId
    })
  }
  //returns customer associated with delivery
  customer(){
    return store.customers.find(customer=>{
      return customer.id === this.customerId
    })
  }
  //returns neighborhood associated with a delivery
  neighborhood(){
    return store.neighborhoods.find(neighborhood=>{
      return neighborhood.id === this.neighborhoodId
    })
  }
}
