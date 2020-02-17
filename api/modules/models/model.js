var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: String,
    description: String,
    image_link: String
});

module.exports = mongoose.model('module', schema);