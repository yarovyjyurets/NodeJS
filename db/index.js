const { Sequelize } = require('sequelize');
const globby = require('globby');
const path = require('path');

const sequelize = new Sequelize('shop', 'root', 'qwe', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    freezeTableName: true
  }
});

const db = {};
/**
 * Import models
 */
const pattern = path.join(__dirname, '/models/**', '*.js');
const models = globby.sync([pattern]);

models.forEach((file) => {
  const model = sequelize.import(file);

  model.field = property => field(model, property);

  model.fullField = property => fullField(model, property);

  db[model.name] = model;
});

/**
 * Association models
 */
Object.keys(db).forEach((key) => {
  if ('associate' in db[key]) {
    db[key].associate(db);
  }
});

db.sequelize = sequelize;
/**
 * Check connection to DB
 */
db.start = () => sequelize.authenticate()
  .then(() => {
    console.log('connection has been established successfully');
  })
  .catch((err) => {
    console.error('unable to connect to the database', err);
    throw err;
  });

module.exports = db;
