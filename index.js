// First Solution

let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

const Neighborhood = (() => {
  let neighborhoodIds = 1;
  return class {
    constructor(name) {
      this.id = neighborhoodIds++;
      this.name = name;
      store.neighborhoods.push(this);
    }

    customers() {
      return store.customers.filter(customer => customer.neighborhoodId === this.id);
    }

    meals() {
      const allMeals = this.customers().map(customer => customer.meals());

    //   why map and not filter or find? best guess ... can't call a function on a literal? (like you can't in Ruby?)

      const merged = [].concat.apply([], allMeals);
    //   stil ??? why did we need to do this second line?? test requires it perhaps, and new Set is required for unique values, but 
    //   return [...new Set(allMeals)]; didn't work when const merged deleted
      return [...new Set(merged)];

    }

    deliveries() {
      return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
    }
  };
})();
// ??? why these parens? This is execution code needed for compiling but don't understand why

const Meal = (() => {
  let mealIds = 1;
  return class {
    constructor(title, price = 0) {
      this.id = mealIds++;
      this.title = title;
      this.price = price;
      store.meals.push(this);
    }

    deliveries() {
      return store.deliveries.filter(delivery => delivery.mealId === this.id);
    }

    customers() {
      const allCustomers = this.deliveries().map(delivery => delivery.customer());
      return allCustomers;
    //   return [...new Set(allCustomers)]; This was not necessary to pass tests, but app. is necessary for unique values
    }

    static byPrice() {
      return store.meals.sort((a, b) => b.price - a.price);
    //   why doesn't this work? (solution was wrong) -->
    //   a.price < b.price
    };
  };
})();

const Customer = (() => {
  let customerIds = 1;
  return class {
    constructor(name, neighborhoodId) {
      this.id = customerIds++;
      this.name = name;
      this.neighborhoodId = neighborhoodId;
      store.customers.push(this);
    }

    deliveries() {
      return store.deliveries.filter(delivery => delivery.customerId === this.id);
    }

    meals() {
      return this.deliveries().map(delivery => delivery.meal());
    }

    totalSpent() {
      return this.meals().reduce((total, meal) => (total += meal.price), 0);
    }
  };
})();

const Delivery = (() => {
  let deliveryIds = 1;
  return class {
    constructor(mealId, neighborhoodId, customerId) {
      this.id = deliveryIds++;
      this.mealId = mealId;
      this.neighborhoodId = neighborhoodId;
      this.customerId = customerId;
      store.deliveries.push(this);
    }

    meal() {
      return store.meals.find(meal => meal.id === this.mealId);
    }

    neighborhood() {
      return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
    }

    customer() {
      return store.customers.find(customer => customer.id === this.customerId);
    }
  };
})();


    // static byPrice() {
    //     return store.meals.sort((meal1, meal2) => {
    //       return meal1.price < meal2.price;
    // });


// My attempt

// // global datastore
// let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

// let neighborhoodId = 1;
// let mealId = 0;
// let deliveryId = 0;

// class Neighborhood {
//     constructor(name, customerId) {
//         this.name = name;
//         this.customerId = customerId;
//         this.id = ++neighborhoodId;
//         store.neighborhoods.push(this)
//     }

//     // customers is join table for neighborhood and deliveries

  
//     // trips() {
//     //     return store.trips.filter(trip => {
//     //       return trip.passengerId == this.id;
//     //     });
//     //   }
      
//     //   drivers() {
//     //     return this.trips().map(trip => {
//     //       return trip.driver();
//     //     });
//     //   }

//     deliveries() {
//         return store.deliveries.filter( delivery => {
//             return delivery.neighborhoodId === this.id;
//         });
//     }

//     // deliveries() returns neighborhood id because that's what it picks up to work within the Neighborhoods block;
//     // it was set up for it in the meals block (class?)

//     // WRONG
//     // customers() { 
//     //     return this.deliveries().map( delivery => {
//     //         return ;
//     //     });
//     // }

//     customers() {
//         return store.customers.filter
//             (customer => customer.neighborhoodId === this.id);
//     }
  

//     // meals() - returns a unique list of meals that have been ordered in a particular neighborhood (you might want to do this one last)

//     meals() {
//         const allMeals = this.customers().map(customer => customer.meals());
//         const merged = [].concat.apply([], allMeals);
//         return [...new Set(merged)];
//     }
//     // how does this work?
// }

// const Customer = (() => {
//     // ???What difference does const and class make? DOESN'T
//     let customerId = 1;
//     return class {
//     constructor(name, neighborhoodId) {
//         this.name = name;
//         this.neighborhoodId = neighborhoodId;
//         //this is all you need to do because it's a simple belongs to relationship?
//         this.id = ++customerId;
//         store.customers.push(this);
//     }

//     deliveries() {
//         return store.deliveries.filter(delivery => delivery.customerId === this.id);
//     }

//     meals() {
//         return this.deliveries().map
//         (delivery => delivery.mealId === delivery.meal());
//     }

//     // customer has many meals but needs to use delivery to do it as the through?
//     // yes, but how .meal()??? and why map???

//     totalSpent() {

//     }
// } 

// const Meal = (() => {
//     let mealId = 1;
//     return class {
//     constructor(title, price = 0) {
//         this.title = title;
//         this.price = price;
//         this.id = ++mealId;
//         store.meals.push(this);
//     }
//             // deliveries() {
//             //     return store.deliveries.filter(delivery => delivery.mealId === this.id);
//             //   }
          
//             //   customers() {
//             //     const allCustomers = this.deliveries().map(delivery => delivery.customer());
//             //     return [...new Set(allCustomers)];
//             //   }

//     deliveries() {
//         return store.deliveries.filter(delivery => delivery.mealId === this.id);
//     }
        
//     customers() {
//         return this.deliveries().map (delivery => {
//             return delivery.customer()
//         } )
//     };
//             //   how does this work?
//             // why need to do all this?

//         // belongs neighborhoods
//         // belongs to meals
//         // belongs to neighborhoods

//     byPrice() {
//     }
//     }
// }

// // const Delivery = (() => {
// //     let deliveryIds = 1;
// //     return class {
// //     constructor(mealId, customerId, neighborhoodId) {
// //         this.mealId = mealId;
// //         this.customerId = customerId;
// //         this.neighborhoodId = neighborhoodId;
// //         this.id = ++deliveryId;
// //         store.deliveries.push(this)
// //     }


// //     // constructor(mealId, neighborhoodId, customerId) {
// //     //     this.id = deliveryIds++;
// //     //     this.mealId = mealId;
// //     //     this.neighborhoodId = neighborhoodId;
// //     //     this.customerId = customerId;
// //     //     store.deliveries.push(this);
// //     //   }
// //     //the Delivery class is all ids because it only belongs to other classes: "A delivery belongs to a meal, belongs to a customer, and belongs to a neighborhood"
// //     //the relationship is shown in the singular or plural value of the specific functions in the block
    
// //     meal() {
// //         return store.meals.find( meal => {
// //             return meal.id === this.mealId;
// //         });
// //     }

// //     customer() {
// //         return store.customers.filter( customer => {
// //             return customer.id === this.customerId;
// //         });
// //     }

// //     neighborhood() {
// //         return store.customers.filter(customer => {
// //             return customer.id === this.customerId;
// //     });
// //     }
// // }

// const Delivery = (() => {
//     let deliveryIds = 1;
//     return class {
//       constructor(mealId, neighborhoodId, customerId) {
//         this.id = deliveryIds++;
//         this.mealId = mealId;
//         this.neighborhoodId = neighborhoodId;
//         this.customerId = customerId;
//         store.deliveries.push(this);
//       }
  
//       meal() {
//         return store.meals.find(meal => meal.id === this.mealId);
//       }
  
//       neighborhood() {
//         return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
//       }
  
//       customer() {
//         return store.customers.find(customer => customer.id === this.customerId);
//       }
//     };
//   })();
// //   error: unreachable code detected




// Second Solution
// let store = { deliveries: [], employers: [], customers: [], meals: [] };

// let mealId = 0;

// class Meal {
//   constructor(title, price) {
//     this.title = title;
//     this.price = price;
//     this.id = ++mealId;
//     store.meals.push(this);
//   }
//   deliveries() {
//     return store.deliveries.filter(delivery => {
//       return delivery.mealId == this.id;
//     });
//   }
//   customers() {
//     return this.deliveries().map(delivery => {
//       return delivery.customer();
//     });
//   }
//   static byPrice() {
//     return store.meals.sort((meal1, meal2) => {
//       return meal1.price < meal2.price;
//     });
//   }
// }

// let customerId = 0;
// class Customer {
//   constructor(name, employer = {}) {
//     this.name = name;
//     this.employerId = employer.id;
//     this.id = ++customerId;
//     store.customers.push(this);
//   }
//   totalSpent() {
//     return this.meals().reduce(function(sum, meal) {
//       return sum + meal.price;
//     }, 0);
//   }
//   deliveries() {
//     return store.deliveries.filter(delivery => {
//       return delivery.customerId == this.id;
//     });
//   }
//   meals() {
//     return this.deliveries().map(delivery => {
//       return delivery.meal();
//     });
//   }
// }

// let deliveryId = 0;
// class Delivery {
//   constructor(meal = {}, customer = {}) {
//     this.mealId = meal.id;
//     this.customerId = customer.id;
//     this.id = ++deliveryId;
//     store.deliveries.push(this);
//   }
//   meal() {
//     return store.meals.find(meal => {
//       return meal.id === this.mealId;
//     });
//   }
//   customer() {
//     return store.customers.find(customer => {
//       return customer.id === this.customerId;
//     });
//   }
// }

// let employerId = 0;

// class Employer {
//   constructor(name) {
//     this.name = name;
//     this.id = ++employerId;
//     store.employers.push(this);
//   }
//   mealTotals() {
//     let allMeals = this.deliveries().map(delivery => {
//       return delivery.meal();
//     });
//     let summaryObject = {};
//     allMeals.forEach(function(meal) {
//       summaryObject[meal.id] = 0;
//     });
//     allMeals.forEach(function(meal) {
//       summaryObject[meal.id] += 1;
//     });
//     return summaryObject;
//   }
//   employees() {
//     return store.customers.filter(customer => {
//       return customer.employerId == this.id;
//     });
//   }
//   deliveries() {
//     let allDeliveries = this.employees().map(employee => {
//       return employee.deliveries();
//     });
//     let merged = [].concat.apply([], allDeliveries);
//     return merged;
//   }
//   meals() {
//     let allMeals = this.deliveries().map(delivery => {
//       return delivery.meal();
//     });
//     let uniqueMeals = [...new Set(allMeals)];
//     return uniqueMeals;
//   }
// }

