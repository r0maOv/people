var express  = require('express');
var router   = express.Router();

var languages  = require('../config/languages');
var langsCodes = languages.getAllLanguageCode();
var langsNames = [];

langsCodes.forEach(function (code) {
    langsNames.push(JSON.stringify(languages.getLanguageInfo(code).name).replace(/['"]+/g, ''));
});

router.get('/', function(req, res) {
    res.json(langsNames);
});

module.exports = router;