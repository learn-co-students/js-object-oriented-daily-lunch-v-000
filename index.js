let store = { customers: [], meals: [], deliveries: [], employers: []}


let deliveryId = 0

class Delivery {
    constructor(meal, customer) {
        this.id = ++deliveryId

        if (meal) {
            this.mealId = meal.id
        }

        if (customer) {
            this.customerId = customer.id
        }

        store.deliveries.push(this)
    }

    customer() {
        return store.customers.find( customer => {
            return customer.id === this.customerId
        })
    }

    meal() {
        return store.meals.find( meal => {
            return meal.id === this.mealId
        })
    }
}


let mealId = 0

class Meal {
    constructor(title, price) {
        this.id = ++mealId
        this.title = title
        this.price = price

        store.meals.push(this)

    }

    static byPrice() {
        const a=store.meals.sort( (a,b) => {
            return a.price < b.price
        })
        return a
    }

    deliveries() {
        return store.deliveries.filter( delivery => {
            return delivery.mealId === this.id
        })
    }

    customers() {
        return this.deliveries().map( delivery => {
            return delivery.customer()
        })
    }
}


let customerId = 0

class Customer {
    constructor(name, employer) {
        this.id = ++customerId
        this.name = name

        if (employer) {
            this.employerId = employer.id
        }

        store.customers.push(this)
    }
    setEmployerId(employer) {
        this.employerId = employer.id
    }

    deliveries() {
        return store.deliveries.filter( delivery => {
            return delivery.customerId === this.id
        })
    }

    meals() {
        return this.deliveries().map( delivery => {
            return delivery.meal()
        })
    }

    totalSpent() {
        return this.meals().reduce( ( agg, b ) => {
            return agg + b.price
        }, 0 )
    }

}

let employerId = 0

class Employer {
    constructor(name) {
        this.id = ++employerId
        this.name = name

        store.employers.push(this)
    }

    employees() {
        return store.customers.filter( customer => {
            return customer.employerId === this.id
        })
    }

    deliveries() {
        const customerOrders= this.employees().map( customer => {
            return customer.deliveries()
        })
        const allEmployeeOrders = customerOrders.reduce(function(a,b){ return a.concat(b) }, []);
        return allEmployeeOrders

    }


    meals() {
        const allMeals = this.deliveries().map ( delivery => {
            return delivery.meal()
        })
         const uniqueArray = allMeals.filter(function(meal, index) {return allMeals.indexOf(meal) === index;});
         return uniqueArray
    }

    mealTotals() {
        const meals = this.deliveries().map( delivery => {
            return delivery.meal()
        })
        const justMealId = meals.map( meal => meal.id)
        const mealTotal = justMealId.reduce(function(m,v){
          m[v] = (m[v]||0)+1; return m;
        }, {});
        return mealTotal
    }
}



employer = new Employer('Initech');
otherEmployer = new Employer('Chachees');
customer = new Customer('Fred', employer);
chicken = new Meal('Chicken Parm', 8);
steak = new Meal('Steak', 20);
fries = new Meal('Fries', 8);

firstDelivery = new Delivery(chicken, customer);
secondCustomer = new Customer('Susan', employer);
thirdCustomer = new Customer('Sally', otherEmployer);
secondDelivery = new Delivery(chicken, secondCustomer);
thirdDelivery = new Delivery(chicken, thirdCustomer);


fredDelivery2 = new Delivery(steak, customer);
fredDelivery3 = new Delivery(chicken, customer);
fredDelivery4 = new Delivery(fries, customer);
fredDelivery5 = new Delivery(steak, customer);

console.log(employer.employees())
console.log(employer.meals())
console.log(employer.mealTotals())
