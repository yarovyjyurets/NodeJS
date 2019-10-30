NodeJS road map!

***GENERAL TODO***
- refactor cart Model with DB(Mysql), add association. 
- refactor structure with API/app.start, db separate
- add configuration file, env-vars
- add docker-compose for local develop with volumes
- add Dockerfile
docker run --restart always --name mysql8.0 -v /usr/local/opt/mysql/8.0:/var/lib/mysql -p 3306:3306 -d -e MYSQL_ROOT_PASSWORD=pwd mysql:8.0
- add Sequelize
- <s>add to cart: {products: {id:qty}, totalPrice}</s>
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
- <s>DELETE /products/{id} (for admin)</s>

***TODO***
- Admin:
- Public: