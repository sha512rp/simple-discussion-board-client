'use strict';

/* Services */

var services = angular.module('boardServices', []);

services
.factory('UserService', function($http, $cookies){
    
  var currentUser = {
    username: '',
    token: '',
    gravatar: ''
  }

  var changeUser = function(user) {
    $cookies.put('username', user.username);
    $cookies.put('gravatar', user.gravatar);
    $cookies.put('token', user.token);
    angular.extend(currentUser, user);
  }

  var retriveUser = function() {
    var user = {
      username: $cookies.get('username') || '',
      token: $cookies.get('token') || '',
      gravatar: $cookies.get('gravatar') || ''
    }
    changeUser(user);
    return currentUser;
  }

  retriveUser();

  return {
    isLoggedIn: function(user) {
      if(user === undefined) {
        user = retriveUser();
      }
      return user.username !== '';
    },
    login: function(credentials, success) {
      $http.post('http://private-76979-simplediscussionboard.apiary-mock.com/user/login', credentials)
      .success(function(user){
        changeUser(user);
        success(user);
      });
    },
    logout: function(success) {
      $http.get('http://private-76979-simplediscussionboard.apiary-mock.com/user/logout',
        {token: currentUser.token})
      .success(function(){
        changeUser({
          username: '',
          token: '',
          gravatar: ''
        });
        success();
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
    prev: null,
    next: null
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
    postThread: function(thread, success) {
      return $http.post('http://private-76979-simplediscussionboard.apiary-mock.com/threads',
        {thread: thread})
      .success(function(resp) {
        success(resp);
      });
    },
    data: data
  };
});


services
.factory('MessageService', function($http, UserService, ThreadService){

  var data = {
    thread: {},
    messages: [],
    prev: null,
    next: null
  };

  return {
    getAll: function(threadId) {
      return $http.get('http://private-76979-simplediscussionboard.apiary-mock.com/threads/'+threadId)
      .success(function(resp) {
        data.thread = resp['thread'];
        data.messages = resp['messages'];
        data.next = resp['next'];
        data.prev = resp['prev'];
      });
    },
    postMessage: function(message, success) {
      return $http.post('http://private-76979-simplediscussionboard.apiary-mock.com/threads/id'+data.thread.id)
      .success(function(resp) {
        data.messages.push(resp['message']);
        success(resp);
      });
    },
    data: data
  };
});
