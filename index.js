// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

// when class1 belongs to class2:
// class1 will have a class2 method that uses find to find the single class2 item
// ex a trip belongs to a driver 
// every trip object will haave a driverId property. Searching for where driver.id === trip.driverId. 

// if the object belongs to something, the object will have a somethingId property

// when class1 has many class2
//ex a passenger has many trips
// passenger will have a trips() method that searches for trips.passengerId === this.id 
// if the object has many something, we search the somethings for objectId = this.id

let neigCounter = 0;
let custCounter = 0;
let mealCounter = 0;
let deliCounter = 0;



class Neighborhood{
    constructor(name){
        this.name = name;
        this.id = ++neigCounter;
    
        store.neighborhoods.push(this)
    }
    // A neighborhood has many deliveries
    deliveries(){
        return store.deliveries.filter(deliv => {
            return deliv.neighborhoodId === this.id;
        });
    }

    // a neighborhood has many customers through deliveries
    // a customer belongs to a neighborhood 
    customers(){
        
        return store.customers.filter(x => {return x.neighborhoodId === this.id})
    }

    // A neighborhood has many meals through deliveries 
    meals() {
        const allMeals = this.customers().map(customer => customer.meals());
        debugger;
        const merged = [].concat.apply([], allMeals);
        return [...new Set(merged)];
      }
  
}

class Customer{
    constructor(name, neighborhoodId){
        this.name = name;
        this.neighborhoodId = neighborhoodId;
        this.id = ++ custCounter;

        store.customers.push(this)
    }

    deliveries(){
        return store.deliveries.filter(x => {return x.customerId === this.id})
    }
    // a customer has many meals through deliveries! 
    // THROUGH DELIVERIES is a hint that delivery objects may have the methods/attributes we need to call upon for the MEALS. 
    //should only return unique meals. (a customer can order the same meals multiple times )
    meals() {
        return this.deliveries().map(x => x.meal())
      }

    // reduceMealPrices = function(totalPrice, el, i, arr){
    //     return totalPrice + el.price;
    // }


    totalSpent(){
        // returns the total amount that the customer has spent on food.
        return this.meals().reduce(function(totalPrice, el, i, arr){
            return totalPrice + el.price;
        }, 0)
    }

}

class Meal{
    constructor(title, price){
        this.title = title;
        this.price = price;
        this.id = ++mealCounter;

        store.meals.push(this)

    }
    // A meal has many deliveries
    deliveries(){
        return store.deliveries.filter(deliv => {return deliv.mealId === this.id})
    }

    // a meal has many customers
    customers() {
        const allCustomers = this.deliveries().map(delivery => delivery.customer());
        return [...new Set(allCustomers)];
      }
  

    static byPrice(){
        return store.meals.sort((a,b) => a.price < b.price)

    }    
}

class Delivery{
    //A delivery belongs to a meal, belongs to a customer, and belongs to a neighborhood
    constructor(mId, neighborhoodId, customerId){
        this.mealId = mId;
        this.neighborhoodId = neighborhoodId;
        this.customerId = customerId;
        this.id = ++ deliCounter;

        store.deliveries.push(this)
    }

    meal(){
       return store.meals.find(meal => {return meal.id === this.mealId})
    }

    customer(){
        return store.customers.find(cust => {return cust.id === this.customerId})
    }

    neighborhood(){
        return store.neighborhoods.find(neigh => {return neigh.id === this.neighborhoodId})
    }
}