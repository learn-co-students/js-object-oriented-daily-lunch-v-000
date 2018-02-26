
const store = {
  customers:[],
  meals:[],
  deliveries:[],
  employers:[]
};

let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

class Customer {
  constructor(name, employer) {
    this.id = customerId++;
    this.name = name;
    this.employer = employer;
    store.customers.push(this);
  }

  meals() {
    return store.meals
              .filter(m => m.customers()
                              .map(c => c.id)
                              .includes(this.id)
                            );
  }

  deliveries() {
    return store.deliveries.filter(d => d.customerId === this.id);
  }

  totalSpent() {
    return this.deliveries()
              .reduce(function(sum, current) {
                return sum += current.meal().price;
              }, 0)
  }
}

class Employer {
  constructor(name) {
    this.id = employerId++;
    this.name = name;
    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(c => c.employer.id === this.id);
  }

  deliveries() {
    return store.deliveries.filter(d => d.customer().employer.id === this.id);
  }

  meals() {
    return this.deliveries()
              .map(d => d.meal())
              .filter((obj, pos, arr) => {
                  return arr.map(mapObj => mapObj.id).indexOf(obj.id) === pos;
              });
  }

  mealTotals() {
    return this.deliveries()
              .map(d => d.meal())
              .reduce(function(obj, current) {
                if (!obj[current.id]) {
                  obj[current.id] = 1;
                }
                else {
                  obj[current.id]++;
                }
                return obj;
              }, {})
  }

}

class Meal {
  constructor(title, price) {
    this.id = mealId++;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(d => d.mealId === this.id);
  }

  customers() {
    return this.deliveries().map(d => d.customer());
  }

  static byPrice() {
    return store.meals.sort((a, b) => a.price < b.price);
  }
}

class Delivery {
  constructor(meal = {}, customer = {}) {
    this.id = deliveryId++;
    this.mealId = meal.id;
    this.customerId = customer.id;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(m => m.id === this.mealId)
  }
  customer() {
    return store.customers.find(c => c.id === this.customerId)
  }

}
