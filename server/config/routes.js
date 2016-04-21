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
  // user routes
  app.post('/login', users.postLogin);
  app.post('/signup', users.postSignUp);
  // app.post('/logout', users.postLogout);


// topic routes
  app.get('/pluginsRepository', plugins.all);
  app.post('/pluginsRepository/:id', function(req, res) {
    plugins.add(req, res);
  });

  // app.post('/topic/:id', function(req, res) {
  //   topics.add(req, res);
  // });
  //
  // app.put('/topic/:id', function(req, res) {
  //   topics.update(req, res);
  // });
  //
  // app.delete('/topic/:id', function(req, res) {
  //   topics.remove(req, res);
  // });

  // This is where the magic happens. We take the locals data we have already
  // fetched and seed our stores with data.
  // App is a function that requires store data and url to initialize and return the React-rendered html string
  // app.get('*', function (req, res, next) {
  //   App.default(req, res);
  // });

};
