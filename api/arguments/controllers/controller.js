var mongoose = require('mongoose'),
    model = mongoose.model('argument');

exports.list = function (req, res) {
    model.find({}, handler(res));
}

exports.create = function (req, res) {
    (new model(req.body)).save(handler(res));
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


function handler(res) {
    return (err, user) => {
        if (err) res.send(err);
        res.json(user);
    }; 
}
