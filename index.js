let store = {deliveries: [], meals: [], customers: [], employers: [], drivers: [], passengers: [], trips: []}

let deliveryId = 0
let customerId = 0
let mealId = 0
let employerId = 0
let driverId = 0
let passengerId = 0
let tripId = 0

class Delivery {

  constructor(meal, customer) {
    this.id = ++deliveryId
    if(meal){
      this.mealId = meal.id
    }
    if(customer){
      this.customerId = customer.id
    }
    store.deliveries.push(this)
  }

  customer(){
    return store.customers.find(function(customer) {
      return customer.id === this.customerId
    }.bind(this));
  };

  meal(){
    return store.meals.find(function(meal){
      return meal.id === this.mealId
    }.bind(this));
  };

  employer(){
    return this.customer().employer()
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
    return store.deliveries.filter(function(delivery) {
      return delivery.meal() === this
    }.bind(this));
  };

  customers() {
    return this.deliveries().map(function(delivery){
      return delivery.customer()
    });
  };

  employers() {
    return this.customers().map(function(customer){
      return customer.employer()
    });
  };

  static byPrice() {
    return store.meals.sort(function (a, b) {
      return b.price - a.price;
    });
  };

}

class Customer {

  constructor(name, employer) {
    this.id = ++customerId
    if(employer){
      this.employerId = employer.id
    }
    this.name = name

    store.customers.push(this)
  }

  employer() {
    return store.employers.find(function(employer) {
      return employer.id === this.employerId
    }.bind(this));
  };

  totalSpent() {
    return this.meals().reduce(function(agg, el, i, arr) {
      return agg + el.price;
    }, 0);
  };

  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.customer() === this
    }.bind(this));
  };

  meals() {
    return this.deliveries().map(function(delivery){
      return delivery.meal()
    });
  };
}

class Employer {

  constructor(name) {
    this.id = ++employerId
    this.name = name

    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(function(customer) { return customer.employer() === this
    }.bind(this));
  }

  meals() {
    const notUnique = this.deliveries().map(function(delivery){
      return delivery.meal()
    })
    const unique = [...new Set(notUnique)]
    return unique
  }

  mealTotals() {
    const mealsArray = this.deliveries().map(function(delivery){
      return delivery.meal()
    })
    let result = {};
    mealsArray.forEach(function(meal){
      result[meal.id] = 0
    })
    mealsArray.forEach(function(meal){
      result[meal.id] += 1
    })
    return result
  }

  deliveries() {
    return store.deliveries.filter(function(delivery){
      return delivery.employer() === this
    }.bind(this));
  }

}

class Driver {
  constructor(name) {
    this.id = ++driverId
    this.name = name

    store.drivers.push(this)
  }

  trips() {
    return store.trips.filter(function(trip) {
      return driverId === this.id
    }.bind(this));
  };

  passengers() {
    let trips = this.trips()
    return trips.map(function(trip) {
      return trip.passenger()
    })
  }

}

class Passenger {

  constructor(name) {
    this.id = ++passengerId
    this.name = name

    store.passengers.push(this)
  }

  trips() {
    return store.trips.filter(function(trip) {
      return trip.passenger() === this
    }.bind(this));
  };

  drivers() {
    return this.trips().map(function(trip) {
      return trip.driver()
    })
  }
}

class Trip {

  constructor(driver, passenger) {
    this.id = ++tripId
    if(driver){
      this.driverId = driver.id
    }
    if(passenger){
      this.passengerId = passenger.id
    }

    store.trips.push(this)
  }

  passenger(){
    return store.passengers.find(function(passenger)
    {
      return passenger.id === this.passengerId
    }.bind(this));
  };

  driver(){
    return store.drivers.find(function(driver){
      return driver.id === this.driverId
    }.bind(this));
  };

}
