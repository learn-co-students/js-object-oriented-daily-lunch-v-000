# Daily Lunch Lab

## Objectives

* Build a domain model with class relations using JavaScript iterator methods
* Use JavaScript to answer questions about data stored in our application
* In this lab, we're using a global store variable to manage application state; it's our frontend 'database'.

## Instructions

In this lab, we will be creating a meal delivery service.

## The Domain

* A meal has many customers
* A delivery belongs to a meal, belongs to a customer, and belongs to a neighborhood
* A customer has many deliveries
* A customer has many meals through deliveries
* A customer belongs to a neighborhood
* A neighborhood has many deliveries
* A neighborhood has many customers through deliveries
* A neighborhood has many meals through deliveries

---

Please note: the tests do not check these methods in order. Some of these
methods rely on the relationships between classes to be working already. Use the
tests as a guide and refer to this reading if you need more information about
what a method is supposed to be doing.

---

You will be modeling the following:

#### Neighborhood class:

* `new Neighborhood()` - initialized with `name`. It returns an object that has attributes of `id` and `name`
* `deliveries()` - returns a list of all deliveries placed in a neighborhood
* `customers()` - returns all of the customers that live in a particular neighborhood
* `meals()` - returns a **unique** list of meals that have been ordered in a particular neighborhood (you might want to do this one last)

#### Customer class:

* `new Customer()` — should expect to be initialized with a name and a neighborhoodId. It returns an object that has attributes of `id`, `neighborhoodId`, and `name`.
* `deliveries()` — returns all of the deliveries that customer has received
* `meals()` - returns all meals that a customer has ordered
* `totalSpent()` - returns the total amount that the customer has spent on food.

#### Meal class:

* `new Meal()` — initialized with `title` and `price`. It returns an object that has attributes of `title`, `price`, and `id`. Meal Ids should automatically increment.
* `deliveries()` - returns all of the deliveries associated with a particular meal.
* `customers()` - returns all of the customers who have had the meal delivered. Be careful not to return the same customer twice if they have ordered this meal multiple times.
* `byPrice()` - A **[class method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static)** that orders all meal instances by their price in descending order. Use the `static` keyword to write a class method.

#### Delivery class:

* `new Delivery()` — initialized with `mealId`, `neighborhoodId`, and `customerId`. It returns an object that has attributes of `mealId`, `neighborhoodId`, `customerId`, and `id`
* `meal()` - returns the meal associated with a particular delivery
* `customer()` - returns the customer associated with a particular delivery
* `neighborhood()` - returns the neighborhood associated with a particular delivery

![paul rudd delivers food](https://media.giphy.com/media/3oz8xuoxXfXb1ONus8/giphy.gif)



