// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodID = 0

class Neighborhood {
  constructor (name) {
    this.name = name
    this.id = neighborhoodID++
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodID === this.id)
  }
}



// A meal has many customers
// A delivery belongs to a meal, belongs to a customer, and belongs to a neighborhood
// A customer has many deliveries
// A customer has many meals through deliveries
// A customer belongs to a neighborhood
// A neighborhood has many deliveries
// A neighborhood has many customers through deliveries
// A neighborhood has many meals through deliveries