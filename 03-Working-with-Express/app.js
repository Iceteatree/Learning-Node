const express = require('express'); 
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res) => {
    res.status(404).send('<h1>404 - Page not found</h1>');
}); // Send to bottom of file since it's the final catch.

app.listen(3000);
