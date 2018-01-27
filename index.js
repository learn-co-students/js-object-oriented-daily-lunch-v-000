let store = {customers: [], meals: [], deliveries: [], employers: []};

let customerId = 0;
  class Customer {
    constructor(name,employer) {
      this.id = ++customerId;
      if (name) this.name = name;
      if (employer) this.employerId = employer.id;
      store.customers.push(this);
    }
    //returns all of the meals that a customer has had delivered
    meals() {
      return this.deliveries().map(delivery => {
        return store.meals.find(meal => {
          return meal.id === delivery.mealId
        })
      })
    }
    //returns all of the deliveries that customer has received
    deliveries() {
      return store.deliveries.filter(delivery => {
        return delivery.customerId === this.id
      })
    }
    //returns the total amount that the customer has spent
    totalSpent() {
    return this.meals().reduce((a,b) => a + b.price, 0)
    }
  }

let mealId = 0;

  class Meal {
    constructor(title,price) {
      this.id = ++mealId;
      if (title) {
          this.title = title;
        }
      if (price) {
          this.price = price;
        }
        store.meals.push(this);
    }
    //returns all of the deliveries that delivered the particular meal
    deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
      })
    }
    //returns all of the customers who have had the meal delivered
    customers() {
    return this.deliveries().map(delivery => {
      return store.customers.find(customer => {
        return customer.id === delivery.customerId
        })
      })
    }
    //class method that orders the meals by their price
    static byPrice() {
      return store.meals.sort( (meal1,meal2) => {
        return meal2.price - meal1.price;
      })
    }
  }

let deliveryId = 0;

  class Delivery {
    constructor(meal,customer) {
    this.id = ++deliveryId;
    if (meal) {
        this.mealId = meal.id;
    }
    if (customer) {
        this.customerId = customer.id;
    }
    store.deliveries.push(this);
    }
    //returns the meal associated with the delivery
    meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId
      })
    }
    //returns the customer associated with the delivery
    customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId
      })
    }
  }

let employerId = 0;

  class Employer {
    constructor(name) {
    this.id = ++employerId;
    this.name = name;
    store.employers.push(this);
    }
    //returns a list of customers employed by the employer
    employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id
      })
    }
    //returns a list of deliveries ordered by the employer's employees
    deliveries() {
      let employerDeliveries =  [];
        store.deliveries.forEach(delivery => {
          let c = store.customers.find(customer => {
            return customer.id === delivery.customerId});
            if (c.employerId === this.id) {
              employerDeliveries.push(delivery);
            }
          })
          return employerDeliveries;
      }
      //returns a list of unique meals ordered by the employer's employees
    meals() {
      const employerMeals =  [];
      this.deliveries().forEach(delivery => {
      let m = store.meals.find(meal => {
        return meal.id === delivery.mealId}
        );
      if (employerMeals.find(employee => {
        return employee.id === m.id}) === undefined) {
          employerMeals.push(m);
        }
      })
      return employerMeals;
    }
    //returns a JS object displaying each respective meal id ordered by the employer's employees
    mealTotals() {
      const employerMealsCount =  {};
        this.deliveries().forEach(delivery => {
          if (Object.keys( employerMealsCount).indexOf( delivery.mealId.toString()) === -1) {
            employerMealsCount[delivery.mealId] = 1;
          }
          else {
            ++employerMealsCount[delivery.mealId];
          }
        })
        return employerMealsCount;
      }
    }
