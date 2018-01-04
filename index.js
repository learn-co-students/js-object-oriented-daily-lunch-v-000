
let store = {customers: [], meals: [], deliveries: [], employers: []}
  let customerId = 0;
  let mealId = 0;
  let deliveryId = 0;
  let employerId = 0;

  class Customer {
    constructor(name, employer = {}) {
      this.name = name
      this.id = ++customerId
      this.employerId = employer.id

      store.customers.push(this)
    }


    totalSpent() {
      let sum = 0;
      this.meals().forEach(function(element) {return sum += element.price})
      return sum;
    }

    deliveries() { return store.deliveries.filter(delivery => {return delivery.customerId === this.id})

    }
    meals() { return this.deliveries().map(delivery => {return delivery.meal()})

    }



  }

  class Employer {
    constructor(name) {
      this.name = name
      this.id = ++employerId

      store.employers.push(this)
    }

    employees() {return store.customers.filter(customer => customer.employerId === this.id)}

    deliveries() {
      let employer = this;
      let allDeliveries = [];
      let employeeArray = this.employees()
      employeeArray.forEach(function(employee) {
       let deliveryArray = employee.deliveries()
       for (let i=0; i<deliveryArray.length; i++)
       {allDeliveries.push(deliveryArray[i]);}
     })

      return allDeliveries;
      }

    meals() {

      let unflattenedArray = this.employees().reduce(function(array, employee) {
      return array.concat(employee.meals())
      }, [])
        return unflattenedArray.filter(function (meal, index, self)
            {return self.indexOf(meal) === index})
    }

    mealTotals() {
      let mealIdsToCount = this.meals().map(meal => {return meal.id});
      let deliveriesToCount = this.deliveries()
      let answer = {};
      mealIdsToCount.forEach(function(mealId)
      {return answer[mealId]=deliveriesToCount.filter(delivery => {return delivery.mealId === mealId}).length})
      return answer
      }
  }



  class Meal {
    constructor(title, price) {
      this.title = title
      this.price = price
      this.id = ++mealId

      store.meals.push(this)
    }

    static byPrice() {
      const new_array = Object.assign([],store.meals);
      return new_array.sort(numberSorter);}

      deliveries() { return store.deliveries.filter(delivery => {return delivery.mealId === this.id})}
      customers() { return this.deliveries().map(delivery => {return delivery.customer()})}

  }

  class Delivery {
    constructor(meal = {}, customer = {}) {
      this.mealId = meal.id
      this.customerId = customer.id
      this.id = ++deliveryId

      store.deliveries.push(this)

    }
    customer() { return store.customers.find(customer => {return customer.id === this.customerId})}
    meal() { return store.meals.find(meal => {return meal.id === this.mealId})}
  }


  function numberSorter(obj1, obj2) {
      return obj2.price - obj1.price;
    }
