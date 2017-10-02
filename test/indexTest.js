const expect = chai.expect;

describe('deliveries', () => {
  describe('creating a new delivery', () => {
    describe('store', () => {
      it('can store drivers', () => {
        expect(store.deliveries).to.be.instanceof(Array);
      });
    });

    it('adds the delivery to the store', () => {
      store.deliveries = [];
      const delivery = new Delivery();
      expect(store.deliveries[0]).to.be.instanceof(Delivery);
    });

    it('adds a numerical id to each delivery', () => {
      store.deliveries = [];
      const delivery = new Delivery();
      expect(typeof store.deliveries[0].id).to.equal('number');
    });

    it('adds a unique id to each delivery', () => {
      store.deliveries = [];
      const delivery = new Delivery();
      const otherDelivery = new Delivery();
      expect(delivery.id).to.not.equal(otherDelivery.id);
    });
  });
});

describe('meals', () => {
  describe('creating a new meal', () => {
    describe('store', () => {
      it('can store meals', () => {
        expect(store.meals).to.be.instanceof(Array);
      });
    });

    it('can create a Meal with a name', () => {
      const meal = new Meal('Chicken Parm');
      expect(meal.title).to.equal('Chicken Parm');
    });

    it('has a price listed as a number', () => {
      const meal = new Meal('Chicken Parm', 7);
      expect(meal.price).to.equal(7);
    });

    it('adds the meal to the store', () => {
      store.meals = [];
      const meal = new Meal('Chicken Parm');
      expect(store.meals[0].title).to.equal('Chicken Parm');
    });

    it('adds a numerical id to each meal', () => {
      store.meals = [];
      const meal = new Meal('Chicken Parm');
      expect(typeof store.meals[0].id).to.equal('number');
    });

    it('adds a unique id to each meal', () => {
      store.meals = [];
      const meal = new Meal('Chicken Parm');
      const otherMeal = new Meal('Salmon');
      expect(meal.id).to.not.equal(otherMeal.id);
    });
  });

  describe('aggregate methods', () => {
    describe('byPrice', () => {
      let steak;
      let pasta;
      beforeEach(() => {
        store.meals = [];
        pasta = new Meal('pasta', 7);
        steak = new Meal('steak', 10);
      });

      it('orders all of the meals by price', () => {
        expect(Meal.byPrice()[0]).to.equal(steak);
      });
    });
  });
});

describe('employers', () => {
  describe('creating a new employer', () => {
    describe('store', () => {
      it('can store employers', () => {
        expect(store.employers).to.be.instanceof(Array);
      });
    });

    it('can create a Employer with a name', () => {
      const employer = new Employer('Initech');
      expect(employer.name).to.equal('Initech');
    });

    it('adds the employer to the store', () => {
      store.employers = [];
      const employer = new Employer('Initech');
      expect(store.employers[0]).to.be.instanceof(Employer);
    });

    it('adds a numerical id to each employer', () => {
      store.employers = [];
      const employer = new Employer();
      expect(typeof store.employers[0].id).to.equal('number');
    });

    it('adds a unique id to each employer', () => {
      store.employers = [];
      const employer = new Employer();
      const otherEmployer = new Employer();
      expect(employer.id).to.not.equal(otherEmployer.id);
    });
  });
});

describe('customers', () => {
  describe('creating a new customer', () => {
    describe('store', () => {
      it('can store customers', () => {
        expect(store.customers).to.be.instanceof(Array);
      });
    });

    it('can create a Customer with a name', () => {
      const customer = new Customer('Sam');
      expect(customer.name).to.equal('Sam');
    });

    it('adds the customer to the store', () => {
      store.customers = [];
      const customer = new Customer('Sam');
      expect(store.customers[0]).to.be.instanceof(Customer);
    });

    it('adds a numerical id to each customer', () => {
      store.customers = [];
      const customer = new Customer();
      expect(typeof store.customers[0].id).to.equal('number');
    });

    it('adds a unique id to each customer', () => {
      store.customers = [];
      const customer = new Customer();
      const otherCustomer = new Customer();
      expect(customer.id).to.not.equal(otherCustomer.id);
    });
  });

  describe('totalSpent', () => {
    let customer;
    let chickenParm;
    let steak;
    let firstDelivery;
    let secondDelivery;
    beforeEach(() => {
      customer = new Customer('Bob');
      chickenParm = new Meal('Chicken Parm', 7);
      steak = new Meal('Steak', 10);
      firstDelivery = new Delivery(steak, customer);
      secondDelivery = new Delivery(chickenParm, customer);
    });

    it('returns the total amount spent by the customer', () => {
      expect(customer.totalSpent()).to.equal(17);
    });
  });
});

describe('relating a delivery to a meal and a customer', () => {
  let meal;
  let customer;
  let firstDelivery;
  let secondCustomer;
  let secondDelivery;

  beforeEach(() => {
    meal = new Meal('Chicken Parm');
    customer = new Customer('Bob');
    firstDelivery = new Delivery(meal, customer);
    secondCustomer = new Customer('Susan');
    secondDelivery = new Delivery(meal, secondCustomer);
  });

  afterEach(() => {
    store.meals = [];
    store.customers = [];
    store.deliveries = [];
  });

  describe('delivery', () => {
    it('has a mealId', () => {
      expect(firstDelivery.mealId).to.equal(meal.id);
    });

    it('has a customerId', () => {
      expect(firstDelivery.customerId).to.equal(customer.id);
    });

    it('has a customer', () => {
      expect(firstDelivery.customer()).to.equal(customer);
    });

    it('has a meal', () => {
      expect(firstDelivery.meal()).to.equal(meal);
    });
  });

  describe('meal', () => {
    it('has a deliveries', () => {
      expect(meal.deliveries()).to.include(firstDelivery);
      expect(meal.deliveries()).to.include(secondDelivery);
    });

    it('has customers', () => {
      expect(meal.customers()).to.include(customer);
      expect(meal.customers()).to.include(secondCustomer);
    });
  });

  describe('customers', () => {
    it('has a deliveries', () => {
      expect(customer.deliveries()).to.include(firstDelivery);
    });

    it('has meals', () => {
      expect(customer.meals()).to.include(meal);
    });
  });
});

describe('employers', () => {
  let chicken;
  let employer;
  let customer;
  let firstDelivery;
  let secondCustomer;
  let secondDelivery;

  beforeEach(() => {
    employer = new Employer('Initech');
    customer = new Customer('Fred', employer);
    chicken = new Meal('Chicken Parm');
    firstDelivery = new Delivery(chicken, customer);
    secondCustomer = new Customer('Susan', employer);
    secondDelivery = new Delivery(chicken, secondCustomer);
  });

  afterEach(() => {
    store.meals = [];
    store.customers = [];
    store.deliveries = [];
    store.employers = [];
  });

  it('has employees', () => {
    expect(employer.employees()).to.include(customer);
    expect(employer.employees()).to.include(secondCustomer);
  });

  it('has a deliveries', () => {
    expect(employer.deliveries()).to.include(firstDelivery);
  });

  it('has meals', () => {
    expect(employer.meals()).to.include(chicken);
  });

  it('does not repeat the same meal twice', () => {
    expect(employer.meals().length).to.equal(1);
  });
});

describe('employerStats', () => {
  let chicken;
  let employer;
  let customer;
  let firstDelivery;
  let secondCustomer;
  let secondDelivery;
  let pasta;

  beforeEach(() => {
    employer = new Employer('Initech');
    customer = new Customer('Fred', employer);
    chicken = new Meal('Chicken Parm');
    pasta = new Meal('Pasta');
    firstDelivery = new Delivery(chicken, customer);
    secondCustomer = new Customer('Susan', employer);
    secondDelivery = new Delivery(chicken, secondCustomer);
    thirdDelivery = new Delivery(pasta, secondCustomer);
  });

  afterEach(() => {
    store.meals = [];
    store.customers = [];
    store.deliveries = [];
    store.employers = [];
  });

  it('displays the number of times each meal was ordered', () => {
    // {pastaMealid: 1, chickenMealid: 2}
    expect(employer.mealTotals()[chicken.id]).to.equal(2);
    expect(employer.mealTotals()[pasta.id]).to.equal(1);
  });
});
