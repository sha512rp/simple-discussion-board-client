'use strict';

/* Controllers */

var boardApp = angular.module('boardApp', []);

boardApp.controller('ThreadListCtrl', function($scope, $http) {
  $http.get('http://private-76979-simplediscussionboard.apiary-mock.com/threads').success(function(data) {
    var threads = data['threads'];

    for (var i = threads.length - 1; i >= 0; i--) {
      threads[i].created = Date.parse(threads[i].created);
    };

    $scope.threads = threads;
  });
});
