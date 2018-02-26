let store= {customers:[],meals:[],deliveries:[]}
class Customer {
  let id1= 0
  constructor(name,employer){
    this.name=name
    this.id=++id1
    this.employerId=employer.id
  }
  meals(){
    let newdeliveries=store.deliveries.filter(dilevery=>{return delivery.customerId===this.id})
    let mealids=newdeliveries.map(function(delivery){return delivery.mealId})
    return store.meals.filter(function(meal){
      if (mealids.includes(meal.id)){return meal}
    })
}
  deliveries(){return store.deliveries.filter(dilevery=>{return delivery.customerId===this.id})}
  totalSpent(){}
}
class Meal {
  let id2=0
  constructor(title,price){
    this.title=title
    this.price=price
    this.id=++id2
  }
  deliveries(){return store.deliveries.filter(dilevery=>{return delivery.mealId===this.id})}
  customers(){
    let newdeliveries=store.deliveries.filter(delivery=>{return delivery.mealId===this.id})
    let customerids=newdeliveries.map(function(delivery){return delivery.customerId})
    return store.customers.filter(function(customer){
      if (customerids.includes(customer.id)){return customer}
    })
  }
  static byPrice(){}
}
let id3=0
class Delivery {
  constructor(meal,customer){
    this.id=++id3
    this.customerId=customer.id
    this.mealId=meal.id
  }
  customer(){return store.customers.find(customer=>return customer.id===this.customerId)}
  meal(){return store.meals.find(meal=>return meal.id===this.mealId)}
}
let id4=0
class Employer {
  constructor(name){
    this.name=name
    this.id=++id4
  }
  employees(){return store.customers.filter(customer=>{return customer.employerId===this.id})}
  deliveries(){//linked through customers
    let newcustomers=store.customers.filter(customer=>{return customer.employerId===this.id})
    let customerids=newcustomers.map(function(customer){return customer.id})
    return store.deliveries.filter(function(delivery){
      if (customerids.includes(delivery.customerId)){return delivery}
    }
}
  meals()
}
