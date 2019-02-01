// * `deliveries()` - returns all deliveries in  neighborhood
// * `customers()` - returns all customers in neighborhood
// * `meals()` - returns a **unique** list of meals that have been ordered in a particular neighborhood (you might want to do this one last)

// * `deliveries()` — returns all of the deliveries that customer has received
// * `meals()` - returns all meals that a customer has ordered
// * `totalSpent()` - returns the total amount that the customer has spent on food.

// * `deliveries()` - returns all of the deliveries associated with a particular meal.
// * `customers()` - returns all of the customers who have had the meal delivered. Be careful not to return the same customer twice if they have ordered this meal multiple times.
// * `byPrice()` - A **[class method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static)** that orders all meal instances by their price in descending order. Use the `static` keyword to write a class method.

// * `new Delivery()` — initialized with `mealId`, `neighborhoodId`, and `customerId`. It returns an object that has attributes of `mealId`, `neighborhoodId`, `customerId`, and `id`
// * `meal()` - returns the meal associated with a particular delivery
// * `customer()` - returns the customer associated with a particular delivery
// * `neighborhood()` - returns the neighborhood associated with a particular delivery
// class Delivery {
//   constructor(meal, neighborhood, customer) {
//     this.id = ++deliveryId;
//     this.mealId = mealId;
//     this.neighborhoodId = neighborhoodId;
//     this.customerId = customerId;
//   }
// }
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;

    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function (delivery) {
        return delivery.neighborhoodId === this.id;
      }.bind(this)
    )
  }

  customers() {
    return store.customers.filter(
      function (customer) {
        return customer.neighborhoodId === this.id;
      }.bind(this)
    )
  }

  meals() {
    let array = this.deliveries().map(
      function (delivery) {
        return delivery.meal()
      }
    )
    return [...new Set(array)];
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

  deliveries() {
    return store.deliveries.filter(
      function (delivery) {
        return delivery.mealId === this.id;
      }.bind(this)
    )
  }

  customers() {
    let array = this.deliveries().map(
      function (delivery) {
        return delivery.customer()
      }
    )
    return [...new Set(array)];
  }

  static byPrice() {
    return store.meals.sort(function (a, b) {
      return b.price - a.price;
    });
  }
}

let customerId = 0;
class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;

    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function (delivery) {
        return delivery.customerId === this.id
      }.bind(this)
    )
  }

  meals() {
    return this.deliveries().map(
      function (delivery) {
        return delivery.meal()
      }
    )
  }

  totalSpent() {
    return this.meals().reduce(
      function (total, currentValue) {
        return total + currentValue.price;
      }, 0);
  }
}

let deliveryId = 0;
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;

    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(
      function (meal) {
        return meal.id === this.mealId;
      }.bind(this)
    )
  }

  customer() {
    return store.customers.find(
      function (customer) {
        return customer.id === this.customerId;
      }.bind(this)
    )
  }

  neighborhood() {
    return store.neighborhoods.find(
      function (neighborhood) {
        return neighborhood.id === this.neighborhoodId;
      }.bind(this)
    )
  }
}