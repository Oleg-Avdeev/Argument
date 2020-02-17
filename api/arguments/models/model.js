var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: String,
    type: {
        type: String,
        enum : ['path','principle','improvisation','acquired'],
        default: 'acquired'
    },
    color: {
        type: String,
        enum : ['white','black'],
        default: 'white'
    },
});

module.exports = mongoose.model('argument', schema);