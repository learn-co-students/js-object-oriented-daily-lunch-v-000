// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

function removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array;
}

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id;
    })
  }
  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id;
    })
  }
  meals() {
    let duplicateArray = this.deliveries().map(delivery => {
      return delivery.meal();
    })
    return removeDuplicates(duplicateArray);
  }
}

class Customer {
  constructor(name, neighborhoodId) {
      this.name = name;
      this.neighborhoodId = neighborhoodId;
      this.id = ++customerId;
      store.customers.push(this);
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }
  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    })
  }
    totalSpent() {
      let total = this.meals().map(meal => {
        return meal.price;
      }).reduce((sum, amount) => sum + amount);
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
      return delivery.mealId === this.id
    })
  }
  customers() {
    let duplicateArray = this.deliveries().map(delivery => {
      return delivery.customer();
    })
    return removeDuplicates(duplicateArray);
  }
  static byPrice() {
    return store.meals.sort(function(a,b) {return b.price - a.price});
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }
  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId;
    })
  }
  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    })
  }
  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    })
  }
}
