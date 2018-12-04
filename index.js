let store = { deliveries: [], meals: [], customers: [], employers: []}

let neighborhoodId = 0;

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;
  }
}

let customerId = 0;

class Customer {
  constructor(name, employer) {
    this.id = ++customerId;
    this.name = name;
    if(employer) {
      this.employerId = employer.id;
    }

    store.customers.push(this);
  }

  totalSpent() {
    let i = 0;
    let total = 0;
    let matchedIds = store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.id;
      }.bind(this)
    );
    while (i < matchedIds.length) {
      let matchedMeals = store.meals.filter(
        function(meals) {
          return meals.id === matchedIds[i].mealId;
        }
      );
      i++;
      total += matchedMeals[0].price;
    }
    return total;
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.id;
      }.bind(this)
    );
  }

  meals() {
    let ids = [];
    this.deliveries().forEach(function(delivery) {
      ids.push(delivery.mealId);
    });
    return store.meals.filter(
      function(meal) {
        return ids.includes(meal.id);
      }
    );
  }
}

let mealId = 0;

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }

  static byPrice() {
    return store.meals.sort(function (a, b) {
      return b.price - a.price;
    });
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.mealId === this.id;
      }.bind(this)
    );
  }

  customers() {
    let ids = [];
    this.deliveries().forEach(function(delivery) {
      ids.push(delivery.customerId);
    });
    return store.customers.filter(
      function(customer) {
        return ids.includes(customer.id);
      }
    );
  }
}

let deliveryId = 0;

class Delivery {
  constructor (meal, customer) {
    this.id = ++deliveryId;
    if (meal) {
      this.mealId = meal.id;
    }
    if (customer) {
      this.customerId = customer.id;
    }

    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(
      function(meal) {
        return meal.id === this.mealId;
      }.bind(this)
    );
  }

  customer() {
    return store.customers.find(
      function(customer) {
        return customer.id === this.customerId;
      }.bind(this)
    );
  }

}

let employerId = 0;

class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;

    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(
      function(customer) {
        return customer.employerId === this.id;
      }.bind(this)
    );
  }

  deliveries() {
    let ids = [];
    this.employees().forEach(function(employee) {
      ids.push(employee.id);
    });
    return store.deliveries.filter(
      function(delivery) {
        return ids.includes(delivery.id);
      }
    );
  }

  meals() {
    let ids = [];
    this.deliveries().forEach(function(delivery) {
      ids.push(delivery.mealId);
    });
    return store.meals.filter(
      function(meal) {
        return ids.includes(meal.id);
      }
    );
  }

  mealTotals() {
    let ids = [];
    store.deliveries.forEach(function(delivery) {
      ids.push(delivery.mealId);
    });
    let mealCount = {};
    for(const el of ids) {
      let total = ids.filter(function(id) {return id == el}).length
      mealCount[el] = total;
    }
    console.log(ids);
    console.log(mealCount);
    return mealCount;
  }

}
