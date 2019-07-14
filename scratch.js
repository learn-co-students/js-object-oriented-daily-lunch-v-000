

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    //do something with neighborhoodId
  }
  deliveries(){

  }
  meals(){

  }
  totalSpent(){

  }
}

class Meals {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
  }

  deliveries() {

  }
  customers(){

  }

  byPrice(){

  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    //del with ids
    this.id = ++deliveryId;
  }
  meal() {

  }
  customer(){

  }
  neighborhood(){

  }
}
