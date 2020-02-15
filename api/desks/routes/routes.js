module.exports = function (app) {
    var controller = require('../controllers/controller');

    app.route('/desks')
        .get(controller.list)
        .post(controller.create);

    app.route('/desks/:id')
        .get(controller.get)
        .put(controller.update)
        .delete(controller.delete);
};
