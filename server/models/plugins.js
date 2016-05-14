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
  releasedate: String,
  description: String,
  isprivate: { type: Boolean, default: true},
  dependencies: Array,
  filemeta: {
    sourcecode: {
      id: { type: String, default: ''},
      name: { type: String, default: '' }
    },
    library: {
      id: { type: String, default: ''},
      name: { type: String, default: '' },
      type: { type: String, default: '' }
    },
    Documents: Array,
  }
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
Plugin = mongoose.model('Plugin', PluginSchema);