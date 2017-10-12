let store = {drivers: [], passengers: [], trips: [], customers: [], meals: [], deliveries: [], employers: []}

let driverId = 0;
class Driver {
    constructor(name) {
        this.name = name
        this.id = ++driverId

        store.drivers.push(this)
    }
    trips() {
        return store.trips.filter(function(el, i, arr) {
            if(el.driverId === this.id) {
                return el
            }
        }.bind(this))
    }
    passengers() {
        const trippy = this.trips().filter(function(el, i, arr) {
            return el.passengerId
        })

        return trippy.map(function(el) {
            return store.passengers.find(function(ele) {
                return el.passengerId === ele.id
            })
        })
    }

}

let passengerId = 0;
class Passenger {
    constructor(name) {
        this.name = name
        this.id = ++passengerId

        store.passengers.push(this)
    }
    trips() {
        return store.trips.filter(function(el, i, arr) {
            if(el.passengerId === this.id) {
                return el
            }
        }.bind(this))
    }

    drivers() {
    const trippy = this.trips().filter(function(el, i, arr) {
            return el.driverId
        })

        return trippy.map(function(el) {
            return store.drivers.find(function(ele) {
                return el.driverId === ele.id
            })
        })
    }
}

let tripId = 0;
class Trip {
    constructor(driver, passenger) {
        if(driver) {
        this.driverId = driver.id
        }
        if(passenger) {
        this.passengerId = passenger.id
        }
        this.id = ++tripId

        store.trips.push(this)
    }
    passenger() {
        return store.passengers.find(function(passenger) {
            return passenger.id === this.passengerId
        }.bind(this))
    }
    driver() {
        return store.drivers.find(function(driver) {
            return driver.id === this.driverId
        }.bind(this))
    }
}


//CUSTOMERS//
let customerId = 0;
class Customer {
    constructor(name, employer) {
        this.name = name;
        this.id = ++customerId;
        if(employer) {
            this.employerId = employer.id
        }
        store.customers.push(this)
    }
    deliveries() {
        return store.deliveries.filter(function(del) {
            return del.customerId === this.id
        }.bind(this))
    }
    meals() {
        const yumyums = this.deliveries().filter(function(del, i, arr) {
            return del.mealId
        });
        return yumyums.map(function(el) {
            return store.meals.find(function(ele) {
                return el.mealId === ele.id
            })
        });
    }

    totalSpent() {
        const moneyGrubbin = this.meals().reduce(function(agg, el, i, arr) {
            return agg + el.price
        }, 0)
        return moneyGrubbin
    }
}

//MEALS//
let mealId = 0;
class Meal {
    constructor(title, price) {
        this.title = title;
        this.price = price;
        this.id = ++mealId;
        store.meals.push(this);
    }
    deliveries() {
        return store.deliveries.filter(function(del) {
            return del.mealId === this.id
        }.bind(this))
    }
    customers() {
        const peeps = this.deliveries().filter(function(del, i, arr) {
            return del.customerId
        });
        return peeps.map(function(el) {
            return store.customers.find(function(ele) {
                return el.customerId === ele.id
            })
        });
    }
    static byPrice() {
        const sorted = store.meals.sort(function(el1, el2) {
            return el2.price - el1.price
        })
        return sorted;
    }
}

//EMPLOYERS//
let employerId = 0;
class Employer {
    constructor(name) {
        this.name = name;
        this.id = ++employerId;
        store.employers.push(this);
    }
    employees() {
        return store.customers.filter(function(cust) {
            return cust.employerId === this.id
        }.bind(this))
    }
    deliveries() {
        const employerDels = this.employees().map(function(emp) {
            return emp.deliveries();
        })
        const flatEmpDels = [].concat(...employerDels)
        return flatEmpDels
    }
    meals() {
        const empEats = this.deliveries().map(function(dels) {
            return dels.mealId
        })
        const uniqueEats = [...new Set(empEats)]
        const uniqueMeals = uniqueEats.map(function(el) {
            return store.meals.find(function(ele) {
                return ele.id === el
            })
        })
        return uniqueMeals
    }
    mealTotals() {
        const empMeals = this.deliveries().map(function(dels) {
            return dels.mealId
        })
        const newObj = {}
        for(const element of empMeals) {
            let count = empMeals.filter(function(x) { return x == element}).length
        newObj[element] = count
        }
        return newObj;
    }
}

//DELIVERIES//
let deliveryId = 0;
class Delivery {
    constructor(meal, customer) {
        this.id = ++deliveryId;
        if(meal) {
            this.mealId = meal.id;
        }
        if(customer) {
            this.customerId = customer.id;
        }
       store.deliveries.push(this);
    }
    meal() {
        return store.meals.find(function(meal) {
            return meal.id === this.mealId
        }.bind(this))
    }
    customer() {
        return store.customers.find(function(customer) {
            return customer.id === this.customerId
        }.bind(this))
    }

}
