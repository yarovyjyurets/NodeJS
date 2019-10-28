NodeJS road map!

***GENERAL TODO***
- refactor models(extract to utils PATH, promisifies)
- <s>add to cart: {products: [{id, qty}], totalPrice}</s>
- <s>add logging middleware for "GET: path"</s>
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
- <s>GET /admin/edit-product/{id} (for admin)</s>

***TODO***

***REST Requirements***

***Done***
- <s>POST /products (for admin)</s>
- <s>GET /products</s>
- POST(better PATCH) /products/{id} (for admin)

***TODO***
- Admin:
  - DELETE /products/{id} (for admin)
- Public:
  - GET /products/{id}