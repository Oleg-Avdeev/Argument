module.exports = function (app) {
    var controller = require('../controllers/controller');

    app.route('/characters')
        .get(controller.list)
        .post(controller.create);

    app.route('/characters/:id')
        .get(controller.get)
        .put(controller.update)
        .delete(controller.delete);
};
