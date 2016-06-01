/**
 * Created by Information on 2016/5/30.
 */
var mongoose = require('mongoose');
var _ = require('lodash');

var mu = require('mu2');
var assert = require('assert'),
  fs = require('fs'),
  path = require('path');
var mkdirp = require('mkdirp');

var JSZip = require("jszip");

/**
 * Generate a plugin with template on server-side
 */
exports.generatePlugin = function (req, res) {
  console.log('/<------ Generating Plugun with Template ------>/');
  console.log(req.body);


  /**
 * IMPLEMENT CODE Generator here
 */

  /* Step 1: Generate plugin file system structure with plugin name */
  // Define paths
  mu.root = path.join(__dirname, '..', 'generator/templates/plugin/');
  destPath = path.join(__dirname, '..', 'generator/generated/');
  var zip = new JSZip();

  // Read generator rules in plugins.js
  var js = fs.readFileSync(mu.root + '/plugins.js').toString();
  js = eval('(' + js + ')');

  // Make directories
  var pluginSymblicName = 'com.plugins.' + js.pluginname;
  var pluginPath = destPath + pluginSymblicName + '/';
  mkdir(pluginPath);
  mkdir(pluginPath + '/gui');


  /* Step 2: Do plugin generation process */
  [
    'CMakeLists.txt',
    'manifest_headers.cmake',
    'target_libraries.cmake',
    '{{pluginname}}WindowActivator.cpp',
    '{{pluginname}}WindowActivator.h',
    '{{pluginname}}ZmqBuilder.cpp',
    '{{pluginname}}ZmqBuilder.h',
    'gui/{{pluginname}}WindowWidgetPlugin.cpp',
    'gui/{{pluginname}}WindowWidgetPlugin.h'
  ].forEach(function (name) {

    // Change plugin name
    pluginFileName = name.replace('{{pluginname}}', js.pluginname);

    // Create write stream to write buffer content to files
    var buffer = '';
    var wstream = fs.createWriteStream(pluginPath + pluginFileName);
    
    
    mu.compileAndRender(name, js) // Use predefined 'mu.root' as root path
      .on('data', function (c) {
        buffer += c.toString();
      })
      .on('end', function () {
        wstream.write(buffer);
        wstream.end();
        console.log("Generated: " + name.replace('{{pluginname}}', js.pluginname));


        /* Compress generated file of plugin into zip file */
        console.log('/<------ Compress files into zip file:' + pluginFileName + ' ------>/');
        
        // TODO: zip folder when generating finished!
        zip.file(name.replace('{{pluginname}}', js.pluginname), buffer);
        var wstreamZip = fs.createWriteStream(destPath + pluginSymblicName + '.zip');

        zip
          .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
          .pipe(wstreamZip)
          .on('finish', function () {
            // JSZip generates a readable stream with a "end" event,
            // but is piped here in a writable stream which emits a "finish" event.
            // wsZip.end();
            console.log(pluginSymblicName + ".zip written.");
          });
          
          // wstream.end();

      });
  })



};

/**
 * Mkdir -p.
 *
 * @param {String} path
 * @param {Function} fn
 */

function mkdir(path, fn) {
  mkdirp(path, 0755, function (err) {
    if (err) throw err;
    console.log('   \033[36mcreate\033[0m : ' + path);
    fn && fn();
  });
}

// function copy_template(from, to) {
//   from = path.join(__dirname, '..', 'templates/com.plugins.template/', from);
//   write(to, fs.readFileSync(from, 'utf-8'));
// }

/**
 * Check if the given directory `path` is empty.
 *
 * @param {String} path
 * @param {Function} fn
 */

// function emptyDirectory(path, fn) {
//   fs.readdir(path, function (err, files) {
//     if (err && 'ENOENT' != err.code) throw err;
//     fn(!files || !files.length);
//   });
// }

/**
 * echo str > path.
 *
 * @param {String} path
 * @param {String} str
 */

// function write(path, str, mode) {
//   fs.writeFileSync(path, str, { mode: mode || 0666 });
//   console.log('   \x1b[36mcreate\x1b[0m : ' + path);
// }
