module.exports = function (app) {
    var controller = require('../controllers/controller');

    app.route('/users')
        .get(controller.list)
        .post(controller.create);

    app.route('/users/:id')
        .get(controller.get)
        .put(controller.update)
        .delete(controller.delete);
};
