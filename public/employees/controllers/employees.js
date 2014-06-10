'use strict';

angular.module('mean.employees').controller('EmployeesController', ['$scope', '$stateParams', '$location', 'Global', 'Employees', function ($scope, $stateParams, $location, Global, Employees) {
    $scope.global = Global;

    $scope.create = function() {
 
       var employee = new Employees({
	   file: this.file,
	   email: this.email,
	   start_date: this.start_date,
           title: this.title,
	   assigned_to: this.assigned_to,
	   technologies: this.technologies,
	   belongs: this.belongs
        });
        employee.$save(function(response) {
	    if (!response.errors && response._id) {
                $location.path('employees/' + response._id);
	    }
        });

        this.file = '';
        this.email = '';
        this.start_date = '';
        this.title = '';
        this.assigned_to = '';
        this.technologies = '';
        this.belongs = '';
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
        Employees.query(function(employees) {
            $scope.employees = employees;
	    $scope.employeesData = [];
	    $scope.employees.forEach(function(emp) {
	        $scope.employeesData.push({
		    'File': emp.file,
		    'StartDate': emp.start_date,
		    'Name': emp.user ? emp.user.name : '',
		    'Email': emp.email,
		    'Title': emp.title,
		    'BelongsTo': emp.belongs ? emp.belongs.user.name : ''
		});
	    });
        });
	$scope.employeesOptions = {data: 'employeesData'};
    };

    $scope.findOne = function() {
        Employees.get({
            employeeId: $stateParams.employeeId
        }, function(employee) {
            $scope.employee = employee;
        });
    };
}]);
