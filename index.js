let store = {customers: [], employers: [], meals: [], deliveries: [], drivers: [], passengers: [], trips: []}

let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0

class Customer {
  constructor(name, employer){
    this.id = ++customerId
    this.name = name
    if(employer){
      this.employerId = employer.id
    }
    store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter(function(delivery){
      return delivery.customerId === this.id
    }.bind(this))
  }
  meals(){
    return this.deliveries().map(function(delivery){
      return delivery.meal()
    });
  }

  totalSpent(){
    return this.meals().reduce(function(total, value){
      return total + value.price
    }, 0);
  }
}

class Meal {
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price

    store.meals.push(this)
  }
  customers(){
    return store.customers.filter(function(customer){
      return customer.deliveryId === this.deliveryd
    }.bind(this))
  }
  deliveries(){
    return store.deliveries.filter(function(delivery){
      return delivery.mealId === this.id
    }.bind(this))
  }
  static byPrice(){
    return store.meals.sort(function(a, b){
      return b.price - a.price;
    });
  }
}

class Delivery {
  constructor(meal, customer){
    this.id = ++deliveryId
    if (meal) {
      this.mealId = meal.id
    }
    if (customer) {
      this.customerId = customer.id
    }

    store.deliveries.push(this)
  }
  customer(){
    return store.customers.find(function(customer) {
      return customer.id === this.customerId
    }.bind(this))
  }
  meal(){
    return store.meals.find(function(meal) {
      return meal.id === this.mealId
    }.bind(this))
  }
}

class Employer {
  constructor(name){
    this.id = ++employerId
    this.name = name

    store.employers.push(this)
  }
  employees(){
    return store.customers.filter(function(customer){
      return customer.employerId === this.id
    }.bind(this))
  }
  deliveries(){
    let deliv = this.employees().map(function(employee){
      return employee.deliveries()
    })
    return deliv.reduce(function(a, b){
      return a.concat(b);
    });
  }
  meals(){
    let mealz = this.deliveries().map(function(delivery){
      return delivery.meal();
    })
    return [...new Set(mealz)];
  }
  mealTotals(){
    let deliveryz = this.deliveries().map(function(delivery){
      return delivery.meal();
    })
    let totals = {};
    deliveryz.forEach(function(meal){
      if (totals[meal.id]){
        totals[meal.id] = ++totals[meal.id]
      } else {
        totals[meal.id] = 1
      }
    })
    return totals;
  }
}





//Extraneous tests

let driverId = 0;

let passengerId = 0;

let tripId = 0;

class Driver {
  constructor(name){
    this.id = ++driverId
    this.name = name
    store.drivers.push(this)
  }
  passengers(){
    return store.passengers.filter(function(passenger){
      return passenger.tripId === this.tripId
    }.bind(this))
  }
  trips(){
    return store.trips.filter(function(trip){
      return trip.driverId === this.id
    }.bind(this))
  }
}

class Passenger {
  constructor(name, driver){
    this.id = ++passengerId
    this.name = name
    if(driver){
      this.driverId = driver.id
    }
    store.passengers.push(this)
  }
  setDriver(driver){
    this.driverId = driver.id
  }
  trips(){
    return store.trips.filter(function(trip){
      return trip.passengerId === this.id
    }.bind(this))
  }
  drivers(){
    return store.drivers.filter(function(driver){
      return driver.tripId === this.tripId
    }.bind(this))
  }

}

class Trip {
  constructor(driver, passenger){
    this.id = ++tripId
    if (driver){
      this.driverId = driver.id
    }
    if (passenger){
      this.passengerId = passenger.id
    }
    store.trips.push(this)
  }
  passenger(){
    return store.passengers.find(function(passenger) {
      return passenger.id === this.passengerId
    }.bind(this))
  }
  driver(){
    return store.drivers.find(function(driver) {
      return driver.id === this.driverId
    }.bind(this))
  }
}
