// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;

class Neighborhood{
    constructor(name){
        this.id = ++neighborhoodId;
        this.name = name;

        store.neighborhoods.push(this);
    };

    deliveries(){
        return store.deliveries.filter(d=> d.neighborhoodId === this.id);
    };

    customers(){
        let deliveries = this.deliveries();
        return deliveries.map(d => d.customer())
                         // find unique customers
                         .filter(function (value, index, self) { 
                            return self.indexOf(value) === index;
                          });
    };

    meals(){
        let deliveries = this.deliveries();
        return deliveries.map(d => d.meal())
                        // find unique meals
                        .filter(function (value, index, self) { 
                            return self.indexOf(value) === index;
                        });
    };
};

let customerId = 0;

class Customer{
    constructor(name, neighborhoodId){
        this.id = ++customerId;
        this.name = name;
        this.neighborhoodId = neighborhoodId;
        store.customers.push(this);
    };

    deliveries(){
        return store.deliveries.filter(d => d.customerId === this.id);
    };

    meals(){
        let deliveries = this.deliveries();
        return deliveries.map(d => d.meal());
    };

    totalSpent(){
        let deliveries = this.deliveries();
        let total = 0;
        deliveries.map(d=> total += d.meal().price);
        return total;
    };
};

let mealId = 0;

class Meal{
    constructor(title, price){
        this.id = ++mealId;
        this.title = title;
        this.price = price;

        store.meals.push(this);
    };

    static byPrice(){
        return store.meals.sort(((a,b) => {
            return b.price - a.price; // sort by descending order
        }));
    };

    deliveries(){
        return store.deliveries.filter(d => d.mealId === this.id);
    };

    customers(){
        let deliveries = this.deliveries();
        return deliveries.map(d => d.customer());
    };
};

let deliveryId = 0;

class Delivery{
    constructor(mealId, neighborhoodId, customerId){
        this.id = ++deliveryId;
        this.mealId = mealId;
        this.neighborhoodId = neighborhoodId;
        this.customerId = customerId;

        store.deliveries.push(this);
    };

    meal(){
        return store.meals.find(meal => meal.id === this.mealId);
    };

    customer(){
        return store.customers.find(customer => customer.id === this.customerId);
    };

    neighborhood(){
        return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
    };
};