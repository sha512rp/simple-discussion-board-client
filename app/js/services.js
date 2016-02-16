'use strict';

/* Services */

var services = angular.module('boardServices', []);

var API_URL = 'http://localhost:8000/'


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
    $http.defaults.headers.post.Authorization = "Token " + user.token;
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
      return user.token !== '';
    },
    login: function(credentials, success) {
      changeUser({'username': credentials.username});
      $http.post(API_URL + 'api-token-auth/', credentials)
      .success(function(user){
        changeUser(user);
        success(user);
      }).error(function(error){
        changeUser({
          username: '',
          token: ''
        });
      });
    },
    logout: function(success) {
      changeUser({
        username: '',
        token: '',
        gravatar: ''
      });
      success();
    },
    retriveUser: retriveUser,
    changeUser: changeUser,
    user: currentUser
  };
});


services
.factory('ThreadService', function($http){

  var data = {
    current: null,
    threads: [],
    prev: null,
    next: null
  };

  return {
    getAll: function() {
      return $http.get(API_URL + 'threads/')
      .success(function(resp) {
        data.threads = resp;

        for (var i = data.threads.length - 1; i >= 0; i--) {
          data.threads[i].created = Date.parse(data.threads[i].created);
        };

        //data.next = resp['next'];
        //data.prev = resp['prev'];
      });
    },
    setCurrent: function(threadId) {
      // sets the current thread by id
      for (var i = 0; i < data.threads.length; i++) {
          if (data.threads[i].id == threadId) {
            data.current = data.threads[i];
          }
        };
    },
    postThread: function(thread, success) {
      return $http.post(API_URL + 'threads/',
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
      return $http.get(API_URL + 'threads/' + threadId + '/')
      .success(function(resp) {
        data.thread = {
          'created': Date.parse(resp['created']),
          'author': resp['author'],
        }
        data.messages = resp['messages'];
        data.next = resp['next'];
        data.prev = resp['prev'];
      });
    },
    postMessage: function(message, success) {
      return $http({
          url: API_URL + 'threads/' + ThreadService.data.current.id + '/',
          method: 'POST',
          data: message,
          headers: {'Content-Type': 'application/json'}
        })
        .success(function(resp) {
          data.messages.push(resp);
          success(resp);
        }).error(function(resp) {
          console.log(resp)
        });
    },
    data: data
  };
});
