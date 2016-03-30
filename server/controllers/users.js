var _ = require('lodash');
var User = require('../models/user');
var passport = require('passport');

/**
 * POST /login
 */
exports.postLogin = function(req, res, next) {
  // Do username and password validation for the server
  passport.authenticate('local', function(err, user, info) {
    if(err) return next(err);
    if(!user) {
     return res.status(401).json({ message: info.message});
    }
    // Passport exposes a login() function on req (also aliased as
    // logIn()) that can be used to establish a login session
    req.logIn(user, function(err) {
      if(err) return res.status(401).json({message: err});
      return res.status(200).json(
        {
          message: 'You have been successfully logged in.'
        });
    });
  })(req, res, next);
};


/**
 * POST /logout
 */
exports.postLogout = function(req, res) {
  // Do username and password validation for the server
  req.logout();
  res.redirect('/');
};

/**
 * POST /signup
 * Create a new local account
 */
exports.postSignUp = function(req, res, next) {
  var user =  new User({
    username: req.body.username,
    password: req.body.password
  });

  User.findOne({username: req.body.username}, function(err, existingUser) {
    if(existingUser) {
      return res.status(409).json({ message: 'Account with this username address already exists!'});
    }
    user.save(function(err) {
      if(err) return next(err);
      req.logIn(user, function(err) {
        if(err) return res.status(401).json({message: err});
        return res.status(200).json(
          {
            message: 'You have been successfully logged in.'
          });
      });
    });
  });
};
