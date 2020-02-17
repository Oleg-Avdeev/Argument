var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: String,
    character1_id: {
        type: mongoose.Types.ObjectId,
        ref: 'character'
    },
    character2_id: {
        type: mongoose.Types.ObjectId,
        ref: 'character'
    },
    module_id: {
        type: mongoose.Types.ObjectId,
        ref: 'module'
    },
    done: Boolean,
    arguments: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'argument'
        }
    ]
});

module.exports = mongoose.model('desk', schema);