const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const formRoute = require('./routes/form');
const userRoute = require('./routes/users');

app.set('view engine', 'ejs');
app.set('views', 'views'); // Don't need to do this as it sets it to this as default but good for memory.

app.use(bodyParser.urlencoded({ extended: false }))

app.use(formRoute.routes);
app.use(userRoute);

app.listen(3000, () => {
    console.log('meow');
})