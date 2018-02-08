
let customerId = 0
let mealId = 100
let emId = 500
let deId = 800

let store = {employees: [], meals: [], customers: [], deliveries: [],employers: []}

class Customer{
  constructor(name,employer){
      if(arguments.length === 1){
        this.name = name
        this.id = customerId++

        store.customers.push(this)
      }
      else if (arguments.length ===2){
      this.name = name
      this.employerId = employer.id
      this.id = customerId++

      store.customers.push(this)
      }
      else{
        this.id = customerId++
        store.customers.push(this)
      }
    }

  meals(){
    let deliveriesId = []
    this.deliveries().forEach(ele =>{
      deliveriesId.push(ele.mealId)
    })

    return store.meals.filter( meal =>{
      return deliveriesId.includes(meal.id)
    })
    }

  deliveries(){
    return store.deliveries.filter( delivery =>{
      return delivery.customerId === this.id
    })
  }

  totalSpent(){
    return this.meals().reduce(function(acc,ele){
      return ele.price + acc
    },0)
  }
}

class Meal{
  constructor(title,price){
    this.title = title
    this.price = price
    this.id = mealId++

    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery =>{
      return delivery.mealId === this.id
    })
  }

  customers(){
    let customerIDs =[]
    this.deliveries().forEach(delivery=>{
    customerIDs.push( delivery.customerId)})



    return store.customers.filter(customer =>{
      return customerIDs.includes(customer.id)
    })
  }

  static byPrice(){
    return store.meals.sort(function(mealOne, mealTwo){
      return mealTwo.price - mealOne.price
    })
  }
}

class Delivery{


  constructor(meal,customer){
    if(arguments.length === 0){
      this.id = deId++
      store.deliveries.push(this)
    }else{
      this.mealId = meal.id
      this.customerId = customer.id
      this.id = deId++
      store.deliveries.push(this)
    }
  }

  meal(){
    return store.meals.find(meal =>{
      return meal.id === this.mealId
    }
    )
  }

  customer(){
    return store.customers.find(customer =>{
      return customer.id === this.customerId
    }
    )
  }
}

class Employer{
  constructor(name){
    this.name = name
    this.id = emId++

    store.employers.push(this)
  }

  employees(){
    return store.customers.filter(customer =>{
      return customer.employerId === this.id
    })
  }

  deliveries(){
    let employeeId = []
    this.employees().forEach(employee => {
      employeeId.push(employee.id)
    })

    return store.deliveries.filter(delivery => {
      return employeeId.includes(delivery.customerId)
    })
  }

  meals(){
    let mealIds = new Set([]);
    this.deliveries().forEach(delivery =>{
      mealIds.add(delivery.mealId)
    })

    return store.meals.filter(meal =>{
      return mealIds.has(meal.id)
    })
  }

  mealTotals(){
    let obj = new Object();

    this.meals().forEach(meal =>{
      obj[meal.id]=0
    })

    this.deliveries().forEach(delivery =>{
      obj[delivery.mealId]++
    })

    return obj
  }

}
