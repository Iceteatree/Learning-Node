const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get('Cookie').split('=')[1].trim();
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('641d615ca6451a50b3ec9af1')
  .then(user => {
      req.session,isLoggedIn = true;
      req.session.user = user;
      res.redirect('/');
  })
  .catch(err => console.log(err));
};

