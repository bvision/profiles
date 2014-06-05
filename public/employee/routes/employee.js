'use strict';

//Setting up route
angular.module('mean.employee').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        //================================================
        // Check if the user is connected
        //================================================
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0')
                    $timeout(deferred.resolve, 0);

                // Not Authenticated
                else {
                    $timeout(function() {
                        deferred.reject();
                    }, 0);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };
        //================================================
        // Check if the user is not conntect
        //================================================
        var checkLoggedOut = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') {
                    $timeout(function() {
                        deferred.reject();
                    }, 0);
                    $location.url('/login');

                }

                // Not Authenticated
                else {
                    $timeout(deferred.resolve, 0);

                }
            });

            return deferred.promise;
        };
        //================================================


        // states for my app
        $stateProvider
            .state('all employees', {
                url: '/employee',
                templateUrl: 'public/employee/views/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create employee', {
                url: '/employee/create',
                templateUrl: 'public/employee/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit employee', {
                url: '/employee/:employeeId/edit',
                templateUrl: 'public/employee/views/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('employee by id', {
                url: '/employee/:employeeId',
                templateUrl: 'public/employee/views/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
    }
])
