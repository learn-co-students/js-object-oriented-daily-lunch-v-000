let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

const store = {customers: [], meals: [], deliveries: [], employers: []};

class Customer {
  constructor(name, employer = {}) {
    this.name = name;
    this.employerId = employer.id;
    this.id = ++customerId;
    store.customers.push(this);
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })}
    
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
  })}
      
  totalSpent() {
    return this.meals().reduce(function(sum, meal) {
      return sum + meal.price;
    }, 0);
  }
  
}



class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    })}

  customers() {
    return store.deliveries.map(delivery => {
      return delivery.customer();
    })
  }

  static byPrice () {
    return store.meals.sort((meal1, meal2) => {
      return meal1.price < meal2.price
    })
  }

  

}

class Delivery {
  constructor(meal = {}, customer = {}) {
    this.mealId = meal.id;
    this.customerId = customer.id;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    })}

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    })}
}


class Employer {
  constructor (name) {
    this.name = name;
    this.id = ++employerId;
    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id;
    })}

  deliveries() {
    let all = this.employees().map(employee => {
      return employee.deliveries();
    });
    let merge = [].concat.apply([], all);
    return merge;
  }

  meals() {
    let all = this.deliveries().map(delivery => {
        return delivery.meal()
    })
    // Sets are ordered lists of values that contain no duplicates. Instead of being indexed like arrays are, sets are accessed using keys.
    let uniq = [...new Set(all)];
    return uniq;
  }

  mealTotals() {
    let meals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    let obj = {};
    for (const meal of meals) {
      obj[meal.id] = 0;
    }
    for (const meal of meals) {
      obj[meal.id] += 1;
    }
    return obj;
  }

}


