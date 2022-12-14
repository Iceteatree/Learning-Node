const express = require('express'); 

const app = express();

app.use('/', (req, res, next) => {
    console.log('This always runs');
    next();
});

app.use('/add-product', (req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>Add Product Page!</h1>'); // Send allows us to send a any response.
    // If you're calling res, then you'll never want to call next();
});

app.use('/', (req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>Hello from Express!</h1>'); // Send allows us to send a any response.
});

app.listen(3000);
