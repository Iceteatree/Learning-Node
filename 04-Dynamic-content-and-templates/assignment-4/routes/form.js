const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const password = [];

router.get('/', (req, res, next) => {
    res.render('form', {
        title: 'World',
    });
});

router.post('/', (req, res) => {
    if (req.body) {
        password.push({main: req.body.password });
        res.redirect('/users');
    }
})

exports.routes = router;
exports.password = password;