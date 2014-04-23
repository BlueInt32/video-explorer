var express = require('express'),
extractor = require('./../extractor'),
jsExplorer = require('./../jsExplorer')
;

var router = express.Router();

var directoryContent;

/* GET home page. */
router.get('/', function(req, res)
{
    var queryPath = req.query.path;
    var importPath = req.query.import;

    if(typeof queryPath !== 'undefined' && queryPath.indexOf("..") >= 0)
    {
        jsExplorer.upFolder(function(returnedList)
        {
            directoryContent = returnedList;
        });
    }
    else if(typeof queryPath !== 'undefined')
    {
        jsExplorer.goIntoFolder(queryPath, function(returnedList)
        {
            directoryContent = returnedList;
        });
    }
    else if(typeof importPath !== 'undefined')
    {
        var db = req.db;
        // Set our collection
        var collection = db.get('importedvideos');

        console.log('looking for : ', jsExplorer.basePath + importPath);
        collection.find({filepath:jsExplorer.basePath + importPath},{},function(e,docs){
            console.log(docs);
        });


        // // Submit to the DB
        // collection.insert({
        //     "username" : userName,
        //     "email" : userEmail
        // }, function (err, doc) {
        //     if (err) {
        //         // If it failed, return error
        //         res.send("There was a problem adding the information to the database.");
        //     }
        //     else {
        //         // If it worked, set the header so the address bar doesn't still say /adduser
        //         res.location("userlist");
        //         // And forward to success page
        //         res.redirect("userlist");
        //     }
        // });



    }
    else
    {
        jsExplorer.goIntoFolder(queryPath, function(returnedList)
        {
            directoryContent = returnedList;
        });
    }
    res.render('importer', {model: directoryContent});
});


module.exports = router;