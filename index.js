let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

neighborhoodId = 0;
customerId = 0;
mealId = 0;
deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    })
  }

  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    })
  }

  meals() {
    let neighborhoodMeals = this.deliveries()
    let mealsArray = neighborhoodMeals.map(function (delivery) {
      return delivery.meal()
    })
    return [...new Set(mealsArray)]
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId
    store.customers.push(this)
  };

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    });
  };

  meals() {
    return this.deliveries().filter(function (delivery) {
      if(delivery.mealId !== delivery.mealId){
        return delivery.meal
      }
    });
  };

  totalSpent() {
    let customerMeals = this.meals()
    return customerMeals.reduce(function (acc, meal) {
      return acc + meal.price
    }, 0)
  }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  };

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId == this.id;
    });
  };

  customers() {
    let mealDeliveries = this.deliveries();
    return mealDeliveries.map(function (delivery) {
      return delivery.customer();
    });
  };

  static byPrice() {
    return store.meals.sort(function (a, b) {
      return b.price - a.price;
    });
  };
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.id = ++deliveryId
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId

    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find(meal =>{
      return meal.id === this.mealId
    })
  }

customer(){
  return store.customers.find(customer => {
    return customer.id === this.customerId
  })
}

neighborhood(){
  return store.neighborhoods.find(neighborhood => {
    return neighborhood.id === this.neighborhoodId
  })
}


}
