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

    it('can create a Trip with a name', function() {
      // let trip = new Passenger("Alfie")
      // expect(trip.name).to.equal("Alfie")
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
