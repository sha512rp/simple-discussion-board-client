'use strict';

/* Services */

var services = angular.module('boardServices', []);

services
.factory('UserService', function($http, $cookies){
    
  var currentUser = {
    username: '',
    token: ''
  }

  var changeUser = function(user) {
    $cookies.put('username', user.username);
    $cookies.put('token', user.token);
    angular.extend(currentUser, user);
  }

  var retriveUser = function() {
    var user = {
      username: $cookies.get('username') || '',
      token: $cookies.get('token') || ''
    }
    changeUser(user);
    return currentUser
  }

  retriveUser();

  return {
    isLoggedIn: function(user) {
      if(user === undefined) {
        user = retriveUser();
      }
      return user.username !== ''
    },
    login: function(credentials, success) {
      $http.post('http://private-76979-simplediscussionboard.apiary-mock.com/user/login', credentials).success(function(user){
        changeUser(user);
        success(user);
      });
    },
    logout: function(success, error) {
      $http.post('http://private-76979-simplediscussionboard.apiary-mock.com/user/login').success(function(){
        changeUser({
          username: '',
          token: ''
        });
      });
    },
    retriveUser: retriveUser,
    changeUser: changeUser,
    user: currentUser
  };
});


services
.factory('ThreadService', function($http){

  var data = {
    threads: [],
    prev: '',
    next: ''
  };

  return {
    getAll: function() {
      return $http.get('http://private-76979-simplediscussionboard.apiary-mock.com/threads')
      .success(function(resp) {
        data.threads = resp['threads'];

        for (var i = data.threads.length - 1; i >= 0; i--) {
          data.threads[i].created = Date.parse(data.threads[i].created);
        };

        data.next = resp['next'];
        data.prev = resp['prev'];
      });
    },
    data: data
  };
});


services
.factory('MessageService', function($http){

  var data = {
    thread: {},
    messages: [],
    prev: '',
    next: ''
  };

  return {
    getAll: function(threadId) {
      return $http.get('http://private-76979-simplediscussionboard.apiary-mock.com/threads/'+threadId)
      .success(function(resp) {
        data.thread = resp['thread'];
        data.messages = resp['messages'];
      });
    },
    data: data
  };
});
