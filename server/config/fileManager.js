/**
 * Created by Information on 2016/5/3.
 * This module is used to handle file upload, download and delete with data which storing in mongoDB GridFS
 */

var fs = require("fs");
var mime = require('mime');
var multer = require("multer");
var upload = multer({ dest: "./uploads" });
var secrets = require('./secrets');
var _ = require('lodash');

var mongoose = require("mongoose");
var Grid = require("gridfs-stream");
var gfs;
Grid.mongo = mongoose.mongo;

/* Global variables */
var counter = 1;
var filesResJson = {
  libs: [],
  docs: []
}

/* Utils Function */
function encodeRFC5987ValueChars(str) {
  return encodeURIComponent(str).
    // Note that although RFC3986 reserves "!", RFC5987 does not,
    // so we do not need to escape it
    replace(/['()]/g, escape). // i.e., %27 %28 %29
    replace(/\*/g, '%2A').
    // The following are not required for percent-encoding per RFC5987, 
    // so we can allow for a little better readability over the wire: |`^
    replace(/%(?:7C|60|5E)/g, unescape);
}

function doFileUpload(pluginId, file, fileCount) {
  /**
   * TODO:
   * 1. Create a ObjectID for file storing in mongodb / mongoose
   * 2. Use this id as fileid and saved as _id field in GridFS
   * 3. Send this id back to clietn and would be saved in plugin info in mongodb
   */
  var ObjectId = mongoose.Types.ObjectId;
  var mongoId = new ObjectId();

  // Create a gridfs-stream into which we pipe multer's temporary file saved in uploads. After which we delete multer's temp file.
  var writestream = gfs.createWriteStream({
    _id: mongoId, // Create link between plugin and uploaded plugin code files
    filename: file.originalname,
    root: 'plugins',
    metadata: {
      pluginid: pluginId
    }
  });

  // Pipe multer's temp file /uploads/filename into the stream we created above. On end deletes the temporary file.
  fs.createReadStream("./uploads/" + file.filename)
    .on("end", function () {
      fs.unlink("./uploads/" + file.filename, function (err) {
        if (err) {
          console.log(err);
          // return res.status(400).send("Error occured on creating upload file"); 
        }

        // Save file info (incl. id and name) in Json format
        switch (file.fieldname) {
          case 'libs':
            filesResJson.libs.push({ id: mongoId, name: file.originalname });
            break;

          case 'docs':
            filesResJson.docs.push({ id: mongoId, name: file.originalname });
            break;

          default:
            break;
        }
        console.log('fileid: ', mongoId);

        // If all files stored in Mongo GridFS, send result to client
        if (fileCount === counter) {
          // res.status(200).json({ filesResJson: filesResJson });
          console.log('counter: ', counter);
        }
      })
    })
    .on("err", function () {
      // res.status(400).send("Error on uploading file"); 
    })
    .pipe(writestream);

  // Set file counter
  counter++;
}

module.exports = function (app, conn) {

  conn.once("open", function () {


    gfs = Grid(conn.db);
    app.get("/", function (req, res) {
      //renders a multipart/form-data form
      res.render("home");
    });

    /**
     * TODO: 'post' multiple files to gridfs
     */
    // app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
    //   // req.files is array of `photos` files
    //   // req.body will contain the text fields, if there were any
    // })

    var attechments = upload.fields([{ name: 'libs', maxCount: 5 }, { name: 'docs', maxCount: 12 }]); // As 'file.fieldname': 'docs'
    app.post("/pluginRepository/uploads/:pluginid", attechments, function (req, res, next) { // upload.array('libs', 12)
      // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
      //
      // e.g.
      //  req.files['avatar'][0] -> File
      //  req.files['gallery'] -> Array
      //
      // req.body will contain the text fields, if there were any

      var pluginId = req.params.pluginid;
      var filesTotal = req.files['libs'].length + req.files['docs'].length;

      // Upload files to GridFS
      _.forEach(req.files, function (value, key) {
        console.log(key);
        _.forEach(req.files[key], function (file) {

          var ObjectId = mongoose.Types.ObjectId;
          var mongoId = new ObjectId();

          // Create a gridfs-stream into which we pipe multer's temporary file saved in uploads. After which we delete multer's temp file.
          var writestream = gfs.createWriteStream({
            _id: mongoId, // Create link between plugin and uploaded plugin code files
            filename: file.originalname,
            root: 'plugins',
            metadata: {
              pluginid: pluginId
            }
          });

          // Pipe multer's temp file /uploads/filename into the stream we created above. On end deletes the temporary file.
          fs.createReadStream("./uploads/" + file.filename)
            .on("end", function () {
              fs.unlink("./uploads/" + file.filename, function (err) {
                if (err) {
                  console.log(err);
                  // return res.status(400).send("Error occured on creating upload file"); 
                }

                // Save file info (incl. id and name) in Json format
                // switch (file.fieldname) {
                //   case 'libs':
                //     filesResJson.libs.push({ id: mongoId, name: file.originalname });
                //     break;

                //   case 'docs':
                //     filesResJson.docs.push({ id: mongoId, name: file.originalname });
                //     break;

                //   default:
                //     break;
                // }
                
                _.get(filesResJson, file.fieldname).push({ id: mongoId, name: file.originalname });
                // console.log('fileid: ', mongoId);

                // If all files stored in Mongo GridFS, send result to client
                if (filesTotal === counter) { 
                  console.log(filesResJson);
                  res.status(200).json({ filesResJson: filesResJson });
                }
                
                // Set file counter
                counter++;
              })
            })
            .on("err", function () {
              res.status(400).send("Error on uploading file"); 
            })
            .pipe(writestream);
        });
      });

      // for (var i = 0; i < req.files['libs'].length; i++) {
      //   console.log(req.files['libs'][i]);
      //   doFileUpload(pluginId, req.files['libs'][i], filesTotal);
      // }
      // for (var i = 0; i < req.files['docs'].length; i++) {
      //   console.log(req.files['docs'][i]);
      //   doFileUpload(pluginId, req.files['docs'][i], filesTotal);
      // }

      // TODO: return to client as { libs: [{id:'', name:''}...], docs: [{id:'', name:''}...] } when all file stored in Gridfs successful

    });

    /**
     * Handle 'post' request for files
     * Second parameter 'upload.single("pluginfile")' is multer middleware:
     * Defined file upload stream to multer and return upload status (e.g.: progress) to request.
     * When reached the innner of app.post() function, indicated the upload stream to multer is completed and
     * the multer -> MongoDB GridFS will begin.
     */
    app.post("/pluginRepository/upload/:pluginid", upload.single("pluginfile"), function (req, res, next) {

      console.log(req.params.pluginid);
      console.log(req.file);

      /**
       * TODO:
       * 1. Create a ObjectID for file storing in mongodb / mongoose
       * 2. Use this id as fileid and saved as _id field in GridFS
       * 3. Send this id back to clietn and would be saved in plugin info in mongodb
       */
      var ObjectId = mongoose.Types.ObjectId;
      var mongoId = new ObjectId();

      // Create a gridfs-stream into which we pipe multer's temporary file saved in uploads. After which we delete multer's temp file.
      var writestream = gfs.createWriteStream({
        _id: mongoId, // Create link between plugin and uploaded plugin code files
        filename: req.file.originalname,
        root: 'plugins',
        metadata: {
          pluginid: req.params.pluginid
        }
      });

      // Pipe multer's temp file /uploads/filename into the stream we created above. On end deletes the temporary file.
      fs.createReadStream("./uploads/" + req.file.filename) // req.file.filename is already calculate with MD5
        .on("end", function () {
          fs.unlink("./uploads/" + req.file.filename, function (err) {
            if (err) { console.log(err); return res.status(400).send("Error occured on creating upload file"); }

            console.log('fileid: ', mongoId);
            res.status(200).json({ fileid: mongoId })
          })
        })
        .on("err", function () { res.status(400).send("Error on uploading file"); })
        .pipe(writestream);
    });

    /**
     * Handle 'get' request for files
     * YunXu: use e.g.: 'localhost:3000/osginode.rar' to download .rar files in Mongo GridFS
     * TODO: Add manuel request to URL
     * TODO: As one plugin can link to many uploaded files, must add another paramerter, e.g.: filename to identify file in DB
     */
    app.get("/pluginRepository/download/:fileid", function (req, res) {

      // Config download options (CAUTION: 'root' must be defined, if use none-default i.e.:'fs' GridFS DB)
      var options = {
        _id: req.params.fileid,
        root: 'plugins'
      };

      gfs.exist(options, function (err, found) {
        if (err) return res.status(400).send("Error occured");
        if (found) {
          // Use GridFS find method to get meta data
          gfs.findOne(options, function (err, file) {
            if (err) {
              console.log(err);
              return res.status(400).send("Error occured on finding file with _id");
            }

            // Set download file header incl. filename and type
            res.setHeader("Content-disposition", "attachment; filename*=UTF-8''" + encodeRFC5987ValueChars(file.filename)); // fixed downlaod with chinese character problem 
            res.setHeader("Content-type", file.contentType);

            // Create file read stream and pipe stream
            gfs.createReadStream(options)
              .on("error", function (err) { res.send("No file found with that id"); })
              .pipe(res);
          });
        } else {
          res.status(400).send("No File found with that id");
        }
      });
    });

    /**
     * Handle 'put' request for files
     * File update process:
     * 1. Delete related plugins based on plugin id;
     * 2. When deleting successful, update new plugin file.
     */
    app.put("/pluginRepository/update/:fileid&:pluginid", upload.single("editpluginfile"), function (req, res) {

      console.log(req.params.fileid, req.params.pluginid);

      // Config delete options (CAUTION: 'root' must be defined, if use none-default i.e.:'fs' GridFS DB)
      var deleteOptions = {
        _id: req.params.fileid,
        root: 'plugins'
      };

      /* DELETE PROCESS: Delete files by using GridFS '_id' */
      gfs.exist(deleteOptions, function (err, found) {
        if (err) return res.status(400).send("Error occured");
        if (found) {
          gfs.remove(deleteOptions, function (err) {
            if (err)
              return res.status(400).send("Error occured");
            console.log('removed with id: ', req.params.fileid);

            /* CREATE PROCESS: After deleting create new GridFS file instance which contains updated file */
            var ObjectId = mongoose.Types.ObjectId;
            var mongoId = new ObjectId();
            // Create a gridfs-stream into which we pipe multer's temporary file saved in uploads. After which we delete multer's temp file.
            var writestream = gfs.createWriteStream({
              _id: mongoId, // Create link between plugin and uploaded plugin code files
              filename: req.file.originalname,
              root: 'plugins',
              metadata: {
                pluginid: req.params.pluginid
              }
            });

            // Pipe multer's temp file /uploads/filename into the stream we created above. On end deletes the temporary file.
            fs.createReadStream("./uploads/" + req.file.filename) // req.file.filename is already calculate with MD5
              .on("end", function () {
                fs.unlink("./uploads/" + req.file.filename, function (err) {
                  if (err) { console.log(err); return res.status(400).send("Error occured on creating upload file"); }

                  console.log('Created fileid: ', mongoId);
                  res.status(200).json({ updatedfileid: mongoId })
                })
              })
              .on("err", function () { res.status(400).send("Error on uploading file"); })
              .pipe(writestream);

            // // Create a gridfs-stream into which we pipe multer's temporary file saved in uploads. After which we delete multer's temp file.
            // var writestream = gfs.createWriteStream({
            //   _id: req.params.id, // Create link between plugin and uploaded plugin code files
            //   filename: req.file.originalname
            // });
            //
            // // Pipe multer's temp file /uploads/filename into the stream we created above. On end deletes the temporary file.
            // fs.createReadStream("./uploads/" + req.file.filename)
            //   .on("end", function(){fs.unlink("./uploads/"+ req.file.filename, function(err){
            //     res.status(200).send("Updating file success");
            //   })})
            //   .on("err", function(){res.status(400).send("Error on uploading file");})
            //   .pipe(writestream);
          });
        } else {
          res.status(400).send("No File found with that id");
        }
      });
    });

    /**
     * Handle 'delete' request for files
     * Delete file in MongoDB GridFS
     */
    app.delete("/pluginRepository/delete/:fileid", function (req, res) {

      var options = {
        _id: req.params.fileid,
        root: 'plugins'
      };

      gfs.exist(options, function (err, found) {
        if (err) return res.send("Error occured");
        if (found) {
          gfs.remove(options, function (err) {
            if (err) return res.status(400).send("Error occured");
            console.log('File deleted!');
            res.status(200).send("File deleted");
          });
        } else {
          res.status(400).send("No file found with that id");
        }
      });

      // gfs.remove({
      //   _id: req.params.fileid,
      //   root: 'plugins'
      // }, function(err){
      //   if(err) {
      //     return res.status(400).send("Error occured");
      //     console.log(err);
      //   }
      //   console.log('File deleted!');
      //   res.status(200).send("File deleted");
      // });


      /**
       * TODO: CANNOT use 'gfs.exist(_id)' to define whether file with _id in GridFs exist. So we use '_id' to
       * 'gfs.files.find() to find related files (type: Array) and then delete all files which are link to this
       * plugin id
       */
      // gfs.files.find({ _id: req.params.id }).toArray(function (err, files) { // CAUTION: 'files' is an array!
      //
      //   if (err) { console.log(err); return res.status(400).send("Error occured on finding file with _id");}
      //   console.log(files);
      //
      //   // If found files
      //   if (_.trim(files).length > 0) {
      //     console.log('File found!');
      //
      //     gfs.remove({
      //       _id: req.params.id,
      //       filename: files[0].filename
      //     }, function(err){
      //       if(err) {
      //         return res.status(400).send("Error occured");
      //         console.log(err);
      //       }
      //       console.log('File deleted!');
      //       res.status(200).send("File deleted");
      //     });
      //   } else {
      //     res.status(400).send("No File found with that filename");
      //   }
      //
      // });
    });


  }); //END conn.once()

};