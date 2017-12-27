Daily Lunch Lab

Objectives
Build a domain model with class relations using JavaScript iterator methods
Use JavaScript to write query methods on our classes to answer questions about data in the store
Instructions
In the following lab, we will be modeling all the models for The Daily Deli. The Daily Deli delivers daily lunches to different offices around US Cities. A customer orders a meal and it is delivered to the office of the customer's employer. So The Daily Deli relates a customer to a meal based on whether that meal was delivered to a customer. The employer of a customer is associated with the deliveries and meals ordered by its employees.

You will be modeling the following:

Customer class:

new Customer() — initialized with both name, and an instance of an employer; returns a JavaScript object that has attributes of id, employerId, and name
meals() - returns all of the meals that a customer has had delivered
deliveries() — returns all of the deliveries that customer has received
totalSpent() - returns the total amount that the customer has spent, as a function of the cost of the meals he has had delivered
Meal class:

new Meal() — initialized with title and price; returns an object that has attributes oftitle, price, and id
deliveries() - returns all of the deliveries that delivered the particular meal.
customers() - returns all of the customers who have had the meal delivered.
byPrice() - A class method that orders the meals by their price. Use the static keyword to write a class method.
Class methods are methods that are not called on an instance of the class, but on the class itself, for example Meal.byPrice() is a class method as it is called on the Meal class. You can write a class method simply by preceding a method on a class with JavaScript's static keyword. You can read more about class methods in JavaScript here.

Delivery class:

new Delivery() — initialized with meal and customer; returns an object that has attributes of mealId, customerId, and id
meal() - returns the meal associated with the delivery
customer() - returns the customer associated with the delivery
Employer class:

new Employer() — initialized with name; returns an object that has attributes of name and id
employees() - returns a list of customers employed by the employer
deliveries() - returns a list of deliveries ordered by the employer's employees
meals() - returns a list of meals ordered by the employer's employees. The method is to not return the same meal multiple times.
mealTotals() - returns a JavaScript object displaying each respective meal id ordered by the employer's employees. The keys of the JavaScript object are the meal ids and associated with each meal id is a value. For example, employerOne.mealTotals() returning an object of {1: 4, 2: 3} would mean that the meal with id of 1 was ordered by employerOne's employees four times, and the meal with id of 2 was ordered by employerOne's employees three times.
