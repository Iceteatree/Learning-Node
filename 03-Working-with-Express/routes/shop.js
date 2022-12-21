const path = require('path');

const express = require('express');

const rootDir = require('../utils/path')

const router = express.Router();

router.get('/', (req, res, next) => {
    // console.log('In another middleware!');
    res.sendFile(path.join(rootDir, 'views', 'shop.html')); // Send allows us to send a any response.
});

module.exports = router;