// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;


class Neighborhood {
    constructor(name) {
        this.id = ++neighborhoodId
        this.name = name;
        store.neighborhoods.push(this);
    }

    deliveries() {
        return store.deliveries.filter(delivery => {
            return delivery.neighborhoodId === this.id;
        })
    }
    customers() {
        return store.customers.filter(customer => customer.neighborhoodId === this.id);
    }
    meals() {
      return store.meals.map( meal => {meal.neighborhoodId === this.id})
    }
}

class Meal {
    constructor(title, price) {
        this.id = ++mealId
        this.title = title;
        this.price = price;

        store.meals.push(this);
    }

    deliveries() {
      return store.deliveries.filter(delivery => {
        return delivery.mealId === this.id
      });
    }
    customers() {
      return store.customers.filter(customer => {
          return customer.mealId = this.id
      });
    }

    static byPrice() {
      return store.meals.sort((a, b) => a.price < b.price)
    }
}

class Customer {
    constructor(name, neighborhood) {
        this.id = ++customerId
        this.name = name;
        this.neighborhoodId = neighborhood
        store.customers.push(this);
    }

    deliveries() {
      return store.deliveries.filter(delivery => {
        return delivery.customerId === this.id
      })
    }
    meals() {
      return this.deliveries().map(delivery => {
        return delivery.meal()
      })
    }
    totalSpent(){
      return this.meals().reduce((total, meal) => (total += meal.price), 0)
    }
}

class Delivery {
    constructor(meal, neighborhood, customer) {
        this.id = ++deliveryId;
        this.mealId = meal;
        this.neighborhoodId = neighborhood;
        this.customerId = customer;
        store.deliveries.push(this)
    }
    meal() {
        return store.meals.find(meal => {
            return meal.id === this.mealId
        });
    }
    customer() {
        return store.customers.find(customer => {
            return customer.id === this.customerId
        });
    }
    neighborhood() {
        return store.neighborhoods.find(neighborhood => {
            return neighborhood.id === this.neighborhoodId
        })
    }
}
