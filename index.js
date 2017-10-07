let store = {customers: [], meals: [], delieveries: [], employers: []}
let customerId = 0;
class Customer {
  constructor(name, employer){
    this.id = ++customerId
    this.name = name
    if (employer){
      this.employerId = employer.id
    }
    store.customers.push(this)
  }
  meals(){
    return this.deliveries().map((delivery) => {
      return delivery.meal();
    })
  }
  deliveries(){
    return store.deliveries.filter((delivery) => {
      return delivery.customerId === this.id;
    })
  }
  totalSpent(){
    let spent = 0;
    let array = this.meals();
    array.forEach((meal) => {
      spent = spent + meal.price;
    });
    return spent;
  }
}
let mealId = 0;
class Meal {
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }
  deliveries(){
     return store.deliveries.filter((function(meal){
      return this.mealId === meal.meal.Id;
    }), this);
  }
  customers(){
    return this.deliveries().map((function(delivery){
        return delivery.customer()
    }), this);
  }
  static byPrice(){
      return store.meals.sort(function compare(a,b) {
        if (a.price < b.price)
          return 1;
        if (a.price > b.price)
          return -1;
          return 0;
        });
  }
}
let deliveryId = 0;
class Delivery{
  constructor(meal, customer){
    this.id = ++deliveryId
    if (meal) {
      this.mealId = meal.id
    }
    if (customer) {
      this.customerId = customer.id
    }
    store.deliveries.push(this)
  }
  meal(){
    return store.meals.find((function(meal){
      return this.mealId === meal.id;
    }), this);
  }
  customer(){
    return store.customers.find((function(customer){
      return this.customerId === customer.id;
    }), this);
  }
}
let employerId = 0;
class Employer {
  constructor(name){
    this.id = ++employerId
    this.name = name
    store.employers.push(this)
  }
  employees(){
    return store.customers.filter(function(cust) {
        return cust.employerId === this.id
    }.bind(this))
  }
  deliveries(){
    const employerDels = this.employees().map(function(emp) {
        return emp.deliveries();
    })
    const flatEmpDels = [].concat(...employerDels)
    return flatEmpDels
  }
  meals(){
    const empEats = this.deliveries().map(function(dels) {
         return dels.mealId
     })
     const uniqueEats = [...new Set(empEats)]
     const uniqueMeals = uniqueEats.map(function(el) {
        return store.meals.find(function(ele) {
             return ele.id === el
         })
     })
     return uniqueMeals
  }
  mealTotals(){
    const empMeals = this.deliveries().map(function(dels) {
        return dels.mealId
    })
    const newObj = {}
    for(const element of empMeals) {
        let count = empMeals.filter(function(x) { return x == element}).length
    newObj[element] = count
    }
    return newObj;
   };
}
