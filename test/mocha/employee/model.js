'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Employee = mongoose.model('Employee');

//Globals
var user;
var employee;

//The tests
describe('<Unit Test>', function() {
    describe('Model Employee:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function() {
                employee = new Employee({
                    title: 'Java developer',
                    user: user
                });
                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return employee.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without title', function(done) {
                employee.title = '';

                return employee.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            employee.remove();
            user.remove();
            done();
        });
    });
});
