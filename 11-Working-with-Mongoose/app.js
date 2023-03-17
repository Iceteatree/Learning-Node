require('dotenv').config();
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('64084b650e0e6a4fa11e42a3')
    .then(user => {
        req.user =  new User(user.name, user.email, user.cart, user._id);
        next();
    })
    .catch(err => console.log(err));
})


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPassword}@cluster0-education.qfhv1.mongodb.net/shop_learning_node?retryWrites=true&w=majority`)
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });