// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
class Neighborhood {
    constructor(name){
      this.id = ++neighborhoodId
      this.name = name

      store.neighborhoods.push(this)
    }

    deliveries(){
      return store.deliveries.filter( delivery => delivery.neighborhoodId === this.id)
    }

    customers() {
      return store.customers.filter(customer => customer.neighborhoodId === this.id)
    }

    meals(){
      const allMeals = this.customers().map(customer => customer.meals())
      const newArray = [].concat.apply([], allMeals);
      return [...new Set(newArray)];
    }
  }

let customerId = 0

  class Customer {
      constructor(name, neighborhoodId) {
        this.id = ++customerId
        this.neighborhoodId = neighborhoodId
        this.name = name

        store.customers.push(this)
      }

    deliveries() {
        return store.deliveries.filter(delivery => delivery.customerId === this.id)
      }

    meals() {
      return this.deliveries().map(delivery => delivery.meal())
    }

    totalSpent() {
      return this.meals().reduce((total, meal)=> (total += meal.price), 0);
    }
  }

  let mealId = 0

  class Meal {
      constructor(title, price) {
        this.id = ++mealId
        this.title = title
        this.price = price

        store.meals.push(this);
      }

    deliveries() {
      return store.deliveries.filter(delivery => delivery.mealId === this.id)
    }

    // not fixed
    customers() {
      return this.deliveries().map(delivery => delivery.customer())
    }

    static byPrice(price) {
      return store.meals.sort((a, b)=> a.price < b.price)
    }
  }

  let deliveryId = 0

  class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
      this.id = ++deliveryId
      this.mealId = mealId
      this.neighborhoodId = neighborhoodId
      this.customerId = customerId

      store.deliveries.push(this);
    }

    meal() {
      return store.meals.find(meal => meal.id === this.mealId)
    }

    customer() {
      return store.customers.find(customer => customer.id === this.customerId)
    }

    neighborhood() {
      return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
    }
  }
