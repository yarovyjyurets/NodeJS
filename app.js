const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const constants = require('./core/constants');
const shopRouter = require('./routers/shop');
const adminRouter = require('./routers/admin');
const notFoundController = require('./controllers/404');

const app = express();
// SETTINGS
app.set('x-powered-by', false);
app.set('view engine', 'ejs');
app.set('views', 'views');
// MIDLEWARES
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// ROUTERS
app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(notFoundController);


const port = process.env.PORT || constants.PORT;
app.listen(port, () => console.log(`Server listening on port ${port}`));