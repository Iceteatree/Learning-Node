const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart //{items: []};
        this._id = id;
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
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });
        let newQuantity = 1;
        let cartProduct = this.cart.items[cartProductIndex];
        const updatedCartItems = [...this.cart.items];

        if (cartProduct >= 0) {
            newQuantity = this.cart.items(cartProductIndex).quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({productId: new mongodb.ObjectId(product._id), quantity: newQuantity});
        }
        const updatedCart = {items: updatedCartItems};
        const db = getDb();
        return db
            .collection('users_learning_node')
            .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: updatedCart}})
    }

    getCart() {
        const db = getDb();
        const productIds = this.cart.items.map(i => {
            return i.productId;
        });
        return db
            .collection('products_learning_node')
            .find({_id: {$in: productIds}})
            .toArray()
            .then(products => {
                return products.map(p => {
                    return {...p, quantity: this.cart.items.find(i => {
                        return i.productId.toString() === p._id.toString();
                    }).quantity
                };
            });
        });
    }
    
    deleteItemFromCart(productId) {
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== productId.toString();
        });
        const db = getDb();
        return db
            .collection('users_learning_node')
            .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: {items: updatedCartItems}}});
    }

    addOrder() {
        const db = getDb();
        return this.getCart()
        .then(products => {
            const order = {
                items: products,
                user: {
                    _id: new mongodb.ObjectId(this._id),
                    name: this.name
                }
            };
            return db.collection('orders_learning_node').insertOne(order);
        })
        .then(result => {
            this.cart = {items: []};
            return db
                .collection('users_learning_node')
                .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: {items: []}}});
        });
    }

    getOrders() {
        const db = getDb();
        return db
            .collection('orders_learning_node')
            .find({'user._id': new mongodb.ObjectId(this._id)})
            .toArray();
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