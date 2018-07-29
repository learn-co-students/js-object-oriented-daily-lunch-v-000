// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

class  Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++ neighborhoodId

    store.neighborhoods.push(this)
  }

  deliveries(){
    return store.deliveries.filter(deliveries => {
      return deliveries.neighborhoodId === this.id
    })
  }

  customers(){
    return store.customers.filter(customer =>{
      return customer.neighborhoodId === this.id
    })
  }
}

  class Customer {
    constructor(name, neighborhoodId) {
      this.name = name
      this.neighborhoodId = neighborhoodId
      this.id = ++customerId
      store.customers.push(this)
    }

    deliveries(){
      return store.deliveries.filter( delivery=> {
        return this.id === delivery.customerId
      })
    }

    meals(){
      const allMeals = this.deliveries()
      return allMeals.map(delivery => delivery.meal())
    }

  //   totalSpent(){
  //     let deliveredMeals = this.deliveries()
  //     let allMeals = store.meals
  //     // console.log(deliveredMeals)
  //     // console.log(allMeals)
  //     for(var i = 0; i<deliveredMeals.length;i++){
  //     let meals = allMeals.filter(meal =>{
  //         return deliveredMeals[i].mealId == allMeals.id
  //       })
  //       }
  //
  //     }
  //     console.log(meals)
  //     return meals.reduce(function(acc,cur) {
  //       console.log(acc)
  //       return acc + cur.price
  //     }, 0 )
  //   }
  }

  class Meal {
    constructor(title, price) {
      this.title = title
      this.price = price
      this.id = ++mealId
      store.meals.push(this)
    }

    deliveries(){
      return store.deliveries.filter(delivery => {
        return this.id === delivery.mealId
      })
    }

    static byPrice(){
      let orderedMeals = store.meals.sort(function(a,b){
        return a.price - b.price
      })
      return orderedMeals
    }
  }

  class Delivery {
    constructor(mealId,neighborhoodId, customerId) {
      this.mealId = mealId
      this.neighborhoodId = neighborhoodId
      this.customerId = customerId
      this.id = ++deliveryId
      store.deliveries.push(this)
    }

    meal(){
      return store.meals.find(meal =>{
      return meal.id === this.mealId
    })
    }
     customer(){
       return store.customers.find( customer => {
         return customer.id === this.customerId
       })
     }
    neighborhood(){
      return store.neighborhoods.find(neighborhood =>{
        return neighborhood.id = this.neighborhoodId
      })
    }
  }
