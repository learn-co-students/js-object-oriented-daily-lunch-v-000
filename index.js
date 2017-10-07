let store = {meals: [], deliveries: [], customers: [], employers: []};

let mealId = 0;
class Meal {
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  };

  static byPrice(){
    return store.meals.sort(function(meal1, meal2) {
      return meal2.price - meal1.price;
      // sort by the highest
    });
  };

  deliveries() {
    return store.deliveries.filter((delivery) => {
      return delivery.mealId === this.id;
    });
  };

  customers() {
    return this.deliveries().map((delivery) => {
      return delivery.customer();
    });
  };
}

let deliveryId = 0;
class Delivery {
  constructor(meal, customer){
    this.id = ++deliveryId;

    if (meal) {
      this.mealId = meal.id
    };

    if (customer) {
      this.customerId = customer.id
    };

    store.deliveries.push(this);
  };

  meal(){
    return store.meals.find((meal) => {
        return meal.id === this.mealId;
    });
  };

  customer() {
    return store.customers.find((customer) => {
      return customer.id === this.customerId;
    });
  };
}

let employerId = 0;
class Employer {
  constructor(name){
    this.id = ++employerId;
    this.name = name;

    store.employers.push(this);
  };

  employees() {
    return store.customers.filter((customer) => {
      return customer.employerId === this.id;
    });
  };

  deliveries(){
    let array = []
    let allDeliveries = this.employees().map((employee)=> {
      return employee.deliveries();
    });

    let mergedArray = array.concat.apply(array, allDeliveries)
    // concat() merges two arrays into one array
    // apply() takes in an object and array for arguments
    // as allDeliveries is [[], []], apply will take it as an argument
    // and concat will merge the two arrays into => one []

    return mergedArray
  }

  meals() {
    let allMeals = this.deliveries().map((delivery) => {
      return delivery.meal();
    });

    let uniqueMeals = [...new Set(allMeals)];
    return uniqueMeals;
  };

  mealTotals() {
    let allMeals = this.deliveries().map((delivery) => {
      return delivery.meal();
    });

    let meals = {}

    //initialize key: value
    allMeals.forEach((meal) => {
      meals[meal.id] = 0;
    });

    //increment value whenever that key exists
    allMeals.forEach((meal) => {
      meals[meal.id] += 1
    });
    return meals;
  };
}

let customerId = 0;
class Customer {
  constructor(name, employer = {}){
    this.id = ++customerId;
    this.employerId = employer.id;
    this.name = name;

    store.customers.push(this);
  };

  deliveries() {
    return store.deliveries.filter((delivery) => {
      return delivery.customerId === this.id;
    });
  }

  meals() {
    return this.deliveries().map(function(delivery) {
      return delivery.meal();
    });
  }

  totalSpent() {
    return this.meals().reduce(function(agg, meal) {
      return agg.price + meal.price;
    });
  };
}
