var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var argument_schema = new Schema({
    name: String,
    description: String,
    image_link: String
});

module.exports = mongoose.model('character', argument_schema);

var character_arguments_schema = new Schema({
    character_id: { 
        type: mongoose.Types.ObjectId,
        ref: 'character'
    },
    argument_id: {
        type: mongoose.Types.ObjectId,
        ref: 'argument'
    },
});

module.exports = mongoose.model('character_arguments', character_arguments_schema);