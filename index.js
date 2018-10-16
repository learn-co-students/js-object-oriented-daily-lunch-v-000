// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodsId = 0;
class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodsId;
    this.name = name;
    store.neighborhoods.push(this);
  }

  deliveries(){
    return store.deliveries.filter(deliverie => deliverie.neighborhoodId === this.id);
  }
  customers(){
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }

  // I'm stuck here
  meals(){
    let resArr = []
    store.meals.filter(function (meal) {
      let i = resArr.findIndex(x => x.title == meal.title);
      if (i <= -1) {
        resArr.push({ id: meal.id, title: meal.title });
      }
      return null;
    });
    return resArr;
  }





}

let customersId = 0;
class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customersId;
    this.name = name;
    if (neighborhoodId) {
      this.neighborhoodId = neighborhoodId;
    }
    store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter(deliverie => deliverie.customerId === this.id);
  }
  meals(){
    const customerDeliveries = this.deliveries()
    return customerDeliveries.map(delivery => delivery.meal() ) ;
  }
  totalSpent(){
    const meals = this.meals();
    let initialValue = 0;
    let sum = meals.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.price;
    }, initialValue)
    return sum;   
  }
}

let mealsId = 0;
class Meal {
  constructor(title, price) {
    this.id = ++mealsId;
    this.title = title;
    this.price = price;
    store.meals.push(this)
  }
  //returns all deliveries associated with a given meal
  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  }
  customers(){
    const customerDeliveries = this.deliveries()
    return customerDeliveries.map(delivery => delivery.customer() );
  }
  static byPrice(){
    return store.meals.sort((a ,b) => a.price < b.price);
  //   return store.meals.sort(function (a, b ) {
  //     if (a.price > b.price) {
  //      return -1;
  //     } else if (a.price < b.price)  {
  //      return 1;
  //    }else{
  //      return 0;
  //    }
  //  } );
  }


}

let deliveriesId = 0;
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.customerId = customerId;
    this.neighborhoodId = neighborhoodId;
    this.id = ++deliveriesId
    store.deliveries.push(this)
  }
  meal(){
    return store.meals.find(meal => this.mealId === meal.id) ;
  }
  customer(){
    return store.customers.find(customer => this.customerId === customer.id);
  }
  neighborhood(){
    return store.neighborhoods.find(neighborhood => this.neighborhoodId === neighborhood.id);
  }

}
