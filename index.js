// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };


let neighborhoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0


class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;

    store.neighborhoods.push(this)
  }

  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    });
  }

  // returns a list of all deliveries placed in a neighborhood
  deliveries() {
   return store.deliveries.filter(x => x.neighborhoodId === this.id)
  }

  // returns a unique list of meals that have been ordered in a particular neighborhood
  //(you might want to do this one last)
  meals() {
      const allMeals = this.customers().map(customer => customer.meals());
      const merged = [].concat.apply([], allMeals);
      return [...new Set(merged)];
    }
  }




class Customer {
  constructor(name, neighborhoodId){
    this.name = name
    this.id = ++customerId

    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(x => x.customerId === this.id)
  }

  meals() {
    return this.deliveries().map(x => x.meal())
  }

  totalSpent() {
    return this.meals().reduce((a,b) => a += b.price, 0)
  }
}


class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price

    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(x => x.mealId === this.id)
  }


  customers() {
      const allCustomers = this.deliveries().map(delivery => delivery.customer());
      return [...new Set(allCustomers)];
    }

  static byPrice() {
      return store.meals.sort((a, b) => a.price < b.price);
    }
}



class Delivery {
  constructor(mealId, neighborhoodId, customerId,){
    this.id = ++deliveryId
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId)
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }


}
