'use strict';

//Employee service used for employee REST endpoint
angular.module('mean.employees').factory('Employee', ['$resource', function($resource) {
    return $resource('employees/:employeeId', {
        employeeId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
