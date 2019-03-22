// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;


class Neighborhood {
    constructor(name){
      this.id = ++neighborhoodId;
      this.name = name;

      store.neighborhoods.push(this);
    }
    deliveries() {
      return store.deliveries.filter(
        function(delivery) {
          return delivery;
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
      let all = []
              let lists = []
              this.deliveries().map(function(delivery){
                if (!lists.includes(delivery.mealId)){
                all.push(delivery.meal())
                lists.push(delivery.mealId)
              }})
              return all
    }
  }


class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++ customerId;
    store.customers.push(this);
    //debugger
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id;
      }.bind(this)
     );
  }

  meals() {
    const customerMeals = []
      this.deliveries().map(function(delivery){
        customerMeals.push(delivery.meal())
      })
    return customerMeals;
  }

  totalSpent() {
    let total = 0
    this.deliveries().map(function(delivery){
      total += delivery.meal().price
    })
    return total
  }
}


class Meal {
  constructor(title, price){
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
    return store.customers.filter(
      function(customer) {
        return customer;
      }.bind(this)
    );
  }

  static byPrice() {
    return store.meals.sort(function(a,b){return b.price - a.price})
    }
}


class Delivery {
  constructor(mealId, customerId, neighborhoodId){
    this.id = ++deliveryId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.mealId = mealId;

    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(
      function(meal) {
        return meal.id === this.mealId;
      }.bind(this)
    );
  }
  customer() {
    return store.customers.find(
      function(customer) {
        return customer;
      }.bind(this)
    );
  }
  neighborhood() {
    return store.neighborhoods.find(
      function(neighborhood) {
        return neighborhood;
      }.bind(this)
    );
  }
}
