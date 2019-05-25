// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;

class Neighborhood {
    constructor(name) {
        this.id = ++neighborhoodId;
        this.name = name;

        store.neighborhoods.push(this);
    }

    deliveries() {
      return store.deliveries.filter(
          function(delivery) {
              return delivery.neighborhoodId === this.id;
          }.bind(this)
      );
     }

     customers() {
       return store.customers.filter(
           function(customer) {
               return customer.neighborhoodId === this.id;
           }.bind(this)
       );
      }

      meals() {
        const meals = this.deliveries().map(
          function(delivery) {
            return delivery.meal()
          }.bind(this)
        )
        return meals.filter(function(meal, position){
          return meals.indexOf(meal) === position;
        });
      }

  }

  let customerId = 0;

  class Customer {
      constructor(name, neighborhoodId) {
          this.id = ++customerId;
          this.name = name;

          store.customers.push(this);

          this.neighborhoodId = neighborhoodId
      }

      deliveries() {
        return store.deliveries.filter(
            function(delivery) {
                return delivery.customerId === this.id;
            }.bind(this)
        );
       }

       meals() {
     return this.deliveries().map(
         function(delivery) {
             return delivery.meal();
         }.bind(this)
     );
    }


    totalSpent() {
      let spent = 0
      this.meals().forEach(function(meal) {spent = spent + meal.price})
      return spent
    }
    }

    let mealId = 0;

    class Meal {
        constructor(title, price) {
            this.id = ++mealId;
            this.title = title;
            this.price = price;

            store.meals.push(this);
        }

        deliveries() {
          return store.deliveries.filter(
              function(delivery) {
                  return delivery.mealId === this.id;
              }.bind(this)
          );
         }

         customers() {
       return this.deliveries().map(
           function(delivery) {
               return delivery.customer();
           }.bind(this)
       );
      }

      static byPrice() {
        return store.meals.sort(function(a, b){return b.price - a.price});
      }
      }

      let deliveryId = 0;

      class Delivery {
          constructor(mealId, neighborhoodId, customerId) {
              this.id = ++deliveryId;

              store.deliveries.push(this);

              this.neighborhoodId = neighborhoodId
              this.mealId = mealId
              this.customerId = customerId

          }

          customer() {
        return store.customers.find(
            function(customer) {
                return customer.id === this.customerId;
            }.bind(this)
        );
    }

    neighborhood() {
  return store.neighborhoods.find(
      function(neighborhood) {
          return neighborhood.id === this.neighborhoodId;
      }.bind(this)
  );
}

meal() {
return store.meals.find(
  function(meal) {
      return meal.id === this.mealId;
  }.bind(this)
);
}
        }
