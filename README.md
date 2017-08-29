# Daily Lunch Lab

## Objectives
+ Build a domain model with class relations using JavaScript iterator methods
+ Use JavaScript to write query methods on our classes to answer questions about data in the store

## Instructions

In the following lab, we will be modeling a the models for The Daily Deli.  The Daily Deli delivers daily lunches to different offices around US Cities.

 You will be modeling the following:

`Customer` class:

+ `new Customer()` — initialized with both name, and an instance of an `employer`
+ `new Customer()` — returns a JavaScript object that has attributes of `id`, `employerId`, and `name`
+ `meals()` - returns all of the meals that a customer has had delivered
+ `deliveries()` — returns all of the deliveries that customer has received
+ `totalSpent()` - returns the total amount that the customer has spent, as a function of the cost of the meals he has had delivered

`Meal` class:
  + `new Meal()` — initialized with `title` and `price`
  + `new Meal()` — returns an object that has attributes of`title`, `price`, and `id`
  + `deliveries()` - returns all of the deliveries that delivered the particular meal.
  + `customers()` - returns all of the customers who have had the meal delivered.
  + `byPrice()` -  A class method that orders the meals by their price.  Use the `static` keyword to write a class method.  

`Delivery` class:
  + `new Delivery()` — initialized with `meal` and `customer`
  + `new Delivery()` — returns an object that has attributes of `mealId`, `customerId`, and `id`
  + `meal()` - returns the meal associated with the delivery
  + `customer()` - returns the customer associated with the delivery

`Employer` class:
  + `new Employer()` — initialized with `name`
  + `new Employer()` — returns an object that has attributes of `name` and `id`
  + `employees()` - returns a list of customers employed by the employer
  + `deliveries()` - returns a list of deliveries ordered by the employer's employees
  + `meals()` - returns a list of meals ordered by the employer's employees.  The method is to not return the same meal multiple times.
  + `mealTotals()` - returns a JavaScript object displaying each respective meal id ordered by the employer's employees.  The keys of the JavaScript object are the meal ids and associated with each meal id is a value
