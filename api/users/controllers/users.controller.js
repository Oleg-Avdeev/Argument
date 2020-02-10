var mongoose = require('mongoose'),
    users = mongoose.model('users');

exports.list = function (req, res) {
    users.find({}, handler(res));
}

exports.create = function (req, res) {
    (new users(req.body)).save(handler(res));
}

exports.get = function (req, res) {
    users.findById(req.params.userId, handler(res));
}

exports.update = function (req, res) {
    users.findByIdAndUpdate(req.params.userId, req.body, handler(res));
}

exports.delete = function (req, res) {
    users.findOneAndDelete(req.params.userId, handler(res));
}


function handler(res) {
    return (err, user) => {
        if (err) res.send(err);
        res.json(user);
    }; 
}
