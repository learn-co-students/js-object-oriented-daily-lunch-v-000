const expect = chai.expect;

describe('deliveries', function() {
  describe('creating a new delivery', function() {
    describe('store', function() {
      it('can store drivers', function() {
        expect(store.deliveries).to.be.instanceof(Array);
      });
    });

    it('adds the delivery to the store', function() {
      store.deliveries = [];
      let delivery = new Delivery();
      expect(store.deliveries[0]).to.be.instanceof(Delivery);
    });

    it('adds a numerical id to each delivery', function() {
      store.deliveries = [];
      let delivery = new Delivery();
      expect(typeof store.deliveries[0].id).to.equal('number');
    });

    it('adds a unique id to each delivery', function() {
      store.deliveries = [];
      let delivery = new Delivery();
      let otherDelivery = new Delivery();
      expect(delivery.id).to.not.equal(otherDelivery.id);
    });
  });
});

describe('meals', function() {
  describe('creating a new meal', function() {
    describe('store', function() {
      it('can store meals', function() {
        expect(store.meals).to.be.instanceof(Array);
      });
    });

    it('can create a Meal with a name', function() {
      let meal = new Meal('Chicken Parm');
      expect(meal.title).to.equal('Chicken Parm');
    });

    it('has a price listed as a number', function() {
      let meal = new Meal('Chicken Parm', 7);
      expect(meal.price).to.equal(7);
    });

    it('adds the meal to the store', function() {
      store.meals = [];
      let meal = new Meal('Chicken Parm');
      expect(store.meals[0].title).to.equal('Chicken Parm');
    });

    it('adds a numerical id to each meal', function() {
      store.meals = [];
      let meal = new Meal('Chicken Parm');
      expect(typeof store.meals[0].id).to.equal('number');
    });

    it('adds a unique id to each meal', function() {
      store.meals = [];
      let meal = new Meal('Chicken Parm');
      let otherMeal = new Meal('Salmon');
      expect(meal.id).to.not.equal(otherMeal.id);
    });
  });

  describe('aggregate methods', function() {
    describe('byPrice', function() {
      let steak;
      let pasta;
      let salad;
      beforeEach(function() {
        store.meals = [];
        pasta = new Meal('pasta', 7);
        steak = new Meal('steak', 10);
        salad = new Meal('salad', 5);
      });

      it('orders all of the meals by price', function() {
        expect(Meal.byPrice()[0]).to.equal(steak);
        expect(Meal.byPrice()[1]).to.equal(pasta);
        expect(Meal.byPrice()[2]).to.equal(salad);
      });
    });
  });
});

describe('employers', function() {
  describe('creating a new employer', function() {
    describe('store', function() {
      it('can store employers', function() {
        expect(store.employers).to.be.instanceof(Array);
      });
    });

    it('can create a Employer with a name', function() {
      let employer = new Employer('Initech');
      expect(employer.name).to.equal('Initech');
    });

    it('adds the employer to the store', function() {
      store.employers = [];
      let employer = new Employer('Initech');
      expect(store.employers[0]).to.be.instanceof(Employer);
    });

    it('adds a numerical id to each employer', function() {
      store.employers = [];
      let employer = new Employer();
      expect(typeof store.employers[0].id).to.equal('number');
    });

    it('adds a unique id to each employer', function() {
      store.employers = [];
      let employer = new Employer();
      let otherEmployer = new Employer();
      expect(employer.id).to.not.equal(otherEmployer.id);
    });
  });
});

describe('customers', function() {
  describe('creating a new customer', function() {
    describe('store', function() {
      it('can store customers', function() {
        expect(store.customers).to.be.instanceof(Array);
      });
    });

    it('can create a Customer with a name', function() {
      let customer = new Customer('Sam');
      expect(customer.name).to.equal('Sam');
    });

    it('adds the customer to the store', function() {
      store.customers = [];
      let customer = new Customer('Sam');
      expect(store.customers[0]).to.be.instanceof(Customer);
    });

    it('adds a numerical id to each customer', function() {
      store.customers = [];
      let customer = new Customer();
      expect(typeof store.customers[0].id).to.equal('number');
    });

    it('adds a unique id to each customer', function() {
      store.customers = [];
      let customer = new Customer();
      let otherCustomer = new Customer();
      expect(customer.id).to.not.equal(otherCustomer.id);
    });
  });

  describe('totalSpent', function() {
    let customer;
    let chickenParm;
    let steak;
    let firstDelivery;
    let secondDelivery;
    beforeEach(function() {
      customer = new Customer('Bob');
      chickenParm = new Meal('Chicken Parm', 7);
      steak = new Meal('Steak', 10);
      firstDelivery = new Delivery(steak, customer);
      secondDelivery = new Delivery(chickenParm, customer);
    });

    it('returns the total amount spent by the customer', function() {
      expect(customer.totalSpent()).to.equal(17);
    });
  });
});

describe('relating a delivery to a meal and a customer', function() {
  let meal;
  let customer;
  let firstDelivery;
  let secondCustomer;
  let secondDelivery;

  beforeEach(function() {
    meal = new Meal('Chicken Parm');
    customer = new Customer('Bob');
    firstDelivery = new Delivery(meal, customer);
    secondCustomer = new Customer('Susan');
    secondDelivery = new Delivery(meal, secondCustomer);
  });

  afterEach(function() {
    store.meals = [];
    store.customers = [];
    store.deliveries = [];
  });

  describe('delivery', function() {
    it('has a mealId', function() {
      expect(firstDelivery.mealId).to.equal(meal.id);
    });

    it('has a customerId', function() {
      expect(firstDelivery.customerId).to.equal(customer.id);
    });

    it('has a customer', function() {
      expect(firstDelivery.customer()).to.equal(customer);
    });

    it('has a meal', function() {
      expect(firstDelivery.meal()).to.equal(meal);
    });
  });

  describe('meal', function() {
    it('has a deliveries', function() {
      expect(meal.deliveries()).to.include(firstDelivery);
      expect(meal.deliveries()).to.include(secondDelivery);
    });

    it('has customers', function() {
      expect(meal.customers()).to.include(customer);
      expect(meal.customers()).to.include(secondCustomer);
    });
  });

  describe('customers', function() {
    it('has a deliveries', function() {
      expect(customer.deliveries()).to.include(firstDelivery);
    });

    it('has meals', function() {
      expect(customer.meals()).to.include(meal);
    });
  });
});

describe('employers', function() {
  let chicken;
  let employer;
  let customer;
  let firstDelivery;
  let secondCustomer;
  let secondDelivery;
  let thirdDelivery;
  let thirdCustomer;
  let steak;

  beforeEach(function() {
    employer = new Employer('Initech');
    otherEmployer = new Employer('Chachees');
    customer = new Customer('Fred', employer);
    chicken = new Meal('Chicken Parm');
    steak = new Meal('Steak');
    firstDelivery = new Delivery(chicken, customer);
    secondCustomer = new Customer('Susan', employer);
    thirdCustomer = new Customer('Sally', otherEmployer);
    secondDelivery = new Delivery(chicken, secondCustomer);
    thirdDelivery = new Delivery(chicken, thirdCustomer);
  });

  afterEach(function() {
    store.meals = [];
    store.customers = [];
    store.deliveries = [];
    store.employers = [];
  });

  it('has employees', function() {
    expect(employer.employees()).to.include(customer);
    expect(employer.employees()).to.include(secondCustomer);
    expect(employer.employees()).to.not.include(thirdCustomer);
  });

  it('has a deliveries', function() {
    expect(employer.deliveries()).to.include(firstDelivery);
    expect(employer.deliveries()).to.not.include(thirdDelivery);
  });

  it('has meals', function() {
    expect(employer.meals()).to.include(chicken);
  });

  it('does not repeat the same meal twice', function() {
    expect(employer.meals().length).to.equal(1);
  });
});

describe('employerStats', function() {
  let chicken;
  let employer;
  let customer;
  let firstDelivery;
  let secondCustomer;
  let secondDelivery;
  let pasta;

  beforeEach(function() {
    employer = new Employer('Initech');
    customer = new Customer('Fred', employer);
    chicken = new Meal('Chicken Parm');
    pasta = new Meal('Pasta');
    firstDelivery = new Delivery(chicken, customer);
    secondCustomer = new Customer('Susan', employer);
    secondDelivery = new Delivery(chicken, secondCustomer);
    thirdDelivery = new Delivery(pasta, secondCustomer);
  });

  afterEach(function() {
    store.meals = [];
    store.customers = [];
    store.deliveries = [];
    store.employers = [];
  });

  it('displays the number of times each meal was ordered', function() {
    // {pastaMealid: 1, chickenMealid: 2}
    expect(employer.mealTotals()[chicken.id]).to.equal(2);
    expect(employer.mealTotals()[pasta.id]).to.equal(1);
  });
});
