'use strict';

// Employee routes use employee controller
var employee = require('../controllers/employee');
var authorization = require('./middlewares/authorization');

// Employee authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.employee.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/employee', employee.all);
    app.post('/employee', authorization.requiresLogin, employee.create);
    app.get('/employee/:employeeId', employee.show);
    app.put('/employee/:employeeId', authorization.requiresLogin, hasAuthorization, employee.update);
    app.del('/employee/:employeeId', authorization.requiresLogin, hasAuthorization, employee.destroy);

    // Finish with setting up the employeeId param
    app.param('employeeId', employee.employee);

};
