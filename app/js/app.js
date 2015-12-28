'use strict';

// Declare app level module which depends on views, and components
var boardApp = angular.module('boardApp', [
  'ngRoute',
  'ngCookies',
  'boardControllers',
  'boardServices'
]);


boardApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/threads', {
        templateUrl: 'partials/thread-list.html',
        controller: 'ThreadListCtrl',
        resolve: {
          loadThreads: threadListCtrl.loadThreads
        }
      }).
      when('/threads/:threadId', {
        templateUrl: 'partials/thread-detail.html',
        controller: 'ThreadDetailCtrl',
        resolve: {
          loadMessages: threadDetailCtrl.loadMessages
        }
      }).
      when('/login', {
      	templateUrl: 'partials/login.html',
      	controller: 'UserCtrl'
      }).
      when('/logout', {
      	controller: 'UserCtrl'
      }).
      otherwise({
        redirectTo: '/threads'
      });
  }]);
