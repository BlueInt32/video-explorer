var express = require('express');
var router = express.Router();


/* GET Userlist page. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('importedvideos');
    console.log(collection);
    collection.find({},{},function(e,docs){
        res.render('index', {
            title: 'Existing videos',
            "importedvideos" : docs
        });
    });
});


module.exports = router;
