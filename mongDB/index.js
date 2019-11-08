const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb+srv://dev:pwd@shop-cluster-9xhpi.mongodb.net';

// Database Name
const dbName = 'shop';

const mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

let _db;
// Use connect method to connect to the server

const connect = async () => {
  await mongoClient.connect()
    .catch((e) => {
      console.warn(e);
      throw e;
    });
  console.log('MongoDB is connected!');
  _db = mongoClient.db(dbName);
}

const getShopDb = () => {
  if (_db) {
    return _db
  }
  throw 'No data found';
}

module.exports = {
  mongoClient,
  connect,
  getShopDb,
}