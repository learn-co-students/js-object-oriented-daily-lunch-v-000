// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

//Relationships
  //Meal has_many customers
  //Customer belongs_to a meal, customer has a mealId

  //Deliver belongs_to: meal,customer,neighborhood
    //Delivery has mealId,customerId,neighborhoodId

  //Delivery needs methods for the through relationship
      //meal()
      //customer()
      //neighborhood()??

  //A customer has many deliveries
  //A customer has many meals through deliveries
    //Customer has to have a meals() method
  //A customer belongs to a neighborhood
    //customer has neighborhoodId

  //A neighborhood has many deliveries
  //A neighborhood has many customers through deliveries
    //Neighborhood has to have a customers() method
  //A neighborhood has many meals through deliveries
    //Neighborhood has to havbe a meals() method

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;


class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this);
  };

//returns a list of all deliveries placed in a neighborhood
  deliveries(){
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
  };

  //returns all of the customers that live in a particular neighborhood
  customers(){
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  };

  //returns a unique list of meals that have been ordered in a particular neighborhood (you might want to do this one last)
  meals() {
    let thisNeighborhoodDeliveries = this.deliveries().map( delivery => delivery.meal() );

    console.log(thisNeighborhoodDeliveries);
    function onlyUnique(value, index, self) {
      //indexOf goes through the array(in order) looking for the value(object), when it hits that value(object) it stops and returns the index
      //for a repeated value, it stops at the first value, and never hits the second one, indexOf will always return the index of the first value of the repeated values
      //therefore if you a looping throuh the array with indexOf, and you are at an index past the first value, and you have a repeat value, the indexOf the value will not be the same as the actual index, therefore that value will not be added to the return array

      return self.indexOf(value) === index;
    }
    //A set is a collection of values which can be iterated upon in the order of insertion. A value in the set may only occur once; it is unique in the set’s collection.
    
    const uniqueValues = [...new Set(thisNeighborhoodDeliveries)];
    //return thisNeighborhoodDeliveries.filter(onlyUnique);
    return uniqueValues;

  };

}


class Customer {
  constructor(name,neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  };
  //returns all of the deliveries that customer has received
  deliveries() {
   return store.deliveries.filter(delivery => delivery.customerId === this.id);
  };

//returns all meals that a customer has ordered
//this gets all of the deliveries for a customer, then returns a new array of the meals associated with those deliveries
  meals(){
    return this.deliveries().map( delivery => delivery.meal() );
  };

  //returns the total amount that the customer has spent on food.
  totalSpent(){
    // all the meals a customer has ordered
    // reduce this array down to the sum of the price of the meals
    const reducer = function (agg,el,i,arr) {
	      return agg + el.price;
      };
    let customerMeals = this.meals();
    return customerMeals.reduce(reducer,0);
  };

}

class Meal {
  constructor(title,price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price
    store.meals.push(this);
  };

//returns all of the deliveries associated with a particular meal
  deliveries() {
   return store.deliveries.filter(delivery => delivery.mealId === this.id);
  };

//returns all of the customers who have had the meal delivered
//this gets all of the deliveries associated witha meal, then returns a new array of the customers associated with those deliveries
  customers(){
    return this.deliveries().map( delivery => delivery.customer() );
  };

//A class method that orders all meal instances by their price in descending order. Use the static keyword to write a class method.
  static byPrice(){
    const numSorter = function(meal1,meal2){
      return meal2.price - meal1.price;
    };
    return store.meals.sort(numSorter);
  };
}

class Delivery {
  constructor(mealId,neighborhoodId,customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  };

  neighborhood() {
   return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
 }

//returns the meal associated with a particular delivery
  meal(){
    return store.meals.find(meal => meal.id === this.mealId);
  };

// returns the customer associated with a particular delivery
  customer(){
    return store.customers.find(customer => customer.id === this.customerId);
  };

}
