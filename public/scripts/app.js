const tbApp = angular.module('tbApp', ['ngRoute']);

tbApp.controller('indexController', ['$scope', '$sce', function ($scope, $sce) {
    $scope.blog = '';
    $scope.posts = [];

    $scope.load = function () {
        console.log('load', $scope.blog);
        $.get('/blog/' + $scope.blog,
              function (blog) {
                  blog.posts = blog.posts.map(post => {
                      post.caption = post.caption && $sce.trustAsHtml(post.caption);
                      post.body = post.body && $sce.trustAsHtml(post.body);
                      return post;
                  });
                  console.log(blog);
                  $scope.posts = blog.posts;
                  $scope.$applyAsync();
              });
    }
}]);

tbApp.config(function($routeProvider) {
    $routeProvider
	.when('/', {
	    templateUrl: '/templates/index',
	    controller: 'indexController'
	});
});
