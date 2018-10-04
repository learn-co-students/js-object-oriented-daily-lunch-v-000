// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let customerId = 0;
let deliveryId = 0;
let mealId = 0;
class Neighborhood {
    constructor(name) {
        this.id = ++neighborhoodId;
        this.name = name;
        // if (user) {
        //     this.userId = user.id;
        // }
 
        // insert in the item to the store
        store.neighborhoods.push(this);
    }
    deliveries() {
        return store.deliveries.filter(
            function(delivery) {
                return delivery.neighborhoodId === this.id;
            }.bind(this)
        );
    }
     customers() {
      return store.customers.filter(
        function(customer) {
    
              return customer.neighborhoodId === this.id;
            }.bind(this)
          );
    }
    meals(){
      let mealsList = [];
      this.deliveries().forEach(function(delivery){
        if (!mealsList.includes(delivery.meal())){
          mealsList.push(delivery.meal());
        }
      });
      return mealsList;
    }
    
}

class Customer {
    constructor(name, neighborhoodId) {
        this.id = ++customerId;
        this.neighborhoodId = neighborhoodId;
        this.name = name;
        // if (user) {
        //     this.userId = user.id;
        // }
 
        // insert in the item to the store
        store.customers.push(this);
    }
    
    deliveries() {
      return store.deliveries.filter(function(delivery){
        return delivery.customerId === this.id;
      }.bind(this)
      );
    }
    meals() {
      let customerMeals = [];
      this.deliveries().forEach(function(delivery){
        customerMeals.push(delivery.meal());
      });
      return customerMeals;
    }
    totalSpent() {
      let total = 0;
      this.meals().filter(function(meal){
        total += meal.price;
      });
      return total;
    }

}

class Meal {
    constructor(title, price) {
        this.id = ++mealId;
        this.title = title;
        this.price = price;
        // if (user) {
        //     this.userId = user.id;
        // }
 
        // insert in the item to the store
        store.meals.push(this);
    }
    
    deliveries() {
      return store.deliveries.filter(function(delivery){
        return delivery.mealId === this.id;
      }.bind(this)
      );
    }
    
    customers(){
      let uniqueCustomers = [];
      store.deliveries.forEach(function(a){
        if (a.mealId === this.id){
          if (!uniqueCustomers.includes(a.customer())){
            uniqueCustomers.push(a.customer());
          }
        }
      }.bind(this));
      return uniqueCustomers;
    }
    
    static byPrice() {
      return store.meals.sort(
        (a, b) =>
          a.price < b.price
        );
    }
}

class Delivery{
    constructor(mealId, neighborhoodId, customerId) {
        this.id = ++deliveryId;
        this.mealId = mealId;
        this.neighborhoodId = neighborhoodId;
        this.customerId = customerId;
        // if (user) {
        //     this.userId = user.id;
        // }
 
        // insert in the item to the store
        store.deliveries.push(this);
    }
    customer(){
      return store.customers.find(function(customer){
        return customer.id === this.customerId;
      }.bind(this)
      );
    }
    neighborhood(){
      return store.neighborhoods.find(function(neighborhood){
        return neighborhood.id === this.neighborhoodId;
      }.bind(this)
      );
    }
    meal(){
      return store.meals.find(function(meal){
        return meal.id === this.mealId;
      }.bind(this)
      );
    }
}