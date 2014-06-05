'use strict';

//Employee service used for employee REST endpoint
angular.module('mean.employee').factory('Employee', ['$resource', function($resource) {
    return $resource('employee/:employeeId', {
        employeeId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
