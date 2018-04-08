const store = { deliveries: [], employers: [], customers: [], meals: [] };
let mealId = 0, customerId = 0, deliveryId = 0, employerId = 0;

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  deliveries() {// return array all of the deliveries that include this particular meal
    return store.deliveries.filter(delivery => delivery.mealId == this.id);
  }
  customers() {//you already have all those deliveries, so just iterate thru and give the customer for each
    return this.deliveries().map(delivery => delivery.customer()); //gives array of customers who've ordered this meal
  }
  static byPrice() {
    return store.meals.sort((meal1, meal2) => meal1.price < meal2.price); //sort meals by desc. price
  }
}

class Customer {
  constructor(name, employer = {}) { //initialized with a name and inst. of employer
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer.id;
    store.customers.push(this);
  }
  deliveries() { /// return deliveries associated with this customer; i.e. this customer's deliveries
    return store.deliveries.filter(delivery => delivery.customerId == this.id);
  }

  meals() { //you already have the deliveried associated with this customer... so just iterate
    //through that array and return the meal associated with that delivery (another function)
    return this.deliveries().map(delivery => delivery.meal());
  }
  totalSpent() { //already have all the meals associated w/ a customer, from prev. fn. use reduce to sum
    //the price of each meal.
    return this.meals().reduce((sum, meal) => sum + meal.price, 0);
  }
}

class Delivery {
  constructor(meal = {}, customer = {}) { // init. with ins. of meal, customer
    this.id = ++deliveryId;
    this.mealId = meal.id;
    this.customerId = customer.id;
    store.deliveries.push(this);
  }
  meal() {// go through all meals, find the meal whose id matches the mealId of this delivery
    return store.meals.find(meal => meal.id === this.mealId);
  }
  customer() { //go through all customers and find the one whose id matched delivery's customerId
    return store.customers.find(customer => customer.id === this.customerId);
  }
}

class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;
    store.employers.push(this);
  }

  employees() {//go through all customers and return the ones who are employed by this employer, i.e.
    //whose employerId id matches the id of this employer
    return store.customers.filter(customer => customer.employerId == this.id);
  }
  deliveries() {
    //use fn above; return all employees of this employer (as array) and iterate over that to
    //give the deliveries associated w/ that employee/customer (w/ the fn in the customer class)
    //should get a 2D array, or array of arrays
    const totalDeliveries = this.employees().map(employee => employee.deliveries());
    // concat is an array prototype method. use apply so you have access to the 'this' (execution context)
    //for needed to call this method)
    // this 'this' that is needed if you wanna call the totalDeliveries fn/meth defined above
    //Using the apply method of concat will just take the second parameter as an array
    const concatTotalDeliveries = [].concat.apply([], totalDeliveries);
    return concatTotalDeliveries;
  }
  meals() {
    //use deliveries fn. defined above to return all deliveries associated w/ this employer.
    //may thru that array, returning the meal associated with that delivery
    //you get all meals associated with this employer
    const totalMeals = this.deliveries().map(delivery => delivery.meal());
    //get just the unique meals from above
    //The spread operator (...) turns an iterable into the arguments of a function or parameter call
    //could also do Array.from(new Set(totalMeals))
    //Set object lets you store unique values of any type
    const uniqueMeals = [...new Set(totalMeals)];
    return uniqueMeals;
  }
  mealTotals() {
    //doing the same as above. getting/going thru all deliveries for this employer, and
    //mapping out the meal for each delivery. so, an array of meals (not unique)
    const totalMeals = this.deliveries().map(delivery => delivery.meal());
    //create an empty object
    const mealTotalObject = {};
    //go through all meals (from above), and for each meal give the empty object a
    //key of the meal's id, that points to a value of zero (to start)
    totalMeals.forEach(meal => mealTotalObject[meal.id] = 0);
    //go through again, but for each key (which is the meal id), increment the value it points to
    //by one. this counts the number of time that each meal was ordered/delivered.
    totalMeals.forEach(meal => mealTotalObject[meal.id] += 1);
    return mealTotalObject;
  }
}
