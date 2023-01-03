const express = require('express');

const rootDir = require('../util/path');

const passwordData = require('./form');

const router = express.Router();

const realPassword = passwordData.password;

router.get('/users', (req, res, next) => {
    res.render('users', {
        password: realPassword,
    })
})

module.exports = router;