var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
});

module.exports = mongoose.model('users', UserSchema);