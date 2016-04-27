/**
 * Routes for express app
 */
var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');
// var Plugin = mongoose.model('Plugin');
var plugins = require('../controllers/plugins');
var users = require('../controllers/users');

// var path = require('path');
// var compiled_app_module_path = path.resolve(__dirname, '../../', 'public', 'build', 'server.js');
// var App = require(compiled_app_module_path);

module.exports = function(app, passport) {
  // User routes
  app.post('/login', users.postLogin);
  app.post('/signup', users.postSignUp);
  // app.post('/logout', users.postLogout);


  // Private repository routes
  app.get('/privateRepository', plugins.all);
  app.post('/privateRepository/:id', function(req, res) { plugins.add(req, res); });
  app.put('/privateRepository/:id', function(req, res) { plugins.update(req, res); });
  app.delete('/privateRepository/:id', function(req, res) { plugins.remove(req, res); });

  // This is where the magic happens. We take the locals data we have already
  // fetched and seed our stores with data.
  // App is a function that requires store data and url to initialize and return the React-rendered html string
  // app.get('*', function (req, res, next) {
  //   App.default(req, res);
  // });

};
