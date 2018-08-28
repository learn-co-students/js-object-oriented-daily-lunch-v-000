// global datastore
 // meal has many customers
 
 // customer has many deliveries, has many meals through deliveries, belongs to a neighborhood, belongs to a neighborhood

 // deliveries belongs to a meal, belongs to a customer 

 // neighborhood has many deliveries, has many customers through delivers, has many meals through deliveries
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Neighborhood {
  //has many deliveries
  //has many cust through deliveries
  //has many meals through deliveries
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }
  deliveries() {
    //DONE all deliveries in a neighborhood
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id;
    });
  }
  customers() {
    //DONE all customers in a neighborhood
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id;
    });
  }

  meals() {
   
    const allMeals = this.customers().map(customer => customer.meals());
    
    return [...new Set(allMeals[0])];
    //returns unique list of meals that have been ordered in a neighborhood DO LAST neighborhood.deliveries (iterate for meals. )
   
  } 
}

 class Customer {
    //has many delivs
    //has many meals through deliveries
    //belongs to a neighborhood
    constructor(name, neighborhoodId) {
        this.name = name;
        this.neighborhoodId = neighborhoodId;
        this.id = ++customerId;
        store.customers.push(this);
      }
    deliveries() {
    //DONE all the customers deliveries
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
      });
    }
    meals(){
      // DONE all meals ordered
      return this.deliveries().map(delivery => {
      return delivery.meal();
      });
    }

    totalSpent() {
    // total amoutn spent on food 
  
     // return this.meals().reduce((a, b) => (a.price, b.price))
      return this.meals().reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)
    }   
 }

 class Meal {
  //has many customers, has many deliveries
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }
  deliveries() {
    //DONE all deliveries of a meal 
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    });
  }
  customers() {
    //DONE all who have had the meal deliered-- but unique customers, don't count them twice

    const allCustomers = this.deliveries().map(delivery => delivery.customer());
    return [...new Set(allCustomers)];
  }

  static byPrice() {
    //DONE class method -- sorts by their price, use static keyword to write a class method --gather all meal.price, sort them by
    return store.meals.sort((a,b) => a.price < b.price);
  }
}

 class Delivery {
  //belongs to a meal
  //belongs to a customer
  //belongs to a neighborhood

  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }
  meal() {
    //DONE meal assoc with this delivery
    return store.meals.find(meal => {
      return meal.id === this.mealId
      }); 
  }
  customer() {
    //DONE customer assoc with this delivery 
    return store.customers.find(customer => {
      return customer.id === this.customerId
      });
  }
  neighborhood() {
      //DONE neighb assoc with this delivery
    return store.neighborhoods.find(
      neighborhood => {
        return neighborhood.id === this.neighborhoodId;
      });
 
   }
 }