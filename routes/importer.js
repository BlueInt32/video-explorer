var express = require('express'),
extractor = require('./../extractor'),
jsExplorer = require('./../jsExplorer'),
pathHelper = require('./../PathHelper'),
config = require('./../config');

var router = express.Router();

var directoryContent;

pathHelper.setBasePath(config.BASEVIDEOSPATH);

/* GET home page. */
router.get('/', function(req, res)
{
    var queryPath = req.query.path;
    var importPath = req.query.import;

    var db = req.db;
    var collection = db.get('importedvideos');

    jsExplorer.resolveLocation(queryPath, function(returnedList)
    {
        // extract fullpaths of files in the current dir.
        var paths = [];
        for (var i = 0, l = returnedList.length; i < l; i++) {
            paths.push(returnedList[i].fullPath);
        };

        // find in db files for which fullpath is in the extract
        collection.find({fullPath:{$in:paths}},{},function(e,docs)
        {
            for (var i = 0, l = docs.length; i < l; i++) {
                for (var j = 0, k = returnedList.length; j < k; j++) {
                    console.log(returnedList[j].fullPath,decodeURIComponent(docs[i].fullPath));
                    if(returnedList[j].fullPath === decodeURIComponent(docs[i].fullPath))
                    {
                        returnedList[j].imported = true;
                    }
                    else
                    {

                    }
                };
            };

            directoryContent = returnedList;
            res.render('importer', {model: directoryContent});
        });

    });
});

router.get('/choice', function(req, res)
{
    var queryPath = req.query.path;


    var db = req.db;
    var collection = db.get('importedvideos');
    var decodedPath = pathHelper.urlDecode(queryPath);
    var fileName = pathHelper.extractFileName(decodedPath);
    var imgFilePath = pathHelper.combine(config.BASEPATH, pathHelper.combine(config.REALTHUMBSPATH, fileName + ".jpg"));
    extractor.create(decodedPath, imgFilePath, "00:00:02", '200x125', function(error, stdout, stderr)
    {
        console.log(error);
        collection.insert({
            "fullPath" : decodedPath,
            "insert" : (new Date()).toUTCString(),
            "stars": 0,
            "thumbPath": fileName+ ".jpg",
            "tags" : ""
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("/");
                // And forward to success page
                res.redirect("/");
            }
        });
    });

});


module.exports = router;