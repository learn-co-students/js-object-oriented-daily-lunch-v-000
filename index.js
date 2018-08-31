// store = {
//   meal: [has_many_customers],
//   customers: [has_many deliveries, has_many meals through deliveries, belongs_to neighborhood],
//   deliveries: [belongs_to meal, belongs_to customer, belongs_to neighborhood],
//   neighborhoods: [has_many deliveries, has_many customers through deliveries, has_many meals through deliveries],
    // employers: [has_many employees,]
// }
let store = {meals:[], customers:[], deliveries:[], neighborhoods:[], employers:[]};

let neighborhoodIdCounter = 0;
class Neighborhood{
  constructor(name){
    this.name = name;
    this.id = ++neighborhoodIdCounter;
    store.customers.push(this);
  }
  deliveries(){
    return store.deliveries.find(d => d.neighborhoodId === this.id);
  }
  customers(){
    return this.deliveries().map(delivery => delivery.customer());
  }
  // meals(){
  //
  // }
}

let customerIdCounter = 0;
class Customer{
  constructor(name, employer){
    this.id = ++customerIdCounter;
    // this.neighborhoodId = neighborhoodId;
    if (employer){
      this.employerId = employer.id;
    }
    this.name = name;
    store.customers.push(this);
  }

  deliveries(){
    // return store.deliveries.map(d => d.id === ?)
    // console.log(this.id);
    // console.log(store.deliveries.filter(d => d.customerId === this.id));
    return store.deliveries.filter(d => d.customerId === this.id);
  }
  meals(){
    return this.deliveries().map( delivery => delivery.meal());
  }
  totalSpent(){
    // let total = 0;
    // console.log(this.meals());
    // console.log(this.meals().map(value => value.price).reduce((acc, curr) => acc + curr, 0));
    // var total = this.meals().reduce((acc, curr) => acc.price + curr.price, 0);
    // console.log(total);
    return this.meals().map(value => value.price).reduce((acc, curr) => acc + curr, 0);
  }
}

let mealIdCounter = 0;
class Meal{
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealIdCounter;
    store.meals.push(this);
  }
  deliveries(){
    // console.log(store.deliveries.filter(d => this.id === d.mealId));
    return store.deliveries.filter(d => this.id === d.mealId);
  }
  customers(){
    // console.log(store.customers.filter(c => c.id == this.deliveries().customerId));
    // console.log(this.deliveries().map(delivery => delivery.customer()));
    return this.deliveries().map(delivery => delivery.customer());
  }
  static byPrice(){
    return store.meals.sort(function(a, b) {
      return a.price - b.price;
    }).reverse();
  }
}

let deliveryIdCounter = 0;
class Delivery{
  constructor(meal, customer){
    if (meal){
      this.mealId = meal.id;
    }
    if (customer){
      this.customerId = customer.id;
    }
    this.id = ++deliveryIdCounter;
    store.deliveries.push(this);
  }
  meal(){
    return store.meals.find(m => m.id === this.mealId);
  }
  customer(){
    return store.customers.find(c => c.id === this.customerId);
  }
  neighborhood(){
    // return store.neighborhoods.find(n => n.id === this.neighborhoodId);
  }
}

let employerIdCounter = 0;
class Employer{
  constructor(name){
    this.name = name;
    this.id = ++employerIdCounter;
    store.employers.push(this);
  }
  employees(){
    return store.customers.filter(c => c.employerId === this.id);
    // console.log(this.id);
  }
  deliveries(){
    // return this.deliveries().map(delivery => delivery.customer());
    // console.log(this.id);
    console.log(this.employees());
    // console.log(this.employees().map(e => e.deliveries()));
    console.log( this.employees().map(e => e.id));
    // return store.deliveries.filter(delivery => delivery.id ===);
    let deliveryIds = this.employees().map(e => e.id);
    let allDeliveries = [];
    deliveryIds.forEach(function(item){
      var found = store.deliveries.find(d => d.id === item);
      if (!allDeliveries.find(m => m.mealId === found.mealId)){
        allDeliveries.push(found);
      }
    })
    return allDeliveries;
    // return this.employees().map(e => e.deliveries());
  }

  meals(){
    return this.deliveries().map(m => m.meal());
  }

  mealTotals(){
    // console.log(this.meals().reduce());
    // return this.meals().map(value => value.price).reduce((acc, curr) => acc + curr, 0);
  }

}
