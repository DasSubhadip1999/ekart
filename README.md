
# E-commerce restAPI with NodeJS

This is a restAPI for e-commerce website. It has all the feature of registering user, login user, adding product to database and ordering it step by step.


## Tech Stack

**Server** : NodeJs, ExpressJs, MongoDB, Mongoose


## Installation

Install ekart with npm install

```bash
  npm install
```
    
## API Reference

#### Register user

```http
  POST /users/register
```

| Form | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. |
| `email` | `string` | **Required**. |
| `password` | `string` | **Required**. (min length six) |

#### Login user

```http
  POST /users/login
```

| Form | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**|
| `password` | `string` | **Required**. (min length six) |


#### Add products

```http
  POST /products/add-products
```

| Form | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**|
| `price` | `string` | **Required**|
| `images`      | `file` | **Required**|

| Authorization | Type     | Description  |
| :-------- | :------- | :----------------|
| `Headers`   | `Bearer Token` | **Only admin**|


#### Get all products

```http
  GET /products/get
```

#### Get a single product

```http
  GET /products/get/:productID
```

| Params | Type     | Description  |
| :-------- | :------- | :----------------|
| `:productID`   | `string` | **Required**|


#### Add to cart product

```http
  POST /products/get/:productID/add-to-cart
```

| Params | Type     | Description  |
| :-------- | :------- | :----------------|
| `:productID`   | `string` | **Required**|

| Authorization | Type     | Description  |
| :-------- | :------- | :----------------|
| `Headers`   | `Bearer Token` | **Required**|


#### Remove a product from cart

```http
  DELETE  /products/get/:productID/delete-cart-item
```

| Params | Type     | Description  |
| :-------- | :------- | :----------------|
| `:productID`   | `string` | **Required**|

| Authorization | Type     | Description  |
| :-------- | :------- | :----------------|
| `Headers`   | `Bearer Token` | **Required**|


#### Get cart products

```http
  GET /products/get/cart-products
```

| Authorization | Type     | Description  |
| :-------- | :------- | :----------------|
| `Headers`   | `Bearer Token` | **Required**|


#### Make payment for cart

```http
  POST /checkout/payment
```

| Authorization | Type     | Description  |
| :-------- | :------- | :----------------|
| `Headers`   | `Bearer Token` | **Required**|

| Form | Type     | Description  |
| :-------- | :------- | :----------------|
| `paymentMode`   | `['online', 'cod']` | **Required**|


#### Place an order

```http
  POST /orders/place-order/:paymentID
```

| Authorization | Type     | Description  |
| :-------- | :------- | :----------------|
| `Headers`   | `Bearer Token` | **Required**|

| Params | Type     | Description  |
| :-------- | :------- | :----------------|
| `paymentID`   | `string` | **Required**|


#### Get all orders

```http
  GET /orders/get
```

| Authorization | Type     | Description  |
| :-------- | :------- | :----------------|
| `Headers`   | `Bearer Token` | **Required**|






## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`

`JWT_SECRET`

`DB`

`NODE_ENV`

`PORT`

`BASE_URL`


