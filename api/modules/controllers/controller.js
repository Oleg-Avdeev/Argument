var mongoose = require('mongoose'),
    model = mongoose.model('module'),
    module_users = mongoose.model('module_users');

exports.list = function (req, res) {
    model.find({}, handler(res));
}

exports.create = function (req, res) {
    var module = (new model(req.body)).save(handler(res));
    var admin = { user_id : req.body.user_id, module_id : module._id, permissions : "owner" };
    (new module_users(admin)).save(handler(res));
}

exports.get = function (req, res) {
    model.findById(req.params.id, handler(res));
}

exports.update = function (req, res) {
    model.findByIdAndUpdate(req.params.id, req.body, handler(res));
}

exports.delete = function (req, res) {
    model.findOneAndDelete(req.params.id, handler(res));
}

exports.getPlayers = function (req, res) {
    module_users.find({}, handler(res));
}

exports.invite = function (req, res) {
    (new module_users(req.body)).save(handler(res));
}

function handler(res) {
    return (err, user) => {
        if (err) res.send(err);
        res.json(user);
    }; 
}
