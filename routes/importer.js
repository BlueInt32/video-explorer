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

        var db = req.db;
    var collection = db.get('importedvideos');

    if(typeof importPath !== 'undefined')
    {
        // Set our collection

        console.log('looking for : ', jsExplorer.basePath + importPath);
        collection.find({filepath:jsExplorer.basePath + importPath},{},function(e,docs){
            //if(docs.length)
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
    jsExplorer.resolveLocation(queryPath, function(returnedList)
    {
        // extract fullpaths of files in the current dir.
        var paths = [];
        for (var i = 0, l = returnedList.length; i < l; i++) {
            paths.push(returnedList[i].fullPath);
        };

        console.log('returnedList : ', returnedList);
        // find in db files for which fullpath is in the extract
        collection.find({filepath:{$in:paths}},{},function(e,docs)
        {
            for (var i = 0, l = docs.length; i < l; i++) {
                for (var j = 0, k = returnedList.length; j < k; j++) {
                    console.log(returnedList[j].fullPath, docs[i].filepath);
                    if(returnedList[j].fullPath === docs[i].filepath)
                    {

                        returnedList[j].imported = true;
                    }
                };
            };



            directoryContent = returnedList;
            res.render('importer', {model: directoryContent});
        });

    });
});


module.exports = router;