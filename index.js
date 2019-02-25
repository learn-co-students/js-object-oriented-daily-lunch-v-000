// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let deliveryId = 0;
let customerId = 0;

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = neighborhoodId++;
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id;
    });
  }

  customers() {
    return store.customers.filter(customer => {
    return customer.neighborhoodId === this.id;
  });
}

meals() {
     const allMeals = this.customers().map(customer => customer.meals());
     const merged = [].concat.apply([], allMeals);
     return [...new Set(merged)];
   }

}

class Meal {
  constructor(title, price) {
    this.id = mealId++;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    })
  }

  customers(){
    return this.deliveries().map(delivery =>
    delivery.customer());
    }

    static byPrice() {
      return store.meals.sort((num1, num2) =>
         parseFloat(num2.price) - parseFloat(num1.price));
    }
  

  }



class Customer {
  constructor(name, neighborhoodId){
  this.name = name;
  this.neighborhoodId = neighborhoodId;
  this.id = customerId++;
  store.customers.push(this);
  }

  deliveries() {
  return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
  })
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    });
  }

  totalSpent() {
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
  }
}

 class Delivery {
     constructor(mealId, neighborhoodId, customerId) {
       this.id = deliveryId++;
       this.mealId = mealId;
       this.neighborhoodId = neighborhoodId;
       this.customerId = customerId;
       store.deliveries.push(this);
     }

     meal() {
       return store.meals.find(meal => {
         return meal.id === this.mealId;
       });
     }

     neighborhood() {
       return store.neighborhoods.find(neighborhood => {
         return neighborhood.id === this.neighborhoodId;
       });
     }

     customer() {
       return store.customers.find(customer => {
        return customer.id === this.customerId;
      });
     }
}
