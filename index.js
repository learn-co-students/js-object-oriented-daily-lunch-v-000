// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };


//NEIGHBORHOOD CLASS///////////
let nId=0;
class Neighborhood{
  
  constructor(name){
    this.id=++nId;
    this.name=name;
    store.neighborhoods.push(this);
  }
  
  deliveries(){
    let id=this.id;
    return store.deliveries.filter(function(del){
      return del.neighborhoodId===id;
    });
  }
  
  customers(){
    let id=this.id;
    let customers=[];
    this.deliveries().forEach(function(del){
      if(customers.includes(del.customer())===false){
         customers.push(del.customer());
      }
    });
    console.log(customers);
    return customers;
  }
  
  meals(){
    let meals=[];
    this.deliveries().forEach(function(del){
      if(meals.includes(del.meal())===false){
        meals.push(del.meal());
      }
    });
    return meals;
  }
  
  
}


//CUSTOMER CLASS////////////////
let cId=0;
class Customer{
  constructor(name,neighborhoodId){
    this.id=++cId;
    this.name=name;
    this.neighborhoodId=neighborhoodId; //a foreign key
    store.customers.push(this);
  }
  
  deliveries(){
    let id=this.id;
    return store.deliveries.filter(function(del){
      return del.customerId===id;
    });
  }
  
  meals(){
    let meals=[];
    this.deliveries().forEach(function(del){
      meals.push(del.meal());
    });
    return meals;
  }
  
  totalSpent(){
    return this.meals().reduce(function(agg,el,ind,arr){
      return agg+el.price;
    },0);
  }
  
  
}

//MEAL CLASS////////////////////
let mId=0;
class Meal{
  constructor(title,price){
    this.id=++mId;
    this.title=title;
    this.price=price;
    store.meals.push(this);
  }
  
  static byPrice(){
    return store.meals.sort(function(a,b){
      return b.price-a.price;
    });
  }
  
  deliveries(){
    let id=this.id;
    return store.deliveries.filter(function(del){
      return del.mealId===id;
    });
  }
  
  customers(){
    let customers=[];
    this.deliveries().forEach(function(del){
      customers.push(del.customer());
    });
    return customers;
  }
  
  
}





//DELIVERY CLASS////////////////
let dId=0;
class Delivery{
  constructor(mealId,neighborhoodId,customerId){
    this.id=++dId;
    this.mealId=mealId;
    this.neighborhoodId=neighborhoodId;
    this.customerId=customerId;
    store.deliveries.push(this);
  }
  
  meal(){
    let mealId=this.mealId;
    return store.meals.find(function(meal){
      return meal.id===mealId;
    });
  }
  
  customer(){
    let custId=this.customerId;
    return store.customers.find(function(cust){
      return cust.id===custId;
    });
  }
  
  neighborhood(){
    let neighId=this.neighborhoodId;
    return store.neighborhoods.find(function(neigh){
      return neigh.id===neighId;
    });
  }
  
}