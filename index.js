// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodIds = 1;
let customerIds = 1;
let mealIds = 1;
let deliveryIds = 1;

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = neighborhoodIds++;
    store.neighborhoods.push(this);
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId == this.id);
  }
  
  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId == this.id;
    });
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.neighborhoodIds = neighborhood.id;
    this.id = customerIds++;
    store.customers.push(this);
  }
  
  deliveries() {
     return store.deliveries.filter(delivery => delivery.customerId == this.id);
  }
  
  meals() {
    return store.meals.filter(meals => meal.customerId == this.id);
  }
}
  
//  totalSpent = 
//  }
//}

//products.forEach(function (product) {
//    totalPrice += product.price;
//  });
 
//  return totalPrice;
//};

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = mealIds++;
    store.meals.push(this);
  }
  
   deliveries() {
     return store.deliveries.filter(delivery => delivery.mealId == this.id);
  }
  
  //customers()
  
  //byPrice()
  
}

class Delivery {
  constructor(meal, neighborhood, customer) {
    this.mealId = meal.id;
    this.neighborhoodId = neighborhood.id;
    this.customerIds = customer.id;
    this.id = deliveryId++;
    store.deliveries.push(this);
  }
  
  meal() {
    return store.meals.filter(meal => meal.deliveryId == this.id);
  }
  
  customer() {
    return store.customer.filter(customer => customer.deliveryId == this.id);
  }
  
  neighborhood() {
    return store.neighborhoods.filter(neighborhood => neighborhood.deliveryId == this.id);
  }
}