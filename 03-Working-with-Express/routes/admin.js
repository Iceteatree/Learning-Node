const path = require('path');
const express = require('express');

const router = express.Router();

router.use('/', (req, res, next) => {
    // console.log('This always runs');
    next();
});

router.get('/add-product', (req, res, next) => {
    console.log('In another middleware!');
    // res.send('<h1>Add Product Page!</h1>'); // Send allows us to send a any response.
    // If you're calling res, then you'll never want to call next();
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});

router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
})

module.exports = router;