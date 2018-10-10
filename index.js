// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.id = neighborhoodId++;
    this.name = name;
    store.neighborhoods.push(this);

    // console.log('N', store.neighborhoods[0]);
  }
  customers() {
    return store.customers.filter(customer => {return customer.neighborhoodId === this.id;
    });
  }

  deliveries() {
    return store.deliveries.filter(delivery => {return delivery.neighborhoodId === this.id;
    });
  }

  meals() {
    let uniqMeals = [];
      this.deliveries().filter(delivery => {uniqMeals.push(delivery.meal())});
        return [...(new Set(uniqMeals))];
  }
  // Removing Array Duplicates in ES6
  // [...(new Set(uniqMeals))]; used in meals method() above
  // const dupArr = [1, 1, 2, 3, 1];
  // const uniArr = [...(new Set(dupArr))];
  // console.log(uniArr);
};

class Customer {
  constructor(name, neighborhoodId) {
    this.id = customerId++;
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
    // console.log('custid', customerId, 'cust name', name);
    // console.log('customers', store.customers[0]);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {return delivery.customerId === this.id;});
  }

  meals() {
    return this.deliveries().map(delivery => {return delivery.meal()});
  }

  totalSpent() {
    return this.meals().reduce((total, meal) => (total + meal.price),0);
  }

};

class Meal {
  constructor(title, price) {
    this.id = mealId++;
    this.title = title;
    this.price = price;
    store.meals.push(this);

    // console.log('meals', store.meals[0]);
  }
  deliveries() {
    return store.deliveries.filter(delivery => {return delivery.mealId === this.id;});
  }

  customers() {
    return this.deliveries().map(delivery => {return delivery.customer()});
  }

  static byPrice() {
    return store.meals.sort((a,b) => a.price < b.price);
    // descending order is <, ascending is >
  }

};

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = deliveryId++;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);

    // console.log('deliveries', store.deliveries[0]);
  }

  customer() {
    return store.customers.find (customer => {return customer.id === this.customerId});
  }

  neighborhood() {
    return store.neighborhoods.find (neighborhood => {return neighborhood.id === this.neighborhoodId});
  }

  meal() {
    return store.meals.find (meal => {return meal.id === this.mealId});
  }

};


// let redHook;
// let guy;
// let marioBatali;
// let friedCheesecake;
// let macAndCheese;
// let flavortownDelivery;
// let guysAmericanDelivery;
// let guysDuplicateDelivery;
// let batalisDessert;
//
// redHook = new Neighborhood('Red Hook');
// guy = new Customer('Guy Fieri', redHook.id);
// marioBatali = new Customer('Iron Chef Mario Batali', redHook.id);
// friedCheesecake = new Meal('Fried Cheesecake', 30);
// macAndCheese = new Meal('Fried Macaroni and Cheese', 15);
// flavortownDelivery = new Delivery(friedCheesecake.id, redHook.id, guy.id);
// guysAmericanDelivery = new Delivery(macAndCheese.id, redHook.id, guy.id);
// guysDuplicateDelivery = new Delivery(macAndCheese.id, redHook.id, guy.id);
// batalisDessert = new Delivery(friedCheesecake.id, redHook.id, marioBatali.id);
// upperEast = new Neighborhood('Upper East Side');
// bigSpender = new Customer('DJ MoneyBags', upperEast.id);
// lobster = new Meal('lobster', 500);
// turducken = new Meal('turducken', 750);
// fancyPizza = new Meal('fancy pizza', 600);
// deliveryOne = new Delivery(lobster.id, upperEast.id, bigSpender.id);
// deliveryTwo = new Delivery(turducken.id, upperEast.id, bigSpender.id);
// deliveryThree = new Delivery(fancyPizza.id, upperEast.id, bigSpender.id);
// deliveryFour = new Delivery(fancyPizza.id, upperEast.id, bigSpender.id);
//
// console.log('customer:', batalisDessert.customer().name);
// console.log('meal:',batalisDessert.meal().title);
// console.log('meal price:',batalisDessert.meal().price);
// console.log('neighborhood:', batalisDessert.neighborhood().name);
// console.log('meal sort by price', Meal.byPrice());
// console.log('total spent', bigSpender.totalSpent());
// console.log('uniqMeals', upperEast.meals());
