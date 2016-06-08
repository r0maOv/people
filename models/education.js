var mongoose = require('mongoose');

var educationSchema = mongoose.Schema({
    name: String
});

var Education = mongoose.model('Education', educationSchema);

module.exports = Education;