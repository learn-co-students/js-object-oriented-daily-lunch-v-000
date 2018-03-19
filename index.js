
let customerId = 0

let store = {customers: [], meals: [], employers: [], deliveries: []}

class Customer {
  constructor(name, employer) {
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer.id;
  }
  store.customers.push(this)
}
