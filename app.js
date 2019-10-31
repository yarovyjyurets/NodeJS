const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const constants = require('./core/constants');
const shopRouter = require('./routers/shop');
const adminRouter = require('./routers/admin');
const notFoundController = require('./controllers/404');
//midlewares
const logRequest = require('./middlewares/logRequest');
const getFullPath = require('./middlewares/getFullPath');
//db
const db = require('./db');

const app = express();
// SETTINGS
app.set('x-powered-by', false);
app.set('view engine', 'ejs');
app.set('views', 'views');
// MIDLEWARES
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logRequest);
app.use(getFullPath);
// ROUTERS
app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(notFoundController);


const port = process.env.PORT || constants.PORT;

(async () => {
  await db.start();
  await db.sequelize.sync({ force: true });

  app.listen(port, () => console.log(`Server listening on port ${port}`));
})();

