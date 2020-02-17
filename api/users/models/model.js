var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users_schema = new Schema({
    name: String,
});

module.exports = mongoose.model('user', users_schema);

var module_users_schema = new Schema({
    user_id: { 
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    module_id: {
        type: mongoose.Types.ObjectId,
        ref: 'module'
    },
    permissions: {
        type: String,
        enum: ['player', 'owner'],
        default: 'player'
    }
});

module.exports = mongoose.model('module_users', module_users_schema);

var user_characters_schema = new Schema({
    user_id: { 
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    character_id: {
        type: mongoose.Types.ObjectId,
        ref: 'character'
    },
    module_id: {
        type: mongoose.Types.ObjectId,
        ref: 'module'
    },
});

module.exports = mongoose.model('user_characters', user_characters_schema);