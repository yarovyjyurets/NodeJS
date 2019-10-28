NodeJS road map!

***GENERAL TODO***
- <s>add logging middleware for "GET: path"</s>
- add to cart: {products: [{id, qty}], totalPrice}
- <s>add details view for product</s>

***Views Requirements***

***Done***
- <s>EJS views: (common navigation; headers)</s>
- <s>GET /home-page GET /product-list</s>
- <s>GET /admin/add-product (for admin)</s>
- <s>404</s>
- <s>GET /admin/product-list (for admin)</s>
- <s>GET /product-detail</s>
- <s>GET /cart</s>
- <s>GET /checkout</s>
- <s>GET /orders</s>

***TODO***
- GET /admin/edit-product/{id} (for admin)

***REST Requirements***

***Done***
- <s>POST /products (for admin)</s>
- <s>GET /products</s>

***TODO***
- Admin:
  - PATCH /products/{id} (for admin)
  - DELETE /products/{id} (for admin)
- Public:
  - GET /products/{id}