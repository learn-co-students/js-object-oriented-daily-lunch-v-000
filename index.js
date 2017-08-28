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
  trips(){
    return store.trips.filter((trip)=> {
      return trip.driverId == this.id
    })
  }
  passengers(){
    return this.trips().map((trip)=> {
      return trip.passenger()
    })
  }
}

let passengerId = 0

class Passenger {
  constructor(name){
    this.name = name
    this.id = ++passengerId
    store.passengers.push(this)
  }

  trips(){
    return store.trips.filter((trip)=> {
      return trip.passengerId == this.id
    })
  }
  drivers(){
    return this.trips().map((trip)=> {
      return trip.driver()
    })
  }
}

let tripId = 0
class Trip {
  constructor(driver, passenger, startingZip, endingZip){
    this.driverId = driverId;
    this.passengerId = passengerId;
    this.id = ++tripId
    store.trips.push(this)
  }
  driver(){
    return store.drivers.find((driver) => { return driver.id === this.driverId })
  }
  passenger(){
    return store.passengers.find((passenger) => { return passenger.id === this.passengerId })
  }
}
