let store = {deliveries: [], meals: [], customers: [], employers: []};
let mealId = 0;
let customerId = 0;
let deliveryId = 0;
let employerId = 0;

class Delivery{
  constructor(meal, customer){
    this.id = ++deliveryId;
    if(meal){
      this.mealId = meal.id;
    }
    if(customer){
      this.customerId = customer.id;
    }
    //store Delivery
    store.deliveries.push(this);
  }
  meal(){
    //returns the meal associated with the delivery
    return store.meals.find((meal) => meal.id === this.mealId);
  }
  customer(){
    //returns the customer associated with the delivery
    return store.customers.find((customer) => customer.id === this.customerId)
  }


}

class Meal{
  constructor(title, price){
    this.id = ++mealId;
    if(title){
      this.title = title;
    }
    if(price){
      this.price = price;
    }
    //store Meal
    store.meals.push(this);
  }
  static byPrice(){
    return store.meals.sort((meal1, meal2) => meal1.price < meal2.price);
  }
  deliveries(){
    return store.deliveries.filter((delivery) => delivery.mealId === this.id);
  }
  customers(){
    return this.deliveries().map(delivery => delivery.customer());
  }


}

class Employer{
  constructor(name){
    this.id = ++employerId;
    if(name){
      this.name = name;
    }
    store.employers.push(this);
  }

  employees(){
    return store.customers.filter((customer) => customer.employerId === this.id);
  }

  deliveries(){
    let employeeDeliveries = this.employees().map(customer => {
      return customer.deliveries();
    });
    let merged = [].concat.apply([], employeeDeliveries);
    return merged;
  }

  meals() {
    let allDeliveredMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    let meals = [...new Set(allDeliveredMeals)];
    return meals;
  }

  mealTotals() {
    let allDeliveredMeals = this.deliveries().map(delivery => delivery.meal());
    let displayObject = {};
    allDeliveredMeals.forEach(meal => displayObject[meal.id] = 0);
    allDeliveredMeals.forEach(meal => displayObject[meal.id] += 1);
    return displayObject;
  }
}

class Customer{
  constructor(name, employer){
    this.id = ++customerId;
    if(name){
      this.name = name;
    }
    if(employer){
      this.employerId = employer.id
    }
    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter((delivery) => delivery.customerId === this.id);
  }

  meals(){
    //returns all of the meals that a customer has had delivered
    return this.deliveries().map((delivery) => delivery.meal());
  }

  totalSpent(){
    //returns the total amount that the customer has spent, as a function of the cost of the meals he has had delivered
    let allDeliveries = this.deliveries();
    let prices = allDeliveries.map(meal => meal.meal().price);
    return prices.reduce(function(sum, value){
      return sum + value;
    }, 0);

  }

}
