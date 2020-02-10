module.exports = function (app) {
    var users = require('../controllers/users.controller');

    app.route('/users')
        .get(users.list)
        .post(users.create);

    app.route('/users/:userId')
        .get(users.get)
        .put(users.update)
        .delete(users.delete);
};
