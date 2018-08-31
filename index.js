store = {
  meal: [has_many_customers],
  customers: [has_many deliveries, has_many meals through deliveries, belongs_to neighborhood],
  deliveries: [belongs_to meal, belongs_to customer, belongs_to neighborhood],
  neighborhoods: [has_many deliveries, has_many customers through deliveries, has_many meals through deliveries]
}

class Neighborhood{
  constructor(name){
    this.name = name
  }
  deliveries(){
    return store.deliveries.find(d => d.neighborhoodId === this.id);
  }
  customers(){
    this.deliveries().map(d => d.customerId === ?)
  }
}
