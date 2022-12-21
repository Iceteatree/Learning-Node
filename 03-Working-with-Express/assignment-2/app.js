const express = require('express');

const app = express();


app.use((req, res, next) => {
    console.log('1');
    next();
})

app.use('/users', (req, res, next) => {
    res.send('<h3>Users are here</h3>');
});

app.use('/', (req, res) => {
    console.log('2');
    res.send('<h1>I work</h1>');
});

app.listen('3000');