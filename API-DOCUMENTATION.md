# User API

## Get User

Get user information.

### Request

- Method: `GET`
- Endpoint: `/api/users/`
- Headers:
  - `Authorization`: token

### Response

- Status Code: `200 OK`
- Body: JSON object containing user information

---

## Get User by ID

Get user information by ID.

### Request

- Method: `GET`
- Endpoint: `/api/users/:id`
- Headers:
  - `Authorization`: token

### Response

- Status Code: `200 OK`
- Body: JSON object containing user information

---

## Create User

Create a new user.

### Request

- Method: `POST`
- Endpoint: `/api/users/`
- Body:
  ```
  {
  'firstName':'Le Anh',
  'lastName':'Tuan',
  'username':'tuanla',
  'password_digest':'123456',
  }
  ```

### Response

- Status Code: `201 Created`
- Body: JSON object containing created user information

---

## User Login

Authenticate user.

### Request

- Method: `POST`
- Endpoint: `/api/users/login`
- Body:
  ```
  {
  'username':'tuanla',
  'password_digest':'123456',
  }
  ```

### Response

- Status Code: `200 OK`
- Body: JSON object containing authentication token

# Product API

## Get All Products

Retrieve a list of all products.

### Request

- Method: `GET`
- Endpoint: `/api/products/`

### Response

- Status Code: `200 OK`
- Body: JSON array containing product objects

---

## Get Product by ID

Retrieve product information by its ID.

### Request

- Method: `GET`
- Endpoint: `/api/products/:id`

### Response

- Status Code: `200 OK`
- Body: JSON object containing product information

---

## Create Product

Create a new product.

### Request

- Method: `POST`
- Endpoint: `/api/products/`
- Headers:
  - `Authorization`: token
- Body:

```
{
'name':'Pho bo',
'price':60000
}
```

### Response

- Status Code: `201 Created`
- Body: JSON object containing created product information

# Order API

## Get Orders by User ID

Retrieve orders associated with a specific user.

### Request

- Method: `GET`
- Endpoint: `/api/orders/:userId`
- Headers:
  - `Authorization`: token

### Response

- Status Code: `200 OK`
- Body: JSON array containing order objects

---

## Create Order

Create a new order.

### Request

- Method: `POST`
- Endpoint: `/api/orders/`
- Headers:
  - `Authorization`: token
- Body:

```
[
    {
        "id": 3,
        "name": "Bun rieu cua",
        "price": 45000,
        "quantity": 5
    }
]
```

### Response

- Status Code: `201 Created`
- Body: JSON object containing created order information
