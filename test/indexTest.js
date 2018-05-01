const expect = chai.expect;
describe('index.js', () => {
  describe('global data store', () => {
    it('can store meals', () => {
      expect(store.meals).to.be.instanceof(Array);
    });
    it('can store customers', () => {
      expect(store.customers).to.be.instanceof(Array);
    });
    it('can store deliveries', () => {
      expect(store.deliveries).to.be.instanceof(Array);
    });
  });

  describe('Basic Class Properties', () => {
    let meal;
    let secondMeal;
    let customer;
    let secondCustomer;
    let delivery;
    let secondDelivery;
    let thirdDelivery;

    beforeEach(() => {
      store = { meals: [], customers: [], deliveries: [] };
      meal = new Meal('5 lbs of Fruity Pebbles', 25);
      secondMeal = new Meal('An entire large stuffed crust pizza from pizza hut', 20);
      customer = new Customer('Paul Rudd');
      secondCustomer = new Customer('Todd');
      delivery = new Delivery(meal.id, customer.id);
      secondDelivery = new Delivery(secondMeal.id, secondCustomer.id);
      thirdDelivery = new Delivery(secondMeal.id, secondCustomer.id);
    });

    describe('Customer class', () => {
      describe('creating a new Customer', () => {
        it('can create a new Customer with a name', () => {
          expect(customer.name).to.equal('Paul Rudd');
        });

        it('adds the customer to the store', () => {
          expect(store.customers[0]).to.be.instanceof(Customer);
        });

        it('adds a unique id to each customer', () => {
          expect(typeof store.customers[0].id).to.equal('number');
          expect(customer.id).to.not.equal(secondCustomer.id);
        });
      });
    });

    describe('Meal class', () => {
      describe('new Meal()', () => {
        it('can create a new Meal with a name', () => {
          expect(meal.title).to.equal('5 lbs of Fruity Pebbles');
        });

        it('can create a new Meal with a unique id', () => {
          expect(meal.id).to.not.equal(secondMeal.id);
        });

        it('has a price listed as a number', () => {
          expect(meal.price).to.equal(25);
        });

        it('adds the meal to the store', () => {
          expect(store.meals[0].title).to.equal('5 lbs of Fruity Pebbles');
        });
      });
    });

    describe('Delivery class', () => {
      describe('creating a new Delivery', () => {
        it('creates a new delivery with a meal and customer', () => {
          expect(delivery.mealId).to.equal(meal.id);
        });
        it('adds the delivery to the store', () => {
          expect(store.deliveries[0]).to.be.instanceof(Delivery);
        });

        it('adds a numerical id to each delivery', () => {
          expect(typeof store.deliveries[0].id).to.equal('number');
        });

        it('adds a unique id to each delivery', () => {
          expect(delivery.id).to.not.equal(secondDelivery.id);
        });
      });
    });
  });

  describe('Object Relationships', () => {
    let guy;
    let marioBatali;
    let friedCheesecake;
    let macAndCheese;
    let flavortownDelivery;
    let guysAmericanDelivery;
    let guysDuplicateDelivery;
    let batalisDessert;
    beforeEach(() => {
      guy = new Customer('Guy Fieri');
      marioBatali = new Customer('Iron Chef Mario Batali');
      friedCheesecake = new Meal('Fried Cheesecake', 30);
      macAndCheese = new Meal('Fried Macaroni and Cheese', 15);
      flavortownDelivery = new Delivery(friedCheesecake.id, guy.id);
      guysAmericanDelivery = new Delivery(macAndCheese.id, guy.id);
      guysDuplicateDelivery = new Delivery(macAndCheese.id, guy.id);
      batalisDessert = new Delivery(friedCheesecake.id, marioBatali.id);
    });

    describe('Delivery', () => {
      describe('meal()', () => {
        it('returns the meal instance associated with a particular delivery; delivery belongs to a meal', () => {
          expect(batalisDessert.meal()).to.equal(friedCheesecake);
        });
      });
      describe('customer()', () => {
        it('returns the customer instance associated with a particular delivery; delivery belongs to a customer', () => {
          expect(guysAmericanDelivery.customer()).to.equal(guy);
        });
      });
    });

    describe('Customer', () => {
      describe('deliveries()', () => {
        it('returns all deliveries a customer has placed', () => {
          expect(guy.deliveries()).to.deep.equal([
            flavortownDelivery,
            guysAmericanDelivery,
            guysDuplicateDelivery,
          ]);
        });
      });
      describe('meals()', () => {
        it('returns all unique meals a customer has ordered', () => {
          expect(guy.meals().length).to.equal(2);
        });
      });
    });

    describe('Meal', () => {
      describe('deliveries()', () => {
        it('returns all deliveries associated with a given meal', () => {
          expect(macAndCheese.deliveries()).to.deep.equal([
            guysAmericanDelivery,
            guysDuplicateDelivery,
          ]);
        });
      });
      describe('customers()', () => {
        it('returns a unique list of customers who have ordered this meal', () => {
          expect(friedCheesecake.customers()).to.deep.equal([guy, marioBatali]);
        });
      });
    });
  });

  describe('aggregate methods', () => {
    let bigSpender;
    let lobster;
    let turducken;
    let fancyPizza;
    let deliveryOne;
    let deliveryTwo;
    let deliveryThree;
    beforeEach(() => {
      store = { meals: [], customers: [], deliveries: [] };
      bigSpender = new Customer('DJ MoneyBags');
      lobster = new Meal('lobster', 500);
      turducken = new Meal('turducken', 750);
      fancyPizza = new Meal('fancy pizza', 600);
      deliveryOne = new Delivery(lobster.id, bigSpender.id);
      deliveryOne = new Delivery(turducken.id, bigSpender.id);
      deliveryOne = new Delivery(fancyPizza.id, bigSpender.id);
    });
    describe('Meal methods', () => {
      describe('Meal.byPrice()', () => {
        it('orders all of the meals by price', () => {
          expect(Meal.byPrice()[0]).to.equal(turducken);
          expect(Meal.byPrice()[1]).to.equal(fancyPizza);
          expect(Meal.byPrice()[2]).to.equal(lobster);
        });
      });
    });

    describe('Customer methods', () => {
      it('calculates totalSpent()', () => {
        expect(bigSpender.totalSpent()).to.equal(1850);
      });
    });
  });
});
