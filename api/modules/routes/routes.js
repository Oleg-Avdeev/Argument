module.exports = function (app) {
    var controller = require('../controllers/controller');

    app.route('/modules')
        .get(controller.list)
        .post(controller.create);

    app.route('/modules/:id')
        .get(controller.get)
        .put(controller.update)
        .delete(controller.delete);

    app.route('/modules/users')
        .get(controller.getPlayers)
        .put(controller.invite);
};
