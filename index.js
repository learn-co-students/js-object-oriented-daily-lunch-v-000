let store = {deliveries:[], employers: [], meals: [], customers: []}

let deliveryId = 0
class Delivery {
  constructor(meal = {}, customer = {}){
    this.id = ++deliveryId
    this.mealId = meal.id
    this.customerId = customer.id
    store.deliveries.push(this)
  }
  meal(){
    return store.meals.find((meal) => { return meal.id === this.mealId })
}
customer(){
  return store.customers.find((customer) => { return customer.id === this.customerId })
}
}

let mealId = 0
class Meal{
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }

  customers(){
    return this.deliveries().map((delivery) => {return delivery.customer()})
    }

    static byPrice() { //class method
    return store.meals.sort((meal1, meal2) => {
      return meal1.price < meal2.price;
    });
  }
}

let customerId = 0
class Customer {
  constructor(name,employer={}){ //makes it easier to associate to a model and ensures they're connected to one
    this.id = ++customerId
    this.name = name
    this.employerId = employer.id
    store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  meals(){
    return this.deliveries().map((delivery) => {return delivery.meal()})
    }

    totalSpent() {
    return this.meals().reduce(function(sum, meal) {
      return sum + meal.price;
    }, 0);
  }
}

let employerId = 0
class Employer{
  constructor(name){
    this.id = ++employerId
    this.name = name
    store.employers.push(this)
  }
  employees(){
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    })
  }

  deliveries(){
    let allDeliveries = this.employees().map(employee => {return employee.deliveries()})

    let merged = [].concat.apply([], allDeliveries); //concatenates all the itms so they're not in individ hashes
    return merged;
  }

  meals(){
    let allMeals = this.deliveries().map(delivery => {return delivery.meal()})
   let unique = [...new Set(allMeals)]
   return unique
  }

  mealTotals() {
      let allMeals = this.deliveries().map(delivery => {
        return delivery.meal();
      });
      let lineItems = {};
      allMeals.forEach(function(meal) {
        lineItems[meal.id] = 0;
      });
      allMeals.forEach(function(meal) {
        lineItems[meal.id] += 1;
      });
      return lineItems;
    }

}
