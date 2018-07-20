// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood {
    constructor(name) {
        this.name = name;
        this.id = ++neighborhoodId;
        store.neighborhoods.push(this);
    }
    
    deliveries() {
        return store.deliveries.filter(delivery => {
          return delivery.neighborhoodId === this.id
        });
    }
    
    customers() {
        const cDeliveries = this.deliveries();
        // console.log('Customer Deliveries : ', cDeliveries);
        const customerList = [];
        cDeliveries.forEach(function (delivery) {
            if (!customerList.includes(delivery.customer())){
                customerList.push(delivery.customer());
            }
        });
        return customerList;
    }
    
    meals() {
        const nDeliveries = this.deliveries();
        const nMeals = [];
        nDeliveries.forEach(function (delivery) {
            // console.log('Order', delivery);
            if (!nMeals.includes(delivery.meal())){
                // console.log('Add order', delivery.mealId);
                nMeals.push(delivery.meal());
            }
        });
        return nMeals;
    }
}

class Customer {
    constructor(name, neighborhoodId) {
        this.name = name;
        this.neighborhoodId = neighborhoodId;
        this.id = ++customerId;
        store.customers.push(this);
    }
    
    deliveries() {
        return store.deliveries.filter(delivery => {
          return delivery.customerId === this.id
        });
    }
    
    meals() {
        const cMeals = this.deliveries();
        // console.log('Customer Orders : ', cMeals);
        const cOrders = [];
        cMeals.forEach(function (delivery) {
            // console.log('Order', delivery);
            // if (!cOrders.includes(delivery.meal())){
            //     console.log('Add order', delivery.mealId);
                cOrders.push(delivery.meal());
            // }
        });
        return cOrders;
    }
    
    totalSpent() {
        const mealsList = this.meals();
        // console.log('mealsList = ', mealsList);
        let totalPrice = 0;
        mealsList.forEach(function (meal) {
            totalPrice += meal.price;
        });
        return totalPrice;
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
          return delivery.mealId === this.id
        });
    }
    
    customers() {
        const mDeliveries = this.deliveries();
        const mCustomers = [];
        mDeliveries.forEach(function (delivery) {
            mCustomers.push(delivery.customer());
        });
        return mCustomers;
    }
    
    static byPrice() {
        const sortedMeals = store.meals.slice();
        return sortedMeals.sort(function(a, b) {
            return b.price - a.price;
        });
    }
}

class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
        this.mealId = mealId;
        this.neighborhoodId = neighborhoodId;
        this.customerId = customerId;
        this.id = ++deliveryId;
        store.deliveries.push(this);
    }
    
    meal() {
        return store.meals.find(meal => {
          return meal.id === this.mealId;
        });
    }
    
    customer() {
        return store.customers.find(customer => {
          return customer.id === this.customerId;
        });
    }
    
    neighborhood() {
        return store.neighborhoods.find(neighborhood => {
          return neighborhood.id === this.neighborhoodId;
        });
    }
    
}
