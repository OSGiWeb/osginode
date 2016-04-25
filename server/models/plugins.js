/**
 * Created by Information on 2016/4/20.
 */
/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');

var PluginSchema = new mongoose.Schema({
  id: String,
  pluginname: String,
  symbolicname: String,
  category: String,
  version: String,
  author: String,
  releasedate: { type: Date, default: Date.now },
  description: String
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
Plugin = mongoose.model('Plugin', PluginSchema);