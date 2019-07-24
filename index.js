// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Neighborhood {
    constructor(name) {
      this.name = name;
      this.id = ++neighborhoodId;
      store.neighborhoods.push(this);
    }

    deliveries() {
      return store.deliveries.filter(delivery => {
        return delivery.neighborhoodId == this.id;
      });
    }

    customers() {
      let customersArray = this.deliveries().map(delivery => {
        return delivery.customer();
      });

      return Array.from(new Set(customersArray));
    }

    meals() {
        let customers = this.customers(); 
        let neighborhoodMeals = [1, 2]; 

        for (const customer of customers) {
            neighborhoodMeals.push(customer.meal); 
          }        

  //      return Array.from(new Set(neighborhoodMeals));
          return neighborhoodMeals; 

    }
  }

  class Customer {
    constructor(name, nbhId) {
      this.name = name;
      this.neighborhoodId = nbhId;
      this.id = ++customerId;
      store.customers.push(this);
    }

    deliveries() {
        return store.deliveries.filter(delivery => {
          return delivery.customerId == this.id;
        });
      }

    meals() {
        return this.deliveries().map(delivery => {
            return delivery.meal();
        });
    }

    totalSpent() {
        let total = 0; 

        let mealsArray = this.meals(); 

        for (const meal of mealsArray) {
            total += meal.price; 
          }

        return total; 
    }
  }

  class Meal {
    constructor(title, price) {
      this.title = title;
      this.price = price; 
      this.id = ++mealId;
      store.meals.push(this);
    }

    deliveries() {
        return store.deliveries.filter(delivery => {
          return delivery.mealId == this.id;
        });
      }

      customers() {
        let customersArray = this.deliveries().map(delivery => {
          return delivery.customer();
        });
  
        return Array.from(new Set(customersArray));
      }

      static byPrice() {
        let sortable = store.meals; 
 
        sortable.sort(function(a, b){return b.price - a.price}); 

        return sortable; 
      }
  }

  class Delivery {
    constructor(mId, nId, cId) {
      this.mealId = mId; 
      this.neighborhoodId = nId; 
      this.customerId = cId; 
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

    neighborhood() {
        return store.neighborhoods.find(neighborhood => {
          return neighborhood.id === this.neighborhoodId;
        });
      }
  }