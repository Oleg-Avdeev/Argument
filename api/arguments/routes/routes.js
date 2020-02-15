module.exports = function (app) {
    var controller = require('../controllers/controller');

    app.route('/arguments')
        .get(controller.list)
        .post(controller.create);

    app.route('/arguments/:id')
        .get(controller.get)
        .put(controller.update)
        .delete(controller.delete);
};
