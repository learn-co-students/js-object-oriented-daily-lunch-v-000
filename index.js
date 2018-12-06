// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodID = 1
let customerID = 1
let mealID = 1
let deliveryID = 1

function findSingle(classInstance, category) {
  let categoryId = category.toString() + "Id"
  let categoryPlural = category.toString() + "s"
  let itemId = classInstance[categoryId]
  let item = store[categoryPlural].find(category => {
   return itemId == category.id
  })

  return item
}

const distinct = (value, index, self) =>{
  return self.indexOf(value) === index
}
// return store.customers.filter(customer =>{
//   return customer.neighborhoodId == this.id

function findMany(classInstance, classType, category) {
  let instanceCategoryID = category.toString().toLowerCase() + "Id"
  let categoryId = category.toString() + "Id"
  if (category.toString() == "delivery") {
    categoryPlural = "deliveries"
  } else {
      categoryPlural = category.toString() + "s"
  }

  let itemId = classInstance[categoryId]
  let item = store[categoryPlural].filter(category => {
   return classInstance.id == category.id
  })
  debugger
  return item
}

class Neighborhood {
  constructor(name){
    this.name = name
    this.id = neighborhoodID++
    store.neighborhoods.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery =>{
      return delivery.neighborhoodId == this.id
    })
  }

  customers(){
    return store.customers.filter(customer =>{
      return customer.neighborhoodId == this.id
    })
  }

meals(){
  let customerMeals = this.customers().map(customer => customer.meals())
  let allTogether = [].concat.apply([], customerMeals)
  return [...new Set(allTogether)]
  }

}

class Customer {
  constructor(name, neighborhoodId){
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = customerID++
    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery =>{
      return delivery.customerId == this.id
    })
  }

  meals(){
    return this.deliveries().map( delivery => {
      return delivery.meal()
    })
  }

  totalSpent(){
    return this.meals().reduce(function (total, currentMeal){
      return currentMeal.price + total
    }, 0)
  }

}



class Meal {
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = mealID++
    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery =>{
      return delivery.mealId == this.id
    })
  }

  customers(){
  return this.deliveries().map(delivery => {
    return delivery.customer()
  })
  }

 static byPrice(){
 return store.meals.slice().sort(function (mealOne, mealTwo) {
   return mealTwo.price - mealOne.price
 })}

}

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
  this.mealId = mealId
  this.neighborhoodId = neighborhoodId
  this.customerId = customerId
  this.id = deliveryID++
  store.deliveries.push(this)
}

meal(){
  return store["meals"].find(meal =>{
    return this.mealId == meal.id
  })
}

customer(){
  return findSingle(this, "customer")
}

neighborhood(){
  return findSingle(this, "neighborhood")}

}
