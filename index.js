//customer belongs to employer
//employer has many deliveries
//meals belongs to customer
let store = {customers: [], deliveries: [], meals: [], employers: [],
  drivers: [], passengers: [], trips: []}

let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;
let driverId = 0;
let tripId= 0;
let passengerId= 0;

class Customer{
  constructor(name, employer= {}){
    this.employerId = employer.id
    this.name = name
    this.id = ++customerId

    store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId == this.id)
  }
  meals(){
    return this.deliveries().map(delivery => delivery.meal())
  }
  totalSpent(){
    return this.meals().reduce(function(sum, meal) { return sum + meal.price }, 0)
  }
}

class Meal{
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price

    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId == this.id)
  }

  customers(){
    return this.deliveries().map(delivery =>  delivery.customer())
  }
  static byPrice(){
    return store.meals.sort(function(a, b){
      return b.price - a.price;
    });
  }
}

class Delivery{
  constructor(meal= {}, customer={}){
    this.mealId = meal.id
    this.customerId = customer.id
    this.id = ++deliveryId

    store.deliveries.push(this)
  }
  meal(){
    return store.meals.find(meal => meal.id === this.mealId)
  }
  customer(){
    return store.customers.find(customer => customer.id === this.customerId)
  }
}

class Employer{
  constructor(name){
    this.name = name
    this.id = ++employerId

    store.employers.push(this)
  }
  employees(){
    return store.customers.filter(customer => customer.employerId === this.id)
  }
  deliveries(){
    let d = this.employees().map(function(employee){
      return employee.deliveries()
    })
    return d.reduce(function(a, b){
      return a.concat(b)
    })
  }

  meals(){
    let m = this.deliveries().map(function(delivery){
      return delivery.meal()
    })
    return [...new Set(m)]
  }
  mealTotals(){
    let orderedMeals = this.deliveries().map(function(delivery){
      return delivery.meal();
    })
    let mealCount = {};

    orderedMeals.forEach(function(meal){
      if(mealCount[meal.id]){
        mealCount[meal.id] = ++mealCount[meal.id]
      }
      else{
        mealCount[meal.id]= 1
      }
    })
    return mealCount
  }
}

class Trip{
 constructor(driver, passenger) {
    this.driverId = driverId;
    this.passengerId = passengerId;
    this.id = ++tripId
    store.trips.push(this)
  }
  driver(){
    return store.drivers.find(driver => driver.id === this.driverId)
  }
  passenger(){
    return store.passengers.find(passenger => passenger.id === this.passengerId)
  }
}

class Driver{
  constructor(name){
    this.id = ++driverId
    this.name = name

    store.drivers.push(this)
  }
  trips(){
    return store.trips.filter(trip => trip.driverId == this.id)
  }
  passengers(){
    return this.trips().map(trip =>  trip.passenger())
  }
}

class Passenger{
  constructor(name){
    this.id = ++passengerId
    this.name = name
    store.passengers.push(this)
  }
  trips(){
  return store.trips.filter(trip => trip.passengerId == this.id)
}
  drivers(){
    return this.trips().map(trip => trip.driver())
  }
}
