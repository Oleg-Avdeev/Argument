var mongoose = require('mongoose');
var model = mongoose.model('desk');

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

exports.postArgument = function (req, res) {
    model.findById(req.params.id, (err, desk) => {
        if (err) res.send(err);
        console.log(req.body);
        console.log(desk.arguments);
        
        desk.arguments.set(req.body["slot_id"], req.body["argument_id"]);
        desk.save((er, desk) => {
            console.log(er);
            console.log(desk.arguments);
        });

        res.json(desk);
    });
}

exports.getArguments = function (req, res) {
    model.findById(req.params.id, 'arguments', handler(res));
}

function handler(res) {
    return (err, user) => {
        if (err) res.send(err);
        res.json(user);
    }; 
}
