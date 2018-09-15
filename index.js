// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;

class Neighborhood {
    constructor (name) {
        this.name = name;
        this.id = ++neighborhoodId;
        store.neighborhoods.push(this);
    }

    deliveries(){// Shows a particular neighbourhood's deliveries
        return store.deliveries.filter(function (delivery){
                return delivery.neighborhoodId === this.id
            }.bind(this)
        );
    }

    customers(){
        return store.customers.filter(function(customer) {
            return this.id === customer.neighborhoodId;
        }.bind(this));
    }

    allMealsNotUnique(){

        let instanceOfNeighborhood = this;
        let allMealsFound = []
        store.meals.forEach(function(meal){
                this.deliveries().filter(function(delivery){
                    if (delivery.mealId === meal.id){
                            allMealsFound.push(meal);
                    }
                }.bind(this));
        }.bind(this));

        return allMealsFound;
    }

    meals(){
        const allMeals = [...this.allMealsNotUnique()];
        const uniqueMeals = [...(new Set(allMeals.map(function({ id }){
                     return id ;
            }
        )))];

        return uniqueMeals;
    }
}




let mealId = 0;
class Meal {
    constructor (title, price) {
        this.id = ++mealId;
        this.title = title;
        this.price = price;
        store.meals.push(this);
    }

    deliveries(){
        return store.deliveries.filter(function (delivery){
                return delivery.mealId === this.id
            }.bind(this)
        );
    }


    customers() {
        const c = []
        this.deliveries().forEach(function (delivery){
                c.push(delivery.customer());
            }
        );
        return c;
    }

    static byPrice() {
        return store.meals.sort(function(a, b){
            return b.price - a.price;
        });

    }
}




let customerId = 0;
class Customer {
    constructor (name, neighborhood) {
        this.name = name;
        this.id = ++customerId;
        store.customers.push(this);
        if (neighborhood){
            this.neighborhoodId = neighborhood;
        }
    }

    deliveries(){
        return store.deliveries.filter(function (delivery){
                return this.id === delivery.customerId;
            }.bind(this)
        );

    }

    customerNeighborhood(){
        return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
    }

    meals() {
        // Find neighborhood
        const neighborhood = this.customerNeighborhood();
        //then call neighborhood.meals() will return the correct meals.
        const mealz = []
        store.meals.forEach(function (meal1) {
            neighborhood.meals().filter(function(meal2){
                 if (meal1.id === meal2){
                     mealz.push(meal1);
                 }
            });
        });
        return mealz;
    }

    customersMeals(){

        const c = []
        this.deliveries().forEach(function(delivery){
            c.push(delivery.meal());
        });
        return c;
    }

    totalSpent(){
        let total = 0
        this.customersMeals().forEach(function(meal){
            total = total + meal.price;
        });
        return total;
    }

}

let deliveryId = 0;

class Delivery {
    constructor (meal, neighborhood, customer){
        this.id = ++deliveryId;
        this.mealId = meal;
        this.customerId = customer;
        this.neighborhoodId = neighborhood;
        store.deliveries.push(this);
    }

    meal() {
        return store.meals.find(meal => meal.id === this.mealId);
    }

    customer() {
         return store.customers.find(function(customer){

                return customer.id === this.customerId;
            }.bind(this)
        );
    }

    neighborhood() {
         return store.neighborhoods.find(function (neighborhood){
                return neighborhood.id === this.neighborhoodId
            }.bind(this)
        );
    }

}
