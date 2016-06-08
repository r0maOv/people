var express  = require('express');
var mongoose = require('mongoose');
var Education = require('../models/education');
var router = express.Router();


router.get('/', function(req, res) {
    Education.find(function (err, lang) {
        if (err)
            console.error(err);

        res.json(lang);
    })
});


router.post('/', function (req, res) {
    var education = new Education(req.body);
    education.save(function (err, lang) {
        if (err)
            console.error(err);

        res.json(lang);
    });
});


router.get('/:id', function (req, res) {
    var id = req.params.id;
});


router.put('/:id', function (req, res) {
    Education.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}, function (err, lang) {
        if (err)
            console.error(err);

        res.json(lang);
    });
});


router.delete('/:id', function (req, res) {
    var id = req.params.id;
    Education.findOneAndRemove({_id: id}, function (err, lang) {
        if (err)
            console.error(err);

        res.json(lang);
    })
});

module.exports = router;