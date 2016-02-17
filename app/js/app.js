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
      when('/threads/?page=:page', {
        templateUrl: 'partials/thread-list.html',
        controller: 'ThreadListCtrl',
        resolve: {
          loadThreads: threadListCtrl.loadThreads
        }
      }).
      when('/threads/create', {
        templateUrl: 'partials/thread-create.html',
        controller: 'ThreadCreateCtrl'
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
      	controller: 'LoginCtrl'
      }).
      otherwise({
        redirectTo: '/threads'
      });
  }]);
