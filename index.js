// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let customerId = 0
let mealId = 0
let neighborhoodId = 0
let deliveryId = 0 

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}


class Meal {
    constructor(title, price){
        this.id = ++mealId
        this.title = title
        this.price = price
        store.meals.push(this)
    }


  deliveries(){
    return store.deliveries.filter(delivery =>{
      return delivery.mealId === this.id
    })}

    customers(){
      return this.deliveries().map(delivery =>{
        return delivery.customer()
      })
    }

    static byPrice(){
     return store.meals.sort(function(meal1, meal2){
        return meal2.price - meal1.price  
        });
  
    }
}

class Neighborhood{
  constructor(name){
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this)
  }
 deliveries(){
    return store.deliveries.filter(delivery =>{
      return delivery.neighborhoodId === this.id
    })
  }
  customers(){
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    })
  }

  meals(){
   return this.deliveries().map(delivery =>{
        return delivery.meal()
    }).filter(onlyUnique) 
  }
}

class Customer{
  constructor(name, neighborhood){
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhood;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
        return delivery.customerId === this.id;
      })
  }

  meals(){
    return this.deliveries().map(delivery => {
      return store.meals.find(
        function(meal){
          return meal.id === delivery.mealId
        }.bind(this)
      )
    })
  }
  totalSpent(){
    return this.meals().map(meal =>{
      return meal.price
    }).reduce(function (total, price){
      return price + total;
    }, 0);
  }

}

class Delivery {
    constructor(meal, neighborhood, customer){
        this.id = ++deliveryId
        this.mealId = meal
        this.neighborhoodId = neighborhood
        this.customerId = customer
        store.deliveries.push(this)
    }
    meal(){
        return store.meals.find(
          function(meal){
            return meal.id === this.mealId
          }.bind(this)
        )
      }
      customer(){
        return store.customers.find(
          function(customer){
            return customer.id === this.customerId
          }.bind(this)
        )
      }
      neighborhood(){
        return store.neighborhoods.find(
          function(neighborhood){
            return neighborhood.id === this.neighborhoodId;
          }.bind(this)
        )
      }
}


