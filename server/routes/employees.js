'use strict';

// Employee routes use employees controller
var employees = require('../controllers/employees');
var authorization = require('./middlewares/authorization');

// Employee authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.employees.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/employees', employees.all);
    app.post('/employees', authorization.requiresLogin, employees.create);
    app.get('/employees/:employee', employees.show);
    app.put('/employees/:employee', authorization.requiresLogin, hasAuthorization, employees.update);
    app.del('/employees/:employee', authorization.requiresLogin, hasAuthorization, employees.destroy);

    // Finish with setting up the employees param
    app.param('employee', employees.employee);

};
