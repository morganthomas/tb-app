const tbApp = angular.module('tbApp', ['ngRoute']);

tbApp.controller('indexController', ['$scope', function ($scope) {
    $scope.blog = '';

    $scope.load = function () {
        console.log('load', $scope.blog);
    }
}]);

tbApp.config(function($routeProvider) {
    $routeProvider
	.when('/', {
	    templateUrl: '/templates/index',
	    controller: 'indexController'
	});
});
