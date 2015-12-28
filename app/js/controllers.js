'use strict';

/* Controllers */

var boardControllers = angular.module('boardControllers', []);

var threadListCtrl = boardControllers.controller('ThreadListCtrl', ['$scope', '$http', 'UserService', 'ThreadService',
  function($scope, $http, User, Thread) {
    $scope.threads = Thread.data.threads;
    $scope.next = Thread.data.next;
    $scope.prev = Thread.data.prev;
    $scope.username = User.user.username;
  }]);

threadListCtrl.loadThreads = function(ThreadService) {
  return ThreadService.getAll();
};

var threadDetailCtrl = boardControllers.controller(
  'ThreadDetailCtrl',
  [
    '$scope', '$http', 'MessageService', 'UserService',
    function($scope, $http, Message, User) {
      $scope.username = User.user.username;
      $scope.thread = Message.data.thread;
      $scope.messages = Message.data.messages;
    }]);

threadDetailCtrl.loadMessages = function($routeParams, MessageService) {
  var threadId = $routeParams.threadId;
  return MessageService.getAll(threadId);
};

boardControllers.controller('UserCtrl', ['$scope', '$http', '$location', '$timeout', 'UserService',
  function($scope, $http, $location, $timeout, User) {
    $scope.credentials = {  // default user credentials
      username: 'demo',
      password: 'demo'
    };

    $scope.login = function() {
      User.login($scope.credentials, function(user) {
        $timeout(function() {
          // timeout is used to avoid $digest in progress error when calling $aply
          $location.path('/threads');
          $scope.$apply();
        });
      });
    };

  }]);
