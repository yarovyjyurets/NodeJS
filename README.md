NodeJS road map!

***GENERAL TODO***
add logging middleware for "GET: path"

***Views Requirements***
***Done***
EJS views: (common navigation; headers)
GET /home-page GET /product-list
GET /admin/add-product (for admin)
404
GET /admin/product-list (for admin)
GET /cart
GET /checkout
GET /orders
***TODO***
GET /admin/edit-product/{id} (for admin)

***REST Requirements***
***Done***
POST /products (for admin)
GET /products
***TODO***
Admin:
PATCH /products/{id} (for admin)
DELETE /products/{id} (for admin)
Public:
GET /products/{id}