'use strict';

(function() {
    // Employees Controller Spec
    describe('MEAN controllers', function() {
        describe('EmployeesController', function() {
            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('mean'));

            // Initialize the controller and a mock scope
            var EmployeesController,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                EmployeesController = $controller('EmployeesController', {
                    $scope: scope
                });

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one employee object ' +
                'fetched from XHR', function() {

                    // test expected GET request
                    $httpBackend.expectGET('employees').respond([{
                        title: 'An Employee from MEAN',
                        file: 1
                    }]);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.employees).toEqualData([{
                        title: 'An Employee from MEAN',
                        file: 1
                    }]);

                });

            it('$scope.findOne() should create an array with one employee object fetched ' +
                'from XHR using a employeeId URL parameter', function() {
                    // fixture URL parament
                    $stateParams.employeeId = '525a8422f6d0f87f0e407a33';

                    // fixture response object
                    var testEmployeeData = function() {
                        return {
                            title: 'An Employee from MEAN',
                            file: 1
                        };
                    };

                    // test expected GET request with response object
                    $httpBackend.expectGET(/employees\/([0-9a-fA-F]{24})$/).respond(testEmployeeData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.employee).toEqualData(testEmployeeData());

                });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {

                    // fixture expected POST data
                    var postEmployeeData = function() {
                        return {
                            title: 'An Employee from MEAN',
                            file: 1
                        };
                    };

                    // fixture expected response data
                    var responseEmployeeData = function() {
                        return {
                            _id: '525cf20451979dea2c000001',
                            title: 'An Employee from MEAN',
                            file: 1
                        };
                    };

                    // fixture mock form input values
                    scope.title = 'An Employee from MEAN';
                    scope.file: 1

                    // test post request is sent
                    $httpBackend.expectPOST('employees', postEmployeeData()).respond(responseEmployeeData());

                    // Run controller
                    scope.create();
                    $httpBackend.flush();

                    // test form input(s) are reset
                    expect(scope.title).toEqual('');
                    expect(scope.file).toEqual('');

                    // test URL location to new object
                    expect($location.path()).toBe('/employees/' + responseEmployeeData()._id);
                });

            it('$scope.update() should update a valid employee', inject(function(Employees) {

                // fixture rideshare
                var putEmployeeData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        title: 'An Employee from MEAN',
                        to: 'MEAN is great!'
                    };
                };

                // mock employee object from form
                var employee = new Employees(putEmployeeData());

                // mock employee in scope
                scope.employee = employee;

                // test PUT happens correctly
                $httpBackend.expectPUT(/employees\/([0-9a-fA-F]{24})$/).respond();

                // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
                //$httpBackend.expectPUT(/employees\/([0-9a-fA-F]{24})$/, putEmployeeData()).respond();
                /*
                Error: Expected PUT /employees\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Employee from MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Employee from MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/employees/' + putEmployeeData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid employeeId' +
                'and remove the employee from the scope', inject(function(Employees) {

                    // fixture rideshare
                    var employee = new Employees({
                        _id: '525a8422f6d0f87f0e407a33'
                    });

                    // mock rideshares in scope
                    scope.employees = [];
                    scope.employees.push(employee);

                    // test expected rideshare DELETE request
                    $httpBackend.expectDELETE(/employees\/([0-9a-fA-F]{24})$/).respond(204);

                    // run controller
                    scope.remove(employee);
                    $httpBackend.flush();

                    // test after successful delete URL location employees lis
                    //expect($location.path()).toBe('/employees');
                    expect(scope.employees.length).toBe(0);

                }));
        });
    });
}());
