// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;

class Neighborhood {
    constructor(name) {
        this.id = ++neighborhoodId;
        this.name = name;

        store.neighborhoods.push(this);
      }
      deliveries () {
      return store.deliveries.filter(delivery => {
        return delivery.neighborhoodId === this.id;}
      )};
      customers () {
        return store.customers.filter(customer =>{
          return customer.neighborhoodId=this.id;})}

      meals() {
            debugger
        const meals = this.deliveries().map(delivery => delivery.meal());

        return [...new Set(meals)]

      }

  }
  let customerId = 0;

  class Customer {
      constructor(name,neighborhood) {
          this.id = ++customerId;
          this.neighborhoodId = neighborhood
          this.name = name;

          store.customers.push(this);
        }
      deliveries () {
        return store.deliveries.filter(delivery => {
          return delivery.customerId === this.id;}
        )};
      meals() {
         return this.deliveries().map(delivery => delivery.meal());
       }

       totalSpent() {
     return this.meals().reduce((total, meal) => (total += meal.price), 0);
   }

    }

    let mealId = 0;

    class Meal {
        constructor(title,price) {
            this.id = ++mealId;
            this.title = title;
            this.price = price;

            store.meals.push(this);
          }

          deliveries () {
            return store.deliveries.filter(delivery => {
              return delivery.mealId === this.id;}
            )};
          customers() {
            const allCustomers = this.deliveries().map(delivery => delivery.customer());
              return [...new Set(allCustomers)];
            }

          static byPrice() {

            return store.meals.sort(function(a,b) {return b.price - a.price});
          }



// [1, 2, 3, 4, 5]

      }
      let deliveryId = 0;

      class Delivery {
          constructor(meal,neighborhood,customer) {
              this.id = ++deliveryId;
              this.mealId = meal;
              this.neighborhoodId = neighborhood;
              this.customerId =customer

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
