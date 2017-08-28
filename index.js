// driver has many trips
// passenger has many trips
// trips
  // passenger
  // driver
  // belongs to scooter

let store = {drivers: [], passengers: [], trips: []}

let driverId = 0
class Driver {
  constructor(name, zipcode){
    this.name = name
    this.id = ++driverId
    store.drivers.push(this)
  }
}

let passengerId = 0

class Passenger {
  constructor(name){
    this.name = name
    this.id = ++passengerId
    store.passengers.push(this)
  }
}

let tripId = 0
class Trip {
  constructor(startingZip, endingZip){
    this.id = ++tripId
    store.trips.push(this)
  }
}
