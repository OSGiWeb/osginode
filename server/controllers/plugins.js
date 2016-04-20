/**
 * Created by Information on 2016/4/20.
 */
var mongoose = require('mongoose');
var _ = require('lodash');
var Plugin = mongoose.model('Plugin');

/**
 * List all plugins
 */
exports.all = function(req, res) {
  Plugin.find({}).exec(function(err, plugins) {
    if(!err) {
      res.json(plugins);
    }else {
      console.log('Error in first query');
    }
  });
};