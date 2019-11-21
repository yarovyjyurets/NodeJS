const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const MongoDBSessionStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const uri = 'mongodb+srv://dev:pwd@shop-cluster-9xhpi.mongodb.net';
const store = new MongoDBSessionStore({
  uri,
  collection: 'sessions',
  databaseName: 'shop'
});

store.on('error', function (error) {
  console.log(error);
});

const DB = process.env.DB;

const constants = require('./core/constants');
const shopRouter = require('./routers/shop');
const adminRouter = require('./routers/admin');
const authRouter = require('./routers/auth');
const notFoundController = require('./controllers/404');
//midlewares
const logRequest = require('./middlewares/logRequest');
const getFullPath = require('./middlewares/getFullPath');
const userIdentifier = require('./middlewares/userIdentifier');
const authCheck = require('./middlewares/authCheck');
const warnings = require('./middlewares/warning');
const error = require('./middlewares/error');
//db
const db = require('./db');
//MongoDB 
const mongoDB = require('./mongDB');

const app = express();
// SETTINGS
app.set('x-powered-by', false);
app.set('view engine', 'ejs');
app.set('views', 'views');
// MIDLEWARES
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store
}));
app.use(csrf());
app.use(flash());
app.use(logRequest);
app.use(getFullPath);
app.use(warnings);

/**
 * Business logic: Login
 */
app.use(userIdentifier);
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  delete req.body._csrf;
  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.path = req.fullPath;
  next();
});
app.use(logRequest);

// ROUTERS
app.use('/admin', authCheck, adminRouter);
app.use(shopRouter);
app.use(authRouter);
app.use(notFoundController);
app.use(error);


const port = process.env.PORT || constants.PORT;

(async () => {
  if (DB === 'SQL') {
    await db.start();
  } else {
    await mongoDB.connect();
  }
  // await db.sequelize.sync({ force: true });

  app.listen(port, () => console.log(`Server listening on port ${port}`));
})();

