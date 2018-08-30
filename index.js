// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

function arrayRemoveDuplicates(arr){
    return arr.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
    });
}

class Neighborhood {
  constructor (name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter( delivery => delivery.neighborhoodId === this.id);
  }

  customers() {
    return store.customers.filter( customer => customer.neighborhoodId === this.id);
  }
}

class Customer {
  constructor (name, neighborhoodId) {
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter( delivery => delivery.customerId === this.id);
  }

  meals() {
    return this.deliveries().map ( delivery => delivery.meal() );
  }

  totalSpent() {
    let m = this.meals();
    console.log("Meals",m);
    let t = m.reduce( function(total,meal) {
      console.log("--- total",total,"meal price",meal.price);
      return total+=meal.price;
    });
    // return this.meals().reduce( function (total, meal) {
    //   return total += meal.price;
    // });
    return t;
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
    return store.deliveries.filter( delivery => delivery.mealId === this.id)
  }

  customers() {
    let c = this.deliveries().map( delivery => delivery.customer());
    return arrayRemoveDuplicates(c);
  }
}

class Delivery {
  constructor (mealId, neighborhoodId, customerId ) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find( meal => meal.id === this.mealId );
  }
  customer() {
    return store.customers.find( customer => customer.id === this.customerId );
  }
  neighborhood() {
    return store.neighborhoods.find( neighborhood => neighborhood.id === this.neighborhoodId );
  }

}
