var fs         = require('fs');
var path       = require('path');
var util       = require('util');
var express    = require('express');
var formidable = require('formidable');



// var mongoose = require('mongoose');
// var Language = require('../models/language');
var router = express.Router();


router.post('/upload', function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        // res.json(util.inspect({fields: fields, files: files}));
        res.end(util.inspect({fields: fields, files: files}));
    });
});

module.exports = router;