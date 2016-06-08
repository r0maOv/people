var express  = require('express');
var mongoose = require('mongoose');
var Language = require('../models/language');
var router = express.Router();


router.get('/', function(req, res, next) {
    Language.find(function (err, lang) {
        if (err)
            console.error(err);
        
        res.json(lang);
    })
});


router.post('/', function (req, res) {
    var language = new Language(req.body);
    language.save(function (err, lang) {
        if (err)
            console.error(err);

        res.json(lang);
    });
});


router.get('/:id', function (req, res) {
   var id = req.params.id;
});


router.put('/:id', function (req, res) {
    Language.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}, function (err, lang) {
        if (err)
            console.error(err);

        res.json(lang);
    });
});


router.delete('/:id', function (req, res) {
    var id = req.params.id;
    // console.log(id);
    Language.findOneAndRemove({_id: id}, function (err, lang) {
        if (err)
            console.error(err);

        res.json(lang);
    })
});

module.exports = router;