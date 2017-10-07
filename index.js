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

  deliveries() {
    return this.employees().map((employee) => {
      return employee.deliveries()[0];
    });
  };

  meals() {
    let allMeals = this.deliveries().map((delivery) => {
      return delivery.meal();
    });

    console.log(allMeals)
    let uniqueMeals = [...new Set(allMeals)];
    console.log(uniqueMeals)
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

    console.log(meals)
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
