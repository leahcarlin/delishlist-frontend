# 🍔 Delish List

<!-- See the deployed version here -->

## Description
For my portfolio project during my full-stack javascript I built an app that allows users to create wish lists of restaurants they want to try. Users can share wish lists with friends and there can be multiple collaborators on a list. The front-end is created with JavaScript, React, Redux and CSS, and the back-end with an Express server, JWT & Bcrypt authentication and a PostgreSQL database with Sequelize ORM. I fetched restaurant data from Google Places API and rendered a map for each restaurant's location.

I started with brainstorming and creating a database diagram, wireframes, and user stories followed by setting up the back end and working through each feature. I was able to apply many new concepts including many to many relations, using maps, and further my skills with React Redux.

## Table of Contents

- App Demo
- Technology Used
- Goals for this Project
- User Stories and Wireframe
- Repositories

## :mag: App Demo


## :woman_technologist: Technology Used

- JavaScript 
- React
- Redux
- Express
- REST API
- Sequelize as ORM
- PostgreSQL
- One-to-many models
- Many-to-many models
- CSS
- PayPal
- Cloudinary

## :dart: Goals for this Project

The goal for this project included, among others, the following goals:
- practising full-stack app development
- building a working prototype in 9 days
- applying skills which we learnt during the Codaisseur bootcamp
- exploring new technology single-handedly
- showcasing and documenting development skills using:
  - wireframes
  - data models
  - user stories
  - project boards
  - git flow

## :bar_chart: User Stories and Wireframe

### User stories for this project:

As a user:
- I want to learn more about the company and receive information about the business
- I want to see all products available to purchase
  - page shows an overview with all products for sale
  - each product is displayed with an image, product name, and short description 
  - each product has a 'view product' button which leads to a product details page 
- I want to see details on an individual product
  - I have several options of each products to chose from (all required): size, ground type, quantity
  - the product page has a 'purchase' button that adds the product to the shopping bag
- I want to purchase products
  - in my shopping bag I find all my added products
  - I can adjust my shopping cart or delete products 
  - a form requests my personal and shipping information
  - I can pay with PayPal

As an admin:
- I want to navigate to an admin dash to see an overview of created orders and my available products
- I want to see more information on a specific order
- I want see details on a specific product
  - details pages shows all information on the product
  - page shows a 'delete' button which deletes the product from my database
  - page shows a 'edit' button which displays a form, allowing me to change initial information
- I want post new products to my product list

### Wireframe:
Go to [MockFlow](https://wireframepro.mockflow.com/view/gujicoffee) to see the wireframes

## :point_down: Repositories
[Click](https://github.com/lauraamiaa/guji-frontend) to see the front-end repo

[Click](https://github.com/lauraamiaa/guji-backend) to see the back-end repo
