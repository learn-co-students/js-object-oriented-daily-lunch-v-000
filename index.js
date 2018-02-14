let store = {customers: [], meals: [], deliveries: [], employers: []}
let customerId = 0
class Customer {
    constructor(name, employer) {
        this.name = name;
        this.id = ++customerId
        if (employer) {
            this.employerId = employer.id
            
        }
        store.customers.push(this)
    }
    
    meals() {
         return this.deliveries().map(delivery => delivery.meal())
        
    }
    
    deliveries() {
         return store.deliveries.filter(delivery => {
          return delivery.customerId === this.id
        })
        
    }
    
    totalSpent() {
         return this.meals().reduce( function(total, meal){
          return total + meal.price
        },0);
    }
    
}

let mealId = 0
class Meal {
    constructor(title, price) {
        this.title = title
        this.price = price 
        this.id = ++mealId
        store.meals.push(this)
    }
    
    deliveries() {
        return store.deliveries.filter(delivery => {
          return delivery.mealId === this.id
        })
        
    }
    
    customers() {
      return this.deliveries().map(delivery => delivery.customer())
        
    }
    
    static byPrice() {
        return store.meals.sort(function(a, b){return b.price-a.price});
    }
}

let deliveryId = 0
class Delivery {
    constructor(meal, customer) {
        if (meal) {
            this.mealId = meal.id
        }
        if (customer) {
            this.customerId = customer.id 
        }
        this.id = ++deliveryId
        store.deliveries.push(this)
    }
    
    meal() {
        return store.meals.find(meal => {
            return meal.id === this.mealId
        })
    }
    
    customer() {
        return store.customers.find(customer => {
            return customer.id === this.customerId
        })
    }
}


let employerId = 0
class Employer {
    constructor(name) {
        this.name = name
        this.id = ++employerId
        store.employers.push(this)
    }
    
    employees() {
        return store.customers.filter(customer =>
          {return customer.employerId === this.id}
        )
    }
    
    deliveries() {
        // let result = []
        let employerDe = this.employees().map(employee =>{ return employee.deliveries()})
        let result = [].concat.apply([], employerDe)
        return result
        // debugger
    }
    
    meals() {
        let employerMeal = this.deliveries().map(delivery =>{ return delivery.meal()})
        // let result = [...employerDe]
        let unique = [...new Set(employerMeal)];
        return unique
        // return this.employees().map(employee => employee.meals())
    }
    
    mealTotals() {
        
        let result = {}
        let numberOfMeal = this.deliveries().map(delivery =>{ return delivery.meal()})
        numberOfMeal.forEach(function(meal) {
            if (result[meal.id]) {
             result[meal.id]  +=1 
            } else {
                result[meal.id] = 1
            }
        })
        return result 
        
    }
}