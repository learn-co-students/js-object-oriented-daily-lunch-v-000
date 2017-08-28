const expect = chai.expect;

describe('drivers', function() {
  describe('creating a new driver', function() {
    describe('store', function() {
      it('can store drivers', function() {
        expect(store.drivers).to.be.instanceof(Array)
      })
    })

    it('can create a Driver with a name', function() {
      let driver = new Driver("Alfie")
      expect(driver.name).to.equal("Alfie")
    })

    it('adds the driver to the store', function() {
      store.drivers = []
      let driver = new Driver("Alfie")
      expect(store.drivers[0].name).to.equal("Alfie")
    })

    it('adds a numerical id to each driver', function() {
      store.drivers = []
      let driver = new Driver("Alfie")
      expect(typeof store.drivers[0].id).to.equal("number")
    })

    it('adds a unique id to each driver', function() {
      store.drivers = []
      let driver = new Driver("Alfie")
      let otherDriver = new Driver("Freddie")
      expect(driver.id).to.not.equal(otherDriver.id)
    })
  })
})

describe('passengers', function() {
  describe('creating a new passenger', function() {
    describe('store', function() {
      it('can store passengers', function() {
        expect(store.passengers).to.be.instanceof(Array)
      })
    })

    it('can create a Driver with a name', function() {
      let passenger = new Passenger("Alfie")
      expect(passenger.name).to.equal("Alfie")
    })

    it('adds the passenger to the store', function() {
      store.passengers = []
      let passenger = new Passenger("Alfie")
      expect(store.passengers[0].name).to.equal("Alfie")
    })

    it('adds a numerical id to each passenger', function() {
      store.passengers = []
      let passenger = new Passenger("Alfie")
      expect(typeof store.passengers[0].id).to.equal("number")
    })

    it('adds a unique id to each passenger', function() {
      store.passengers = []
      let passenger = new Passenger("Alfie")
      let otherPassenger = new Passenger("Freddie")
      expect(passenger.id).to.not.equal(otherPassenger.id)
    })
  })
})


describe('trips', function() {
  describe('creating a new trip', function() {
    describe('store', function() {
      it('can store trips', function() {
        expect(store.trips).to.be.instanceof(Array)
      })
    })



    it('adds the trip to the store', function() {
      store.trips = []
      let trip = new Trip()
      expect(store.trips[0]).to.be.instanceof(Trip)
    })

    it('adds a numerical id to each trip', function() {
      store.trips = []
      let trip = new Trip()
      expect(typeof store.trips[0].id).to.equal("number")
    })

    it('adds a unique id to each trip', function() {
      store.trips = []
      let trip = new Trip()
      let otherTrip = new Trip()
      expect(trip.id).to.not.equal(otherTrip.id)
    })
  })
})

describe('relating a driver to a trip and a passenger', function() {
  let driver;
  let passenger;
  let firstTrip;
  let susan;
  let secondTrip;

  beforeEach(function() {
    driver = new Driver("Alfie")
    passenger = new Passenger("Bob")
    firstTrip = new Trip(driver, passenger)
    secondPassenger = new Passenger("Susan")
    secondTrip = new Trip(driver, secondPassenger)
  });

  afterEach(function(){
    store.drivers = []
    store.passengers = []
    store.trips = []
  })

  describe('trip', function(){
    it('has a driverId', function(){
      expect(firstTrip.driverId).to.equal(driver.id)
    })

    it('has a passengerId', function() {
      expect(firstTrip.passengerId).to.equal(passenger.id)
    })

    it('has a passenger', function() {
      expect(firstTrip.passenger()).to.equal(passenger)
    })

    it('has a driver', function() {
      expect(firstTrip.driver()).to.equal(driver)
    })
  })

  describe('driver', function(){
    it('has a trips', function() {
      expect(driver.trips()).to.include(firstTrip)
      expect(driver.trips()).to.include(secondTrip)
    })

    it('has passengers', function() {
      expect(driver.passengers()).to.include(passenger)
      expect(driver.passengers()).to.include(secondPassenger)
    })
  })

  describe('passengers', function(){
    it('has a trips', function() {
      expect(passenger.trips()).to.include(firstTrip)
    })

    it('has drivers', function() {
      expect(passenger.drivers()).to.include(driver)
    })
  })
})
