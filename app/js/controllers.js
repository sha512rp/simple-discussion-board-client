'use strict';

/* Controllers */

var boardControllers = angular.module('boardControllers', []);

var threadListCtrl = boardControllers.controller('ThreadListCtrl', ['$scope', 'UserService', 'ThreadService',
  function($scope, User, Thread) {
    $scope.threads = Thread.data.threads;
    $scope.next = Thread.data.next;
    $scope.prev = Thread.data.prev;
    $scope.loggedIn = User.isLoggedIn();
    $scope.username = User.user.username;
    $scope.gravatar = User.user.gravatar;
  }]);

threadListCtrl.loadThreads = function(ThreadService) {
  return ThreadService.getAll();
};

boardControllers.controller('ThreadCreateCtrl', ['$scope', '$timeout', '$location', 'UserService', 'ThreadService',
  function($scope, $timeout, $location, User, Thread) {
    if (!User.isLoggedIn()) {
      $timeout(function(){
        $location.path('/login');
        $scope.$apply();
      });
    }

    $scope.postThread = function() {
      Thread.postThread({thread: $scope.newThread}, function(resp) {
        $timeout(function(){
          $location.path('/threads');
          $scope.$apply();
        });
      });
    };

  }]);

var threadDetailCtrl = boardControllers.controller(
  'ThreadDetailCtrl',
  [
    '$scope', 'MessageService', 'UserService',
    function($scope, Message, User) {
      $scope.username = User.user.username;
      $scope.loggedIn = User.isLoggedIn();
      $scope.gravatar = User.user.gravatar;
      $scope.thread = Message.data.thread;
      $scope.newMessage = {
        text: ''
      };
      $scope.messages = Message.data.messages;
      $scope.next = Message.data.next;
      $scope.prev = Message.data.prev;

      $scope.postMessage = function() {
        Message.postMessage({message: $scope.newMessage},
          function(resp) {
            $scope.newMessage.text = '';
          });
      };
    }]);

threadDetailCtrl.loadMessages = function($routeParams, MessageService) {
  var threadId = $routeParams.threadId;
  return MessageService.getAll(threadId);
};

var returnToPreviousPage = function() {
  history.back();
};

boardControllers.controller('LoginCtrl', ['$scope', '$location', 'UserService',
  function($scope, $location, User) {
    $scope.credentials = {  // default user credentials
      username: 'demo',
      password: 'demodemo'
    };

    var changeLocation = function(url, forceReload) {
      $scope = $scope || angular.element(document).scope();
      if(forceReload || $scope.$$phase) {
        window.location = url;
      }
      else {
        $location.path(url);
        $scope.$apply();
      }
    };

    var returnToThreadList = function() {
      changeLocation('#/threads/');
    }

    $scope.login = function() {
      User.login($scope.credentials, returnToThreadList);
    };

  }]);

// boardControllers.controller('LogoutCtrl', ['UserService',
//   function(User) {
//     User.logout(returnToPreviousPage);
//   }]);

