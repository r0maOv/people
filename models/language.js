var mongoose = require('mongoose');

var languageSchema = mongoose.Schema({
    name: String
});

var Language = mongoose.model('Language', languageSchema);

module.exports = Language;