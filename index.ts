let store = { customers: [{}], meals: [{}], deliveries: [{}], employers: [{}] };
let customerId = 0;

class Customer {
    public name: string;
    public id: number;
    public employerId: number;

    constructor(name: string, employer) {
        this.name = name;
        this.id = ++customerId;
        if (employer) {
            this.employerId = employer.id;
        }

        store.customers.push(this);
    }
    public mealPrices() {
        return this.meals().map(meal => meal.price);
    }
    public deliveries() {
        return store.deliveries.filter(delivery => {
            return delivery.customerId === this.id;
        });
    }

    public meals() {
        const customerMeals = this.deliveries().map(meal => meal.mealId);
        return store.meals.filter(meal => {
            for (const value of customerMeals) {
                if (meal.id === value) {
                    return meal;
                }
            }
        });
    }

    public totalSpent(): number {
        return this.mealPrices().reduce((sum, value) => sum + value);
    }
}

let mealId = 0;

class Meal {
    public static byPrice() {
        return store.meals.sort(compareValues("price"));
    }

    public title: string;
    public price: number;
    public id: number;

    constructor(title: string, price: number) {
        this.title = title;
        this.price = price;
        this.id = ++mealId;

        store.meals.push(this);
    }

    public findMeal() {
        return store.meals.find((meal) => {
            return meal.id === this.id});
    }

    public deliveries() {
        let mealID = this.findMeal().id;
        return store.deliveries.filter((delivery) => { 
            if (delivery.mealId === mealID) {
                    return delivery;
                }
            });
    }

    public customers() {
        const customerIds = this.deliveries().map(delivery => delivery.customerId);
        return store.customers.filter(customer => {
            for (const value of customerIds) {
               if (value === customer.id) {
                    return customer;
                }
            }
        });
    }

    // tslint:disable-next-line:align
    function compareValues(key, order = "desc") {
        return function(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0;
            }
            const valA = a[key];
            const valB = b[key];

            let comparison = 0;
            if (valA > valB) {
                comparison = 1;
            } else if (valA < valB) {
                comparison = -1;
            }
            return order === "desc" ? comparison * -1 : comparison;
        };
    }
}

let deliveryId = 0;

class Delivery {
    public id: number;
    public mealId: number;
    public customerId: number;

    constructor(meal, customer) {
        this.id = ++deliveryId;
        if (meal) {
            this.mealId = meal.id;
        }
        if (customer) {
            this.customerId = customer.id;
        }

        store.deliveries.push(this);
    }

    public findDelivery() {
        return store.deliveries.find((delivery) => {
            return delivery.id === this.id});
    }

    public customer() {
        const customerID = this.findDelivery().customerId;
        return store.customers.find((customer) => { 
            return customer.id === customerID});
    }
    public meal() {
        const mealID = this.findDelivery().mealId;
        return store.meals.find((meal) => { 
            return meal.id === mealID});
    }
}

let employerId = 0;

class Employer {
    public name: string;
    public id: number;

    constructor(name) {
        this.name = name;
        this.id = ++employerId;

        store.employers.push(this);
    }

    public findEmployer() {
        return store.employers.find((employer) => {
            return employer.id === this.id});
    }
    public employees() {
       const employer = this.findEmployer();
       return store.customers.filter(customer => {
           return customer.employerId === employer.id
       });
    }
    public deliveries() {
        return store.deliveries.filter(delivery => {
            for (const value of this.employees()) {
                return delivery.customerId === value.id;
            }
        });
    }

    public meals() {
        const customerMeals = this.deliveries().map(meal => meal.mealId);
        return store.meals.filter(meal => {
            for (const value of customerMeals) {
                if (meal.id === value) {
                    return meal;
                }
            }
        });
    }

    public mealCount(array) {
        return array.reduce((tally, meal) => (tally[meal] = ++tally[meal] || 1, tally), {})
      }

    public mealTotals() {
        return this.mealCount(store.deliveries.map(delivery => {
            for (const value of this.employees()) {
                if (delivery.customerId === value.id) {
                    return delivery.mealId;
                }
            })
        );
    }
}
