// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let Countable = (superclass) => class extends superclass{

    static get counter(){
        superclass._counter = (superclass._counter || 0) + 1;
        return superclass._counter;
    }

    constructor(...args){
        super(...args);
        this._id = this.constructor.counter;
    }

    get id(){
        return this._id;
    }
}

class Neighborhood{

    static get counter(){
        Neighborhood._counter = (Neighborhood._counter || 0) + 1;
        return Neighborhood._counter;
     }

    constructor(name){
        this.name = name;
        this._id = Neighborhood.counter;
        store.neighborhoods.push(this)
    }

    get id(){
        return this._id;
    }

    deliveries(){
        return store.deliveries.filter(d => d.neighborhood() === this)
    }

    customers(){
        return store.customers.filter(c => c.neighborhood() === this);
    }

    meals(){
        return store.deliveries.filter(d => d.neighborhood() === this).map(d => d.meal()).uniq();
    }
}


Array.prototype.uniq = function(){
    return this.filter((elem, index) => this.indexOf(elem) === index);
}


class CustomerBasic{


    constructor(name, neighborhoodId){
        this.name = name;
        this.neighborhoodId = neighborhoodId;
        store.customers.push(this);
    }

    neighborhood(){
        return store.neighborhoods.find(n => n.id === this.neighborhoodId )
    }

    deliveries(){
        return store.deliveries.filter(d => d.customerId === this.id);
    }

    meals(){
        return store.deliveries.filter(d => d.customerId === this.id).map(d => d.meal());
    }

    totalSpent(){
        return this.meals().map(m => m.price).reduce((cum, curr) => cum + curr, 0);
    }

}

class MealBasic{

    static byPrice(){
        return store.meals.sort((m1, m2) => m2.price - m1.price);
    }

    constructor(title, price){
        this.title = title;
        this.price = price;
        store.meals.push(this);
    }

    deliveries(){
        return store.deliveries.filter(d => d.mealId === this.id);
    }

    customers(){
        return store.deliveries.filter(d => d.mealId === this.id).map(d => d.customer());
    }

}

class DeliveryBasic{

    constructor(mealId, neighborhoodId, customerId){
        this.mealId = mealId;
        this.neighborhoodId = neighborhoodId;
        this.customerId = customerId;
        store.deliveries.push(this);
    }

    neighborhood(){
        return store.neighborhoods.find(n => this.neighborhoodId)
    }

    meal(){
        return store.meals.find(m => m.id === this.mealId);
    }

    customer(){
        return store.customers.find(c => c.id === this.customerId);
    }

}


class Customer extends Countable(CustomerBasic){

}

class Meal extends Countable(MealBasic){

}

class Delivery extends Countable(DeliveryBasic){

}

