const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (cb) => {
    MongoClient.connect('mongodb+srv://alan-basic-user:alan123@cluster0-education.qfhv1.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected');
        cb(client);
    })
    .catch(err => console.log(err));
}

module.exports = mongoConnect;