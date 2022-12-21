const express = require('express');
const path = require('path');

// Routes importing 
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');

const app = express();

// Create a static path to our pubic folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to use imported routes
app.use('/', indexRouter);
app.use(userRouter);



app.listen(3000, () => {
    console.log("Listening on port 3000")
})