'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Employee = mongoose.model('Employee'),
    _ = require('lodash');


/**
 * Find employee by id
 */
exports.employee = function(req, res, next, id) {
    Employee.load(id, function(err, employee) {
        if (err) return next(err);
        if (!employee) return next(new Error('Failed to load employee ' + id));
        req.employee = employee;
        next();
    });
};

/**
 * Create an employee
 */
exports.create = function(req, res) {
    var employee = new Employee(req.body);
    employee.user = req.user;

    employee.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                employee: employee
            });
        } else {
            res.jsonp(employee);
        }
    });
};

/**
 * Update an employee
 */
exports.update = function(req, res) {
    var employee = req.employee;

    employee = _.extend(employee, req.body);

    employee.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                employee: employee
            });
        } else {
            res.jsonp(employee);
        }
    });
};

/**
 * Delete an employee
 */
exports.destroy = function(req, res) {
    var employee = req.employee;

    employee.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                employee: employee
            });
        } else {
            res.jsonp(employee);
        }
    });
};

/**
 * Show an employee
 */
exports.show = function(req, res) {
    res.jsonp(req.employee);
};

/**
 * List of Employees
 */
exports.all = function(req, res) {
    Employee.find().sort('-start_date').populate('user', 'name username').exec(function(err, employees) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(employees);
        }
    });
};
