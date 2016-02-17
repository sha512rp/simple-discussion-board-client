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

threadListCtrl.loadThreads = function($route, ThreadService) {
  var page = $route.current.params.page;
  return ThreadService.getAll(page);
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
      Thread.postThread($scope.newThread, function(resp) {
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
      $scope.thread = Message.data.thread;
      $scope.newMessage = {
        text: ''
      };
      $scope.messages = Message.data.messages;
      $scope.logout = User.logout;

      $scope.postMessage = function() {
        Message.postMessage($scope.newMessage,
          function(resp) {
            $scope.newMessage.text = '';
          });
      };
    }]);

threadDetailCtrl.loadMessages = function($route, MessageService, ThreadService) {
  var threadId = $route.current.params.threadId;
  ThreadService.setCurrent(threadId);
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

