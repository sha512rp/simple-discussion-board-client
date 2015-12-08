'use strict';

/* Controllers */

var boardControllers = angular.module('boardControllers', []);

boardControllers.controller('ThreadListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('http://private-76979-simplediscussionboard.apiary-mock.com/threads').success(function(data) {
      var threads = data['threads'];

      for (var i = threads.length - 1; i >= 0; i--) {
        threads[i].created = Date.parse(threads[i].created);
      };

      $scope.threads = threads;
      $scope.next = data['next'];
      $scope.prev = data['prev'];
    });
  }]);

boardControllers.controller('ThreadDetailCtrl', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {
    var threadId = $routeParams.threadId;
    $http.get('http://private-76979-simplediscussionboard.apiary-mock.com/threads/'+threadId).success(function(data) {
      $scope.thread = data['thread'];
      $scope.messages = data['messages'];
    });
  }]);
