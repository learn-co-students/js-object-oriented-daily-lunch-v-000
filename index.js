let store = {deliveries: [], meals: [], employers: [], customers: [], drivers: [], passengers: [], trips: []}

let deliveryId = 0;
let mealId = 0;
let employerId = 0;
let customerId = 0;
let driverId = 0;
let passengerId = 0;
let tripId = 0;

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId;
    if(meal) {
      this.mealId = meal.id;
    }
    if(customer) {
      this.customerId = customer.id;
    }
    store.deliveries.push(this);
  }
  customer() {
    return store.customers.find(function(customer) {
      return customer.id === this.customerId;
    }.bind(this));
  }
  meal() {
    return store.meals.find(function(meal) {
      return meal.id === this.mealId;
    }.bind(this));
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }
  static byPrice() {
    return store.meals.sort(function(a, b) {
      return b.price - a.price;
    });
  }
  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.mealId === this.id;
    }.bind(this));
  }
  customers() {
    return this.deliveries().map(function(delivery) {
      return delivery.customer();
    })
  }
}

class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;
    store.employers.push(this);
  }
  employees() {
    return store.customers.filter(function(customer) {
      return customer.employerId === this.id;
    }.bind(this));
  }
  deliveries() {
    let deliveryList = this.employees().map(function(employee) {
      return employee.deliveries();
    });
    let total = [].concat.apply([], deliveryList);
    return total
  }
  // meals() {
  //   return
  // }
}

class Customer {
  constructor(name, employer) {
    this.id = ++customerId;
    this.name = name;
    if(employer) {
      this.employerId = employer.id;
    }
    store.customers.push(this);
  }
  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.customerId === this.id;
    }.bind(this));
  }
  meals() {
    return this.deliveries().map(function(delivery) {
      return delivery.meal();
    });
  }
  totalSpent() {
    return this.meals().reduce(function(acc, cur) {
      return acc + cur.price;
    }, 0);
  }
}

class Driver {
  constructor(name) {
    this.id = ++driverId;
    this.name = name;
    store.drivers.push(this);
  }
  trips() {
    return store.trips.filter(function(trip) {
      return trip.driverId === this.id;
    }.bind(this));
  }
  passengers() {
    return this.trips().map(function(trip) {
      return trip.passenger();
    });
  }
}

class Passenger {
  constructor(name) {
    this.id = ++passengerId;
    this.name = name;
    store.passengers.push(this);
  }
  trips() {
    return store.trips.filter(function(trip) {
      return trip.passengerId === this.id;
    }.bind(this));
  }
  drivers() {
    return this.trips().map(function(trip) {
      return trip.driver();
    })
  }
}

class Trip {
  constructor(driver, passenger) {
    this.id = ++tripId;
    if(driver) {
      this.driverId = driver.id;
    }
    if(passenger) {
      this.passengerId = passenger.id;
    }
    store.trips.push(this);
  }
  passenger() {
    return store.passengers.find(function(passenger) {
      return passenger.id === this.passengerId;
    }.bind(this));
  }
  driver() {
    return store.drivers.find(function(driver) {
      return driver.id === this.driverId;
    }.bind(this));
  }
}
