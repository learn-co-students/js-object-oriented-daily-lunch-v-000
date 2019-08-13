// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveriesId = 0;

class Neighborhood {
  constructor (name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }

  filterInstancesById (storeArray, referenceId) {
    return storeArray.filter(
      function (object) {
        return this.id === object[referenceId];
      }.bind(this)
    );
  }

  deliveries () {
    return this.filterInstancesById(store.deliveries, 'neighborhoodId')
  }

  customers () {
    return this.filterInstancesById(store.customers, 'neighborhoodId')
  }

  meals () {
    const deliveries = this.deliveries();
    const allMeals = deliveries.map (
      function (delivery) {
        return delivery.meal();
      }
    );
    const uniqueMeals = [...new Set(allMeals)];
    return uniqueMeals;
  }


}

class Meal {
  constructor (title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  deliveries () {
    const newNeighborhood = new Neighborhood('Borrowing method');
    return newNeighborhood.filterInstancesById.call(this, store.deliveries, 'mealId');
  }

  customers () {
    const deliveries = this.deliveries();
    return deliveries.map(
      function (delivery) {
        return delivery.customer();
      }
    );
  }
  static byPrice () {
    const sortedMeals = [...store.meals]
    return sortedMeals.sort(
      function (a, b) {
       return b.price - a.price;
      }
    )

  }

}

class Customer {
  constructor (name, neighborhood) {
    this.name = name;
    this.neighborhoodId = neighborhood;
    this.id = ++customerId;
    store.customers.push(this);
  }

  deliveries () {
    const newNeighborhood = new Neighborhood('Borrowing method');
    return newNeighborhood.filterInstancesById.call(this, store.deliveries, 'customerId');
  }

  meals () {
    const deliveries = this.deliveries();
    return deliveries.map(
      function (delivery) {
        return delivery.meal();
      }
    );
  }

  totalSpent () {
    return this.meals().reduce(
      function (agg, meal) {
        return agg += meal.price;
      }, 0);
  }

}

class Delivery {
  constructor (meal, neighborhood, customer) {
    this.mealId = meal;
    this.customerId = customer;
    this.neighborhoodId = neighborhood;
    this.id = ++deliveriesId;
    store.deliveries.push(this);
  }

  findInstancesByID (storeArray, thisId) {
    return storeArray.find(
      function (meal) {
        return this[thisId] === meal.id;
      }.bind(this)
    );
  }



  meal () {
    return this.findInstancesByID(store.meals, 'mealId' )
  }

  customer () {
    return this.findInstancesByID(store.customers, 'customerId' )
  }

  neighborhood () {
    return this.findInstancesByID(store.neighborhoods, 'neighborhoodId' )
  }


}
