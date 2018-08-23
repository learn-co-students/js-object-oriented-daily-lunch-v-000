// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Neighborhood{
    constructor(name){
      this.name = name;
      this.id = ++neighborhoodId;
      store.neighborhoods.push(this);
    }
    deliveries(){
      return store.deliveries.filter(delivery =>{
        return delivery.neighborhoodId === this.id;
      })
    }
    customers(){
      return store.customers.filter(cust =>{
        return cust.neighborhoodId === this.id;
      })
    }
    meals(){
      const notUniqueMeals = this.deliveries().map(function(delivery){
            return store.meals.find(function(meal){
              return meal.id === delivery.mealId
            })
            // debugger;
            //     return delivery.customerId === this.id;
            })
            const uniqueMeals = [...new Set(notUniqueMeals)]
            return uniqueMeals;
    }
    // const notUniqueMeals = store.meals.filter(meal=>{
    //     return meal.neighborhoodId === this.id;
    //   })

    // }
}
class Customer{
    constructor(name,neighborhoodId){
      this.name = name;
      this.neighborhoodId = neighborhoodId;
      this.id = ++customerId;
      store.customers.push(this);
    }
    deliveries(){
      return store.deliveries.filter(delivery=>{
        return delivery.customerId === this.id;
      })
    }
    meals(){
    return this.deliveries().map(function(delivery){
          return store.meals.find(function(meal){
            return meal.id === delivery.mealId
          })
          // debugger;
          //     return delivery.customerId === this.id;
          })
    }

    totalSpent(){
      // returns the total amt that cust spent on food
    return  this.meals().reduce(function(total,m){
        return m.price + total
      },0)
    }
}

class Meal{
    constructor(title,price){
      this.title = title;
      this.price = price;
      this.id = ++mealId;
      store.meals.push(this);
    }
    deliveries(){
      return store.deliveries.filter(delivery=>{
        return delivery.mealId === this.id;
      })
    }
    customers(){
      return this.deliveries().map(function(delivery){
            return store.customers.find(function(cust){
              return cust.id === delivery.customerId
            })
            // debugger;
            //     return delivery.customerId === this.id;
            })
        }
      // const notUniqueCust = store.customers.filter(cust=>{
      //       debugger;
      //       return cust.mealId === this.id;
      //     })
      //     const uniqueCust = [...new Set(notUniqueCust)];
      //     return uniqueCust;
      //   }
      //
static byPrice(){
  return store.meals.slice().sort(function(num1,num2){
            return num2.price - num1.price;
          }) }
          // a class method that orders meal instance by price in
          // descending order - user static keyword.
}

class Delivery{
    constructor(mealId,neighborhoodId,customerId){
      this.mealId = mealId;
      this.neighborhoodId = neighborhoodId;
      this.customerId = customerId;
      this.id = ++deliveryId;
      store.deliveries.push(this);
    }
    meal(){
      return store.meals.find(function(meal){
        return meal.id === this.mealId;
      }.bind(this))
    }
    customer(){
      return store.customers.find(function(customer){
        return customer.id === this.customerId;
      }.bind(this))
    }
    neighborhood(){
      return store.neighborhoods.find(function(neighborhood){
        return neighborhood.id === this.neighborhoodId;
      }.bind(this))
    }
}
