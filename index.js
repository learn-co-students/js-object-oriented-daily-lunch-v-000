// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0

class Neighborhood {
  constructor(name){
    this.id = ++neighborhoodId
    this.name = name
    store.neighborhoods.push(this)
    }
    deliveries() {
            return store.deliveries.filter(
                function(delevery) {
                    return delevery.neighborhoodId === this.id;
                }.bind(this)
              )}
            customers() {
              return store.customers.filter(
                  function(customer) {
                      return customer.neighborhoodId === this.id;
                  }.bind(this)
                )}
            meals(){
              let output = []
              let indexs = []
              this.deliveries().map(function(delivery){
                if (!indexs.includes(delivery.mealId)){
                output.push(delivery.meal())
                indexs.push(delivery.mealId)
              }})
              return output
            }
}

class Meal {
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
    }
    deliveries() {
            return store.deliveries.filter(
                function(delevery) {
                    return delevery.mealId === this.id;
                }.bind(this)
            );}
            customers() {
                  const output = []
                    this.deliveries().map(function(delivery){
                      output.push(delivery.customer())
                    })
                  return output
                }
  static byPrice(){
    return store.meals.sort(function(a,b){return b.price - a.price})
  }
}

class Customer {
  constructor(name,neighborhoodId){
    this.id = ++customerId
    this.name = name
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
    }
    deliveries() {
            return store.deliveries.filter(
                function(delevery) {
                    return delevery.customerId === this.id;
                }.bind(this)
            );}
            meals() {
                  const output = []
                    this.deliveries().map(function(delivery){
                      output.push(delivery.meal())
                    })
                  return output
                }
    totalSpent(){
      let output = 0
      this.deliveries().map(function(delevery){
      output += delevery.meal().price
    })
    return output
    }
}

class Delivery {
  constructor(mealId,neighborhoodId,customerId){
    this.id = ++deliveryId
    this.mealId = mealId
    this.customerId = customerId
    this.neighborhoodId = neighborhoodId
    store.deliveries.push(this)
    }

    meal() {
        return store.meals.find(
            function(meal) {
                return meal.id === this.mealId;
            }.bind(this)
        );
    }
    customer() {
        return store.customers.find(
            function(customer) {
                return customer.id === this.customerId;
            }.bind(this)
        );
    }
    neighborhood() {
        return store.neighborhoods.find(
            function(neighborhood) {
                return neighborhood.id === this.neighborhoodId;
            }.bind(this)
        );
    }
}
