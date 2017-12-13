const store = { deliveries: [], meals: [], employers: [], customers: [] }

let deliveryId = 0;
class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId;
    if (meal) { this.mealId = meal.id; }
    if (customer) { this.customerId = customer.id; }
    store.deliveries.push(this);
  }
  customer() {
    return store.customers.find( c => {
      return c.id === this.customerId;
    })
  }
  meal() {
    return store.meals.find( m => {
      return m.id === this.mealId;
    })
  }
}


let mealId = 0;
class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    if (title) { this.title = title; }
    if (price) { this.price = price; }
    store.meals.push(this);
  }

  static byPrice() {
       const sorter = function(num1, num2) {
       return num2.price - num1.price;
     }
     return store.meals.sort(sorter);
  }

  deliveries() {
    return store.deliveries.filter( d => {
      return d.mealId === this.id;
    })
  }

  customers() {
   const customerIds = this.deliveries().map( d => d.customerId);
   const customers = [];
   for(var c of store.customers) {
     if (customerIds.includes(c.id)){
       customers.push(c);
     }
   }
   return customers;
 }
}

let employerId = 0;
class Employer {
  constructor(name) {
    this.name = name;
    this.id = ++employerId;
    store.employers.push(this);
  }
  employees() {
    return store.customers.filter( c => {
      return c.employer === this;
    })
  }

  deliveries() {
   const employees = this.employees();
   const deliveries = [];
   for(var e of employees) {
     deliveries.push(e.deliveries());
   }
   var merged = [].concat.apply([], deliveries);
   return merged;
 }

 meals() {
   const employees = this.employees();
   const meals = [];
   for(var e of employees) {
     meals.push(e.meals());
   }
    var merged = [].concat.apply([], meals);
    var unique = merged.filter( onlyUnique );
    return unique;
  }

  mealTotals() {
     const employees = this.employees();
     const meals = [];
     for(var e of employees) {
       meals.push(e.meals());
     }
     var merged = [].concat.apply([],meals);

     let result = {};
     for(var m of merged) {
        if (result[m.id]) {
           result[m.id]++
         }
        else {
         result[m.id] = 1;
       }
     }
     return result;
   }
}

let customerId = 0;
class Customer {
  constructor(name, employer) {
    this.name = name;
    this.id = ++customerId;
    if (employer) { this.employer = employer; }
    store.customers.push(this);

  }
  deliveries() {
    return store.deliveries.filter( d => {
      return d.customerId === this.id;
    })
  }
  meals() {
    const mealIds = this.deliveries().map( d => d.mealId );
    const meals = [];
    for(var m of store.meals) {
      if (mealIds.includes(m.id)){
        meals.push(m);
      }
    }
    return meals;
  }

  totalSpent() {
    const prices = this.meals().map( m => m.price )
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return prices.reduce(reducer);
  }
}


////////////////////////////////////////

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
