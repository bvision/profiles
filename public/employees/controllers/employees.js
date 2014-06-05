'use strict';

angular.module('mean.employees').controller('EmployeesController', ['$scope', '$stateParams', '$location', 'Global', 'Employee', function ($scope, $stateParams, $location, Global, Employee) {
    $scope.global = Global;

    $scope.create = function() {
        var employee = new Employee({
            title: this.title,
	    file: this.file
        });
        employee.$save(function(response) {
            $location.path('employees/' + response._id);
        });

        this.title = '';
        this.file = '';
    };

    $scope.remove = function(employee) {
        if (employee) {
            employee.$remove();

            for (var i in $scope.employees) {
                if ($scope.employees[i] === employee) {
                    $scope.employees.splice(i, 1);
                }
            }
        }
        else {
            $scope.employee.$remove();
            $location.path('employees');
        }
    };

    $scope.update = function() {
        var employee = $scope.employee;
        if (!employee.updated) {
            employee.updated = [];
        }
        employee.updated.push(new Date().getTime());

        employee.$update(function() {
            $location.path('employees/' + employee._id);
        });
    };

    $scope.find = function() {
        Employee.query(function(employees) {
            $scope.employees = employees;
        });
	$scope.employeesData = {data: 'employees'};
    };

    $scope.findOne = function() {
        Employee.get({
            employeeId: $stateParams.employeeId
        }, function(employee) {
            $scope.employee = employee;
        });
    };
}]);
