'use strict';

/* Controllers */

var boardApp = angular.module('boardApp', []);

boardApp.controller('ThreadListCtrl', function($scope, $http) {
  $http.get('http://private-76979-simplediscussionboard.apiary-mock.com/threads').success(function(data) {
    $scope.threads = data['threads'];
  });
});
