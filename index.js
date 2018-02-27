let store= {customers:[],meals:[],deliveries:[],employers:[]}
let id1=0
class Customer {
  constructor(name,employer){
    this.name=name
    this.id=++id1
    if (employer) {this.employerId=employer.id}
    store.customers.push(this)
  }
  setEmployer(employer){
    this.employerId=employer.id
  }
  meals(){
    let newdeliveries=store.deliveries.filter(delivery=>{return delivery.customerId===this.id})
    let mealids=newdeliveries.map(function(delivery){return delivery.mealId})
    return store.meals.filter(function(meal){
      if (mealids.includes(meal.id)){return meal}
    })
}
  deliveries(){return store.deliveries.filter(dilevery=>{return delivery.customerId===this.id})}
  totalSpent(){//take all the meals and add their prices.
      let prices=this.meals().map(function(meal){return meal.price})
      let total=0
      for (let i=0;i<prices.length;i++){
        total += prices[i]
      }
      return total
  }
//   function totalRevenue(meals){
//   return meals.reduce(function(agg,el,i,arr){return agg + el.price},0)
// }
}
let id2=0
class Meal {
    constructor(title,price){
    this.title=title
    this.price=price
    this.id=++id2
    store.meals.push(this)
  }
  deliveries(){return store.deliveries.filter(function(delivery){return delivery.mealId===this.id})}
  customers(){
    let newdeliveries=store.deliveries.filter(delivery=>{return delivery.mealId===this.id})
    let customerids=newdeliveries.map(function(delivery){return delivery.customerId})
    return store.customers.filter(function(customer){
      if (customerids.includes(customer.id)){return customer}
    })
  }
  static byPrice(){
    //meals=store.meals
    //const mealsCopy= [...meals]
    let sorted= store.meals.sort(function(meal1,meal2){
      return meal1.price-meal2.price
    })
    return sorted.reverse()
  }
}
let id3=0
class Delivery {
  constructor(meal,customer){
    this.id=++id3
    if (customer){this.customerId=customer.id}

    if (meal){this.mealId=meal.id}
    store.deliveries.push(this)
  }
  setCustomer(customer){
    this.customerId=customer.id
  }
  setMeal(meal){
    this.mealId=meal.id
  }
  customer(){store.customers.find(customer=>return customer.id===this.customerId)}
  meal(){store.meals.find(meal=>return meal.id===this.mealId)}
}
let id4=0
class Employer {
  constructor(name){
    this.name=name
    this.id=++id4
    store.employers.push(this)
  }
  employees(){return store.customers.filter(customer=>{return customer.employerId===this.id})}
  deliveries(){//linked through customers
    let newcustomers=store.customers.filter(customer=>{return customer.employerId===this.id})
    let customerids=newcustomers.map(function(customer){return customer.id}) // this step is different.
    return store.deliveries.filter(function(delivery){
      if (customerids.includes(delivery.customerId)){return delivery}
    })
}
  meals(){ //goes through customers then deliveries then meals
    let newcustomers=store.customers.filter(customer=>{return customer.employerId===this.id})
    let customerids=newcustomers.map(function(customer){return customer.id})//have the id's of the customers
    let newdeliveries=store.deliveries.filter(function(delivery){
      if (customerids.includes(delivery.customerId)){return delivery.mealId}
      })//have matching deliveries mealId
    return store.meals.filter(meal=>{
      debugger
      if (newdeliveries.includes(meal.id)){return meal}

  })
}

  mealTotals(){//WILL USING MEALS() and EMPLOYEES() RETURN VALUE WORK?
    let object={}
    debugger
    let meals=this.meals()
    meals.forEach(function(meal){
      let customerids= this.employees().map(function(customer){return customer.id})
      let deliveriesForEmployersCustomers= store.deliveries.filter(delivery=>{
        if (customerids.includes(delivery.customerId)){return delivery}
      })
      let count=0
      value= deliveriesForEmployersCustomers.forEach(function(delivery){
        if (delivery.mealId===meal.id){count+=1}
      })
      object[meal.id]= count
    })
  }
}
