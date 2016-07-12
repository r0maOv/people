var fs         = require('fs');
var path       = require('path');
var express    = require('express');
var formidable = require('formidable');

// var mongoose = require('mongoose');
// var Language = require('../models/language');
var router = express.Router();


router.post('/', function (req, res) {
    console.log(req.body);
    // fs.readFile(req.files, function (err, data) {
    //     if (err)
    //         console.error(err);
    // });
    // console.log(req.body);
    // var body = [];
    // req.on('data', function (data) {
    //     body.push(data);
    //
    // }).on('end', function () {
    //     // res.json(body);
    //     console.log(Buffer.concat(body).toString());
    // })
});

module.exports = router;