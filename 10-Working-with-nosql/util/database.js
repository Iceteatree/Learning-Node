const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
require('dotenv').config();

let _db;
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoConnect = (cb) => {
    MongoClient.connect(`mongodb+srv://${mongoUser}:${mongoPassword}@cluster0-education.qfhv1.mongodb.net/shop_learning_node?retryWrites=true&w=majority`)
    .then(client => {
        console.log('Connected');
        _db = client.db()
        cb();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No Database Found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;