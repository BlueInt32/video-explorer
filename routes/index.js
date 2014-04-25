var express = require('express');
var router = express.Router();
var config = require('./../config');


/* GET Userlist page. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('importedvideos');
    collection.find({},{},function(e,docs){
        res.render('index', {
            'title': 'Existing videos',
            'importedvideos' : docs,
            'pathToThumbs': config.THUMBSPATH
        });
    });
});


module.exports = router;
