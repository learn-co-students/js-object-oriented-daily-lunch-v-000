// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodIds = 0
let customerIds = 0
let mealIds = 0
let deliveryIds = 0

class Neighborhood {
  constructor(name){
    this.id = ++neighborhoodIds
    this.name = name
    store.neighborhoods.push(this)
  }

deliveries()
{return store.deliveries.filter(delivery => neighborhoodIds === this.id)}

customers()
{return store.customers.filter(customer => neighborhoodIds === this.id)}

meals(){
    return this.deliveries().reduce((list, delivery) => {
      list.push(delivery.meal())
      return [... new Set(list)]
    },[])
  }
};

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerIds
    this.name = name
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }

  deliveries()
  {return store.deliveries.filter(delivery => delivery.customerId === this.id)}

  meals()
  {return this.deliveries().map(delivery => delivery.meal())}

  totalSpent()
  {return this.meals().reduce((total, meal) => (total += meal.price), 0)}
};

class Meal {
  constructor(title, price){
    this.id = ++mealIds
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  deliveries()
  {return store.deliveries.filter(delivery => delivery.mealId === this.id)}
   customers(){
    const allCustomers = this.deliveries().map(delivery => delivery.customer())
    const uniqueCustomers = [...new Set(allCustomers)]
    return uniqueCustomers
  }
   static byPrice(){
    return store.meals.sort((m1, m2) => m2.price - m1.price)
  }
 };
 class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.id = ++deliveryIds
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    store.deliveries.push(this)
  }
   meal()
  {return store.meals.find(meal => meal.id === this.mealId)}
   customer()
  {return store.customers.find(customer => customer.id === this.customerId)}
   neighborhood()
  {return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)}
 };
