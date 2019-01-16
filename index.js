// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 1

class Neighborhood {
    constructor(name){
      this.id = neighborhoodId++
      this.name = name
     
      store.neighborhoods.push(this)
    }

    // deliveries() - returns a list of all deliveries placed in a neighborhood

    deliveries() {
        console.log(store.delivery)
        
        return  store.deliveries.filter(x => x.neighborhoodId == this.id)
        } 
    // customers() - returns all of the customers that live in a particular neighborhood
   
    customers() {
        return  store.customers.filter(x => this.id == x.neighborhoodId)
        } 
    
        // meals() - returns a unique list of meals that have been ordered in a particular neighborhood (you might want to do this one last)
        meals() {
            
            const result = this.deliveries().map(function(delivery){
               return delivery.meal() 
            //    # result in array of meal object in regards to each delivery
            } )

            // # we wrote out "UNIQUE" function. to aviod duplicates
              function onlyUnique(value, index, self) { 
                 return self.indexOf(value) === index;
               }

            return result.filter( onlyUnique );
            // return  this.customers().filter(x => this.id == x.customerId).map(x => x.meal())
            // array.map(function(currentValue, index, arr), thisValue)

            } 
        

}

let customerId = 0

class Customer {
    constructor(name, neighborhoodId){
      this.id = ++customerId
      this.name = name
      this.neighborhoodId = neighborhoodId
      
      store.customers.push(this)
        } 
          
        deliveries() {
            return  store.deliveries.filter(x => this.id == x.customerId)
            }
            
            meals() {
                return  store.deliveries.filter(x => this.id == x.customerId).map(x => x.meal())
                } 
                
               totalSpent(){
                   return this.meals().reduce(function(accumulator, meal){
                       
                       return accumulator + meal.price},0)
               }
    }

    let mealId= 0

    class Meal {
        constructor(title, price){
          this.id = ++mealId
          this.title = title
          this.price = price
    
          if(price){
              this.setPrice(price)
           }
          store.meals.push(this)
            } 
          setPrice(price){
            this.priceId = price.id
          }
    
          deliveries() {
            return  store.deliveries.filter(x => this.id == x.mealId)
            } 

            customers() {
                
                return  store.deliveries.filter(x => this.id == x.mealId).map(x => x.customer())
                } 

               static byPrice() {
                   
                // return store.meals.sort(x => this.id == x.mealId).map(x => x.price )
                return store.meals.sort(function(a, b){return b.price - a.price}
                   )
                }
                
        }


   let deliveryId = 0

    class Delivery {

        constructor(mealId, neighborhoodId, customerId){
          this.id = ++deliveryId
          this.mealId = mealId
          this.customerId = customerId
          this.neighborhoodId = neighborhoodId


          store.deliveries.push(this)
            } 

            meal() {
                return  store.meals.find(meal => meal.id == this.mealId)
                } 

                customer() {
                    return store.customers.find(customer => customer.id == this.customerId)
                    } 

                    neighborhood() {
                        return store.neighborhoods.find(neighborhood => neighborhood.id == this.neighborhoodId)
                        } 
          }
    
        
