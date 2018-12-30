// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0

class Neighborhood{
  constructor(name){
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }

  deliveries(){
    return store.deliveries.filter(
      function(d){
        return d.neighborhoodId === this.id
      }.bind(this))
  }

  customers(){
    return store.customers.filter(
      function(d){
        return d.neighborhoodId === this.id
      }.bind(this))
  }

  allMeals(){
   return this.deliveries().map(function(d){
      return d.meal()
    }.bind(this))
  }

  meals() {
    // debugger;
    return this.deliveries()
    .map(delivery => delivery.meal())
    //
    .sort( (a,b) => a.id > b.id)
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    .filter((m, idx, meals) => idx === meals.indexOf(m))//
  }
}

class Customer{
  constructor(name, neighborhoodId){
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId
    store.customers.push(this)
  }

  deliveries(){
   return store.deliveries.filter(
      function(d){
       return d.customerId === this.id
      }.bind(this))
  }

  meals(){
    return this.deliveries().map(function(d){
      return d.meal()
    }.bind(this))
  }

  totalSpent() {
     const adder = (acc, m) => acc + m.price
    //  debugger;
     return this.meals().reduce(adder, 0)
   }

}

class Meal{
  constructor(title, price){
  this.title = title
  this.price = price
  this.id = ++mealId
  store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(function(d){
      return d.mealId === this.id
    }.bind(this))
  }

  customers(){
    return this.deliveries().map( function(d){
      return d.customer()
    }.bind(this))
  }

  static byPrice(){
    // debugger;
    //If no second argument is provided,
    //the slice will run from the index specified by the first argument to the end of the Array:
    return store.meals.slice(0).sort(function(a,b)
    //.sort() knows to not mess with the ordering.
    {return b.price - a.price})//If b.price is larger than a.price,
    //the subtraction operation will return a positive number,
    //which tells .sort() to reverse the order of num1 and num2
    //in the array. If num1 - num2 returns a negative number or 0,
    // debugger;//did not hit this debugger
 }
}

class Delivery{
  constructor(meal, neighborhood, customer){
    this.customerId = customer
    this.mealId = meal
    this.neighborhoodId = neighborhood
    this.id = ++deliveryId
    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find(
      function(m){
        return m.id === this.mealId
      }.bind(this))
  }

  customer(){
    return store.customers.find(
      function(c){
        return c.id === this.customerId
      }.bind(this))
  }

  neighborhood(){
    return store.neighborhoods.find(
      function(n){
        return n.id === this.neighborhoodId
      }.bind(this))
  }

}
//create new data to debugger in Visual Studio
new Neighborhood('blogsville');
new Neighborhood('needsville');
new Neighborhood('heaven');
new Customer('bob', 1);
new Customer('irma', 2);
new Customer('chastisty', 3);
new Meal('chicken sandwich', 5.5);
new Meal('beef sandwich', 5.5);
new Meal('fish sandwich', 5.5);
new Meal('fajita sandwich', 5.5);
new Delivery(1, 1, 1);
new Delivery(2, 2, 2);
new Delivery(3, 3, 3);
new Delivery(3, 2, 2);
new Delivery(2, 1, 3);
new Delivery(1, 3, 1);
new Delivery(2, 2, 2);
new Delivery(3, 2, 3);
new Delivery(1, 1, 1);
