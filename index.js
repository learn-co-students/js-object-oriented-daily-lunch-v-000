// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhood_counter = 0

class Neighborhood {
  constructor(name) {
  this.name = name
  this.id = neighborhood_counter++
  store["neighborhoods"].push(this)
  }


  meals() {
    let meals = this.customers().map(customer => {
      return customer.meals().filter(function(item, pos) {
        return customer.meals().indexOf(item) == pos;
      })
    })
    console.log(meals[0]);
    return meals[0]
  }

}
