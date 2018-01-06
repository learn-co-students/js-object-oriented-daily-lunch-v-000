let store = { deliveries: [], employers: [], customers: [], meals: [] };

let deliveryId = 0;
class Delivery {
  constructor(meal={}, customer={}) {
    this.mealId = meal.id;
    this.customerId = customer.id;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

  meal() {
   return store.meals.find(meal => {
     return meal.id === this.mealId;
   });
 }
 customer() {
   return store.customers.find(customer => {
     return customer.id === this.customerId;
   });
 }

}

let mealId = 0;
class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  static byPrice() {
    return store.meals.sort((meal1, meal2) => {
      return meal1.price < meal2.price;
    });
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId == this.id;
    });
  }

  customers() {
    return this.deliveries().map(delivery => {
       return delivery.customer();
     });
  }

}

let employerId = 0;
class Employer {
  constructor(name){
    this.name = name;
    this.id = ++employerId;
    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(customer => {
      return customer.employerId == this.id;
    });
  }

  deliveries() {
    let allDeliveries = [];
    this.employees().map(employee => {
      allDeliveries.push(employee.deliveries());
    });

    let deliveries = [].concat.apply([], allDeliveries);
    return deliveries;
  }

  meals() {
    let allMeals = [];
    this.employees().map(employee => {
      allMeals.push(employee.meals());
    });

    let meals = [].concat.apply([], allMeals);
    let uniqueMeals = [...new Set(meals)]

    return uniqueMeals;
  }

  mealTotals() {
  let mealTotalObject = {};
    this.meals().map(meal1 => {
      console.log(meal1);

       let mealCount = 0;
       this.employees().map(employee => {
         console.log(employee);

         employee.meals().filter(meal2 => {
           if (meal2 === meal1) {
             mealCount++;
             console.log(mealCount);
           }
         });
         mealTotalObject[meal1.id] = mealCount;
       });
       console.log(mealTotalObject);
    });
  return mealTotalObject;
  }
}

let customerId = 0;
class Customer {
  constructor(name, employer={}){
    this.name = name;
    this.employerId = employer.id;
    this.id = ++customerId;
    store.customers.push(this);
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    });
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId == this.id;
    });
  }

  totalSpent() {
   return this.meals().reduce(function(sum, meal) {
     return sum + meal.price;
   }, 0);
 }
}
