# Express with Prisma and PostgreSQL-RESTFUL API
## Project Description

This is a simple RESTful API built using **Express.js**, **Prisma ORM**, and **PostgreSQL**. It serves as a minimal backend platform to manage:

- **Users** (Create, Read, Update, Delete)
- **Posts** (Create, Read, Update, Soft Delete)
- **Products** (Create, Read, Update, Delete)

The application uses Prisma as the database toolkit and connects to a PostgreSQL database. It demonstrates a clean and modular way of structuring CRUD operations and API routing.

## Technologies Used

- **Node.js** with **Express.js** – Server and routing
- **Prisma ORM** – Database client for working with PostgreSQL
- **PostgreSQL** – Relational database
- **dotenv** – For managing environment variable

##  Features With their Endpoints.
###  Users.
- POST /users – Create a new user

method; post http://localhost:3000/users
```json
{
    "id": "d57c0e89-9c88-450f-a5da-9f0253242444",
    "firstName": "maish",
    "lastName": "tech",
    "emailAddress": "maishtech.@example.com",
    "username": "maish"
}
```

- GET /user – Fetch all users

method; Get http://localhost:3000/user
```json
[
    //first user 
    {
        "id": "cc435779-c7dc-4f47-b772-cfb892598455",
        "firstName": "dennoh",
        "lastName": "otwosh",
        "emailAddress": "dennoh.otwosh@example.com",
        "username": "maina123"
    },
    //second user
    {
        "id": "d57c0e89-9c88-450f-a5da-9f0253242444",
        "firstName": "maish",
        "lastName": "tech",
        "emailAddress": "maishtech.@example.com",
        "username": "maish"
    }
]
```
- GET /users/:id – Fetch a specific user with their posts

method;Get http://localhost:3000/users/cc435779-c7dc-4f47-b772-cfb892598455
```json
{
    "id": "cc435779-c7dc-4f47-b772-cfb892598455",
    "firstName": "dennoh",
    "lastName": "otwosh",
    "emailAddress": "dennoh.otwosh@example.com",
    "username": "maina123",
}
```
- PUT /user/:id – Update user details

method; put http://localhost:3000/user/d57c0e89-9c88-450f-a5da-9f0253242444

before
```json
 {
        "id": "d57c0e89-9c88-450f-a5da-9f0253242444",
        "firstName": "maish",
        "lastName": "tech",
        "emailAddress": "maishtech.@example.com",
        "username": "maish"
    }
```

after
```json
{
 "id": "d57c0e89-9c88-450f-a5da-9f0253242444",
    "firstName": "maish mwangi",
    "lastName": "tech.com",
    "emailAddress": "maishtech.@example.com",
    "username": "maish"
}
```
- DELETE /users/:id – Delete a user

method; delete http://localhost:3000/users/cc435779-c7dc-4f47-b772-cfb892598455

```json
{
    "message": "User deleted successfully",
    "deletedUser": {
        "id": "cc435779-c7dc-4f47-b772-cfb892598455",
        "firstName": "dennoh",
        "lastName": "otwosh",
        "emailAddress": "dennoh.otwosh@example.com",
        "username": "maina123"
    }
}
```

###  Posts.
- POST /post – Create a post associated with a user
- GET /post – Get all posts (excluding soft-deleted ones)
- GET /post/:id – Get a specific post
- PUT /post/:id – Update a post
- DELETE /post/:id – Soft delete a post (isDeleted = true)

### Products.
- POST /products – Create a new product

method; post http://localhost:3000/products

```json 
{
    "id": 3,
    "productTitle": "Choco Bread",
    "productDescription": "Delicious chocolate-filled bread",
    "productCost": 150,
    "unitsLeft": 20
}
```
- GET /products – Get all products

method; Get http://localhost:3000/products
```json
[
    //product 1
    {
        "id": 1,
        "productTitle": "Chocolate Cake",
        "productDescription": "Delicious rich chocolate flavor",
        "productCost": 450,
        "unitsLeft": 20
    },

    //product 2
    {
        "id": 2,
        "productTitle": "Chocolate Cake",
        "productDescription": "Delicious homemade chocolate cake",
        "productCost": 500,
        "unitsLeft": 10
    },

    //product 3
    {
        "id": 3,
        "productTitle": "Choco Bread",
        "productDescription": "Delicious chocolate-filled bread",
        "productCost": 150,
        "unitsLeft": 20
    }
]
```
- GET /products/:id – Get a specific product by ID

method; Get http://localhost:3000/products/1

```json
{
    "id": 1,
    "productTitle": "Chocolate Cake",
    "productDescription": "Delicious rich chocolate flavor",
    "productCost": 450,
    "unitsLeft": 20
}
```
- PUT /products/:id – Update a product

method; Put http://localhost:3000/products/1

```json
//before
{
    "id": 1,
    "productTitle": "Chocolate Cake",
    "productDescription": "Delicious rich chocolate flavor",
    "productCost": 450,
    "unitsLeft": 20
}
//after
{
    "id": 1,
    "productTitle": "late Bread",
    "productDescription": "Delicious chocolate-filled bread and cream combination",
    "productCost": 110,
    "unitsLeft": 50
}
```
- DELETE /products/:id – Delete a product

method; delete http://localhost:3000/products/1

```json
{
    "message": "Product deleted successfully",
    "deletedProduct": {
        "id": 1,
        "productTitle": "late Bread",
        "productDescription": "Delicious chocolate-filled bread and cream combination",
        "productCost": 110,
        "unitsLeft": 50
    }
}
```

## items record
![](./assets/Screenshot%202025-06-15%20173233.png)



