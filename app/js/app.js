'use strict';

// Declare app level module which depends on views, and components
var boardApp = angular.module('boardApp', [
  'ngRoute',
  'boardControllers'
]);


boardApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/threads', {
        templateUrl: 'partials/thread-list.html',
        controller: 'ThreadListCtrl'
      }).
      when('/threads/:threadId', {
        templateUrl: 'partials/thread-detail.html',
        controller: 'ThreadDetailCtrl'
      }).
      otherwise({
        redirectTo: '/threads'
      });
  }]);