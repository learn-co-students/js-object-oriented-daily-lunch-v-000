const expect = chai.expect;
describe('index.js', () => {
  describe('Global Data Store', () => {
    it('can store neighborhoods', () => {
      expect(store.neighborhoods).to.be.instanceof(Array);
    });
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
    let neighborhood;
    let secondNeighborhood;

    beforeEach(() => {
      store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
      neighborhood = new Neighborhood('Dumbo');
      secondNeighborhood = new Neighborhood('Hamsterdam');
      meal = new Meal('5 lbs of Fruity Pebbles', 25);
      secondMeal = new Meal('An entire large stuffed crust pizza from pizza hut', 20);
      customer = new Customer('Paul Rudd', neighborhood.id);
      secondCustomer = new Customer('Todd', secondNeighborhood.id);
      delivery = new Delivery(meal.id, neighborhood.id, customer.id);
      secondDelivery = new Delivery(secondMeal.id, secondNeighborhood.id, secondCustomer.id);
      thirdDelivery = new Delivery(secondMeal.id, secondNeighborhood.id, secondCustomer.id);
    });

    describe('Neighborhood class', () => {
      describe('creating a new neighborhood', () => {
        it('can create a new neighborhood with a name', () => {
          expect(neighborhood.name).to.equal('Dumbo');
        });
        it('is created with a unique id', () => {
          expect(typeof neighborhood.id).to.equal('number');
          expect(secondNeighborhood.id).to.not.equal(neighborhood.id);
        });
        it('adds the neighborhood to the store', () => {
          expect(store.neighborhoods[0]).to.be.instanceof(Neighborhood);
        });
      });
    });

    describe('Customer class', () => {
      describe('creating a new Customer', () => {
        it('can create a new Customer with a name', () => {
          expect(customer.name).to.equal('Paul Rudd');
        });
        it('can create a new customer with a neighborhoodId', () => {
          expect(customer.neighborhoodId).to.equal(neighborhood.id);
        });

        it('adds the customer to the store', () => {
          expect(store.customers[0]).to.be.instanceof(Customer);
        });

        it('adds a unique id to each customer', () => {
          expect(typeof customer.id).to.equal('number');
          expect(customer.id).to.not.equal(secondCustomer.id);
        });
      });
    });

    describe('Meal class', () => {
      describe('new Meal()', () => {
        it('can create a new Meal with a title', () => {
          expect(meal.title).to.equal('5 lbs of Fruity Pebbles');
        });
        it('can create a new Meal with a price', () => {
          expect(meal.price).to.equal(25);
          expect(typeof meal.price).to.equal('number');
        });
        it('has a price listed as a number', () => {
          expect(meal.price).to.equal(25);
        });

        it('adds the meal to the store', () => {
          expect(store.meals[0].title).to.equal('5 lbs of Fruity Pebbles');
        });
        it('adds a unique id to each meal', () => {
          expect(typeof meal.id).to.equal('number');
          expect(meal.id).to.not.equal(secondMeal.id);
        });
      });
    });

    describe('Delivery class', () => {
      describe('creating a new Delivery', () => {
        it('creates a new delivery with a mealId', () => {
          expect(delivery.mealId).to.equal(meal.id);
        });
        it('creates a new delivery with a customerId', () => {
          expect(delivery.customerId).to.equal(customer.id);
        });
        it('creates a new delivery with a neighborhoodId', () => {
          expect(delivery.neighborhoodId).to.equal(neighborhood.id);
        });
        it('adds the delivery to the store', () => {
          expect(store.deliveries[0]).to.be.instanceof(Delivery);
        });

        it('adds a unique id to each delivery', () => {
          expect(typeof store.deliveries[0].id).to.equal('number');
          expect(delivery.id).to.not.equal(secondDelivery.id);
        });
      });
    });
  });

  describe('Object Relationships', () => {
    let redHook;
    let guy;
    let marioBatali;
    let friedCheesecake;
    let macAndCheese;
    let flavortownDelivery;
    let guysAmericanDelivery;
    let guysDuplicateDelivery;
    let batalisDessert;
    beforeEach(() => {
      store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
      redHook = new Neighborhood('Red Hook');
      guy = new Customer('Guy Fieri', redHook.id);
      marioBatali = new Customer('Iron Chef Mario Batali', redHook.id);
      friedCheesecake = new Meal('Fried Cheesecake', 30);
      macAndCheese = new Meal('Fried Macaroni and Cheese', 15);
      flavortownDelivery = new Delivery(friedCheesecake.id, redHook.id, guy.id);
      guysAmericanDelivery = new Delivery(macAndCheese.id, redHook.id, guy.id);
      guysDuplicateDelivery = new Delivery(macAndCheese.id, redHook.id, guy.id);
      batalisDessert = new Delivery(friedCheesecake.id, redHook.id, marioBatali.id);
    });

    describe('Neighborhood', () => {
      describe('deliveries()', () => {
        it('returns all unique deliveries associated with a particular neighborhood', () => {
          expect(redHook.deliveries()).to.deep.equal([
            flavortownDelivery,
            guysAmericanDelivery,
            guysDuplicateDelivery,
            batalisDessert,
          ]);
        });
      });
      describe('customers()', () => {
        it('returns all customer instances associated with a particular neighborhood', () => {
          expect(redHook.customers()).to.deep.equal([guy, marioBatali]);
        });
      });
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
      describe('neighborhood()', () => {
        it('returns the neighborhood in which a delivery was placed', () => {
          expect(guysAmericanDelivery.neighborhood()).to.equal(redHook);
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
          expect(guy.meals()).to.deep.equal([friedCheesecake, macAndCheese, macAndCheese]);
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

  describe('Aggregate Methods', () => {
    let upperEast;
    let bigSpender;
    let lobster;
    let turducken;
    let fancyPizza;
    let deliveryOne;
    let deliveryTwo;
    let deliveryThree;
    let deliveryFour;
    beforeEach(() => {
      store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
      upperEast = new Neighborhood('Upper East Side');
      bigSpender = new Customer('DJ MoneyBags', upperEast.id);
      lobster = new Meal('lobster', 500);
      turducken = new Meal('turducken', 750);
      fancyPizza = new Meal('fancy pizza', 600);
      deliveryOne = new Delivery(lobster.id, upperEast.id, bigSpender.id);
      deliveryTwo = new Delivery(turducken.id, upperEast.id, bigSpender.id);
      deliveryThree = new Delivery(fancyPizza.id, upperEast.id, bigSpender.id);
      deliveryFour = new Delivery(fancyPizza.id, upperEast.id, bigSpender.id);
    });
    //describe('Meal methods', () => {
      //describe('Meal.byPrice()', () => {
        //it('orders all of the meals by price', () => {
          //expect(Meal.byPrice()[0]).to.equal(turducken);
          //expect(Meal.byPrice()[1]).to.equal(fancyPizza);
          //expect(Meal.byPrice()[2]).to.equal(lobster);
        //});
      //});
    //});

    describe('Customer methods', () => {
      describe('totalSpent()', () => {
        it('calculates the total amount spent by a customer', () => {
          expect(bigSpender.totalSpent()).to.equal(2450);
        });
      });
    });

    describe('Neighborhood methods', () => {
      describe('meals()', () => {
        it('returns a unique list of meals orderd in a neighborhood', () => {
          expect(upperEast.meals().length).to.equal(3);
        });
      });
    });
  });
});
