// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodsId = 0;

class Neighborhood{
  constructor(name){
    this.id = ++neighborhoodsId;
    this.name = name;

    store.neighborhoods.push(this);
  }

  deliveries(){
    return store.deliveries.filter(
      function (delivery){
        return delivery.neighborhoodId === this.id;
      }.bind(this)
    );
  }

  customers(){
    return store.customers.filter(
      function (customer){
        return customer.neighborhoodId === this.id;
      }.bind(this)
    );
  }

  meals(){
    const allMeals = this.deliveries().map(delivery =>{
      return delivery.meal();
    });
    const uniqueMeals = [...new Set(allMeals.map(meal => meal.id))];
    return uniqueMeals;
  }
}

let customerId = 0;

class Customer{
  constructor(name, neighborhoodId){
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;

    store.customers.push(this);
  }

  deliveries(){
    return store.deliveries.filter(
      function (delivery){
        return delivery.customerId === this.id;
      }.bind(this)
    );
  }

  meals(){
    return this.deliveries().map(delivery =>{
      return delivery.meal();
    });
  }

  totalSpent(){
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
  }

}

let mealId = 0;

class Meal{
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter(
      function(delivery){
        return delivery.mealId === this.id;
      }.bind(this)
    );
  }

  customers(){
    return this.deliveries().map(delivery => {
      return delivery.customer();
    })
  }

  static byPrice(){
    let sortedMeals = store.meals.sort(function(a,b){
      let priceA = a.price;
      let priceB = b.price;
      if(priceA < priceB){
        return 1;
      }
      if(priceA > priceB){
        return -1;
      }
      return 0;
    });
    return sortedMeals;
  }
}

let deliveryId = 0;

class Delivery{
  constructor(mealId, neighborhoodId, customerId){
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;

    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find(
      function(meal){
        return meal.id === this.mealId;
      }.bind(this)
    )
  }

  customer(){
    return store.customers.find(
      function(customer){
        return customer.id === this.customerId;
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
