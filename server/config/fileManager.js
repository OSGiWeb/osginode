/**
 * Created by Information on 2016/5/3.
 * This module is used to handle file upload, download and delete with data which storing in mongoDB GridFS
 */

var fs = require("fs");
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

    //second parameter is multer middleware.
    app.post("/pluginRepository/upload/:id", upload.single("pluginfile"), function(req, res, next){

      console.log(req.params.id);
      console.log(req.file);

      //create a gridfs-stream into which we pipe multer's temporary file saved in uploads. After which we delete multer's temp file.
      var writestream = gfs.createWriteStream({
        _id: req.params.id, // Create link between plugin and uploaded plugin code files
        filename: req.file.originalname
      });

      // //pipe multer's temp file /uploads/filename into the stream we created above. On end deletes the temporary file.
      fs.createReadStream("./uploads/" + req.file.filename)
        .on("end", function(){fs.unlink("./uploads/"+ req.file.filename, function(err){
          res.status(200).send('Success');
        })})
        .on("err", function(){res.status(400).send("Error on uploading file");})
        .pipe(writestream);
    });

    // sends the image we saved by filename.
    // YunXu: use e.g.: 'localhost:3000/osginode.rar' to download .rar files in Mongo GridFS
    // TODO: Add manuel request to URL
    app.get("/pluginRepository/upload/:filename", function(req, res){

      // TEST: use GridFS find method to get meta data
      gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
        if (err)
          console.log(err);

        console.log(files);
      });
      // TEST

      var readstream = gfs.createReadStream({filename: req.params.filename});
      readstream.on("error", function(err){
        res.send("No image found with that title");
      });
      readstream.pipe(res);
    });

    //delete the image
    app.get("/delete/:filename", function(req, res){
      gfs.exist({filename: req.params.filename}, function(err, found){
        if(err) return res.send("Error occured");
        if(found){
          gfs.remove({filename: req.params.filename}, function(err){
            if(err) return res.send("Error occured");
            res.send("Image deleted!");
          });
        } else{
          res.send("No image found with that title");
        }
      });
    });


  });

};