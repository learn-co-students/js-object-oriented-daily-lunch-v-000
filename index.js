// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodIds = 0
let mealIds = 0
let customerIds = 0
let delveryIds = 0



class Neighborhood {
  constructor(name){
    this.name = name;
    this.id = neighborhoodIds++;

    store.neighborhoods.push(this)
  }

  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodIds === this.neighborhoodIds
    })
}
    deliveries() {
      return store.deliveries.filter(neighborhood =>{
        return neighborhood.neighborhoodId === this.id
      })
    }
    // deliveries() - returns a list of all deliveries placed in a neighborhood


  // customers() - returns all of the customers that live in a particular neighborhood
  // items(){
  //   return store.items.filter(item => {
  //     return item.userId === this.id
  //   }
  // }

  meals(){
    const allMeals = this.meals.map(item => {

    })
  }
  // returns a unique list of meals orderd in a neighborhood
}


class Customer {
  constructor(name, neighborhoodId){
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = customerIds++;


    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(item => {
      return item.customerId === this.id;
    })
  }
  // deliveries() — returns all of the deliveries that customer has received
  meals(){
    return this.deliveries().map(delivery => {
      return delivery.meal();
    })
  }

  // meals() - returns all meals that a customer has ordered

  totalSpent(){
    return this.meals().reduce((total,item) => (total += item.price),0)
    }


  // totalSpent() - returns the total amount that the customer has spent on food.
}

class Meal {
  constructor(title, price){
    this.price = price;
    this.title = title;
    this.id = mealIds++;


    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(item =>{
      return item.mealId === this.id;
    })
  }
  // customers() - returns all of the customers who have had the meal delivered.
  // Be careful not to return the same customer twice if they have ordered this meal multiple times.

  customers(){
    const allCustomers = this.deliveries().map(delivery => delivery.customer());
    return [...new Set(allCustomers)];

    }

    static byPrice(){
      return store.meals.sort((x,y) => x.price < y.price);
    }

  // const sampleValues = [1, 4, 5, 2, 'a', 'e', 'b', 'e', 2, 2, 4];
  // const uniqueValues = [...new Set(sampleValues)];
  // console.log(uniqueValues); //[1, 4, 5, 2, "a", "e", "b"]
  // deliveries() - returns all of the deliveries associated with a particular meal.

}


class Delivery {
  constructor(mealId, neighborhoodId, customerId){

    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = delveryIds++;


    store.deliveries.push(this)

  }

  neighborhood() {
    return store.neighborhoods.find(item => {
     return item.id === this.neighborhoodId
    })
  }
  // neighborhood() - returns the neighborhood associated with a particular delivery

  customer() {
    return store.customers.find(item => {

      return this.customerId === item.id;
    })
  }


  meal(){
    return store.meals.find(meal => {

      return meal.id === this.mealId;
    })
  }
}
