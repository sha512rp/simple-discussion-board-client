'use strict';

// Declare app level module which depends on views, and components
angular.module('boardApp', [
  'ngRoute',
  'boardApp.view1',
  'boardApp.view2',
  'boardApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
