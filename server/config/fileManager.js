/**
 * Created by Information on 2016/5/3.
 * This module is used to handle file upload, download and delete with data which storing in mongoDB GridFS
 */

var fs = require("fs");
var mime = require('mime');
var multer = require("multer");
var upload = multer({dest: "./uploads"});
var secrets = require('./secrets');

var mongoose = require("mongoose");
var Grid = require("gridfs-stream");
var gfs;
Grid.mongo = mongoose.mongo;

module.exports = function(app, conn) {

  conn.once("open", function(){


    gfs = Grid(conn.db);
    app.get("/", function(req,res){
      //renders a multipart/form-data form
      res.render("home");
    });

    /**
     * Handle 'post' request for files
     * Second parameter 'upload.single("pluginfile")' is multer middleware:
     * Defined file upload stream to multer and return upload status (e.g.: progress) to request.
     * When reached the innner of app.post() function, indicated the upload stream to multer is completed and
     * the multer -> MongoDB GridFS will begin.
     */
    app.post("/pluginRepository/upload/:id", upload.single("pluginfile"), function(req, res, next){

      console.log(req.params.id);
      console.log(req.file);

      // Create a gridfs-stream into which we pipe multer's temporary file saved in uploads. After which we delete multer's temp file.
      var writestream = gfs.createWriteStream({
        _id: req.params.id, // Create link between plugin and uploaded plugin code files
        filename: req.file.originalname
      });

      // Pipe multer's temp file /uploads/filename into the stream we created above. On end deletes the temporary file.
      fs.createReadStream("./uploads/" + req.file.filename) // req.file.filename is already calculate with MD5
        .on("end", function(){fs.unlink("./uploads/"+ req.file.filename, function(err){
          res.status(200).send("Uploading file success");
        })})
        .on("err", function(){res.status(400).send("Error on uploading file");})
        .pipe(writestream);
    });




    /**
     * Handle 'get' request for files
     * sends the image we saved by filename.
     * YunXu: use e.g.: 'localhost:3000/osginode.rar' to download .rar files in Mongo GridFS
     * TODO: Add manuel request to URL
     * TODO: As one plugin can link to many uploaded files, must add another paramerter, e.g.: filename to identify file in DB
     */
    app.get("/pluginRepository/download/:id", function(req, res){

      // Use GridFS find method to get meta data
      gfs.files.find({ _id: req.params.id }).toArray(function (err, files) { // CAUTION: 'files' is an array!

        if (err) { console.log(err); return res.status(400).send("Error occured on finding file with _id");}
        console.log(files);
        console.log(req.headers);

        // Set download file header incl. filename and type
        res.setHeader('Content-disposition', 'attachment; filename=' + files[0].filename);
        res.setHeader('Content-type', files[0].contentType);

        // Create file read stream and pipe stream
        var readstream = gfs.createReadStream({filename: files[0].filename});
        readstream.on("error", function(err){res.send("No file found with that id");});

        readstream.pipe(res);
        // res.status(200).send("Downloading file success");

      });
    });

    /**
     * Handle 'put' request for files
     * File update process:
     * 1. Delete related plugins based on plugin id;
     * 2. When deleting successful, update new plugin file.
     */
    app.put("/pluginRepository/update/:id", upload.single("pluginfile"), function(req, res){
      // TODO: delete file must depend on 2nd. parameter 'pluginname', when 1->N relationship exists
      gfs.files.find({ _id: req.params.id }).toArray(function (err, files) { // CAUTION: 'files' is an array!

        if (err) { console.log(err); return res.status(400).send("Error occured on finding file with _id");}
        console.log(files);

        // Delete files by using filename
        gfs.exist({filename: files[0].filename}, function(err, found){ // TODO: Delete all files in array which are linked to plugin
          if(err) return res.send("Error occured");
          if(found){
            gfs.remove({filename: files[0].filename}, function(err){
              if(err) return res.send("Error occured");

              // Create a gridfs-stream into which we pipe multer's temporary file saved in uploads. After which we delete multer's temp file.
              var writestream = gfs.createWriteStream({
                _id: req.params.id, // Create link between plugin and uploaded plugin code files
                filename: req.file.originalname
              });

              // Pipe multer's temp file /uploads/filename into the stream we created above. On end deletes the temporary file.
              fs.createReadStream("./uploads/" + req.file.filename) // req.file.filename is already calculate with MD5
                .on("end", function(){fs.unlink("./uploads/"+ req.file.filename, function(err){
                  res.status(200).send("Updating file success");
                })})
                .on("err", function(){res.status(400).send("Error on uploading file");})
                .pipe(writestream);
            });
          } else{
            res.status(400).send("No File found with that filename");
          }
        });
      });

    });

    /**
     * Handle 'delete' request for files
     * Delete file in MongoDB GridFS
     */
    app.delete("/pluginRepository/delete/:id", function(req, res){
      /**
       * TODO: CANNOT use 'gfs.exist(_id)' to define whether file with _id in GridFs exist. So we use '_id' to
       * 'gfs.files.find() to find related files (type: Array) and then delete all files which are link to this
       * plugin id
       */
      gfs.files.find({ _id: req.params.id }).toArray(function (err, files) { // CAUTION: 'files' is an array!

        if (err) { console.log(err); return res.status(400).send("Error occured on finding file with _id");}
        console.log(files);

        // Delete files by using filename
        gfs.exist({filename: files[0].filename}, function(err, found){ // TODO: Delete all files in array which are linked to plugin
          if(err) return res.send("Error occured");
          if(found){
            gfs.remove({filename: files[0].filename}, function(err){
              if(err) return res.send("Error occured");
              res.status(200).send("File deleted");
            });
          } else{
            res.status(400).send("No File found with that filename");
          }
        });
      });
    });


  }); //END conn.once()

};