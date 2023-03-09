const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart;
        this_id = id;
    }

    save () {
        const db = getDb();
        return db.collection('users_learning_node').insertOne(this)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
    }

    addToCart(product) {
        // const cartProduct = this.cart.items.findIndex(cp => {
        //     return cp._id === product._id;
        // });
        const updatedCart = {items: [{ productId: new mongodb.ObjectId(product._id), quantity: 1}]};
        const db = getDb();
        return db
            .collection('users_learning_node')
            .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: updatedCart}})
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users_learning_node').find({_id: new mongodb.ObjectId(userId)}).next()
        .then(user => {
            console.log(user);
            return user;
        })
        .catch(err => {
            console.log(err);
        })
    }
}

module.exports = User;